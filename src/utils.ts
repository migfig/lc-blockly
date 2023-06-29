/// <reference path="../node_modules/blockly/blockly.d.ts"/>
/// <reference path="../node_modules/blockly/python.js"/>
/// <reference path="../node_modules/blockly/core.js"/>

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import * as Handlebars from 'handlebars';

import * as Blockly from 'blockly/core';
import 'blockly/python';
import 'blockly/javascript';
import { IBlockProperty, IStatement, IAppProp } from './types';

const APPLICATIONS_KEY = 'lc_blockly_applications';
const SELECTED_APPLICATION_ID_KEY = 'lc_blockly_selectedApplicationId';

const FIELDS_SEPARATOR = ';'
const LIST_SEPARATOR = ','
const PROPERTY_SEPARATOR = '='

const DEFAULT_CONTENT = `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="application" deletable="false" x="0" y="0"></block>
  </xml>`;

const srcImages = (ctx => {
    const keys = ctx.keys();
    return { names: keys, files: keys.map(ctx) };
})(require.context('./images', false, /.*/));

const srcTemplates = (ctx => {
    const keys = ctx.keys();
    return { names: keys, files: keys.map(ctx) };
})(require.context('./templates', true, /.*.py/));

const srcAppTemplates = (ctx => {
    const keys = ctx.keys();
    return keys;
})(require.context('./templates/langchain/application', true, /.*.py/));

const newApp = () => {
    return {
        id: uuidv4(),
        name: `Application-` + moment().format('MM-DD-YY:HH:mm:ss'),
        content: DEFAULT_CONTENT,
        json: {}
    };
}

const hydrate = (value: any) => btoa(JSON.stringify(value));
const dehydrate = (value: string) => JSON.parse(atob(value).replace(/\\"/g, `'`).replace(/\\/g, ``));

const labelize = (value: string) => value
    ? `${value[0].toUpperCase()}${value.substring(1).replace(/[A-Z]/g, (m, $1) => ' ' + m).replace(/[_]/g, (m, $1) => ' ')}`
    : null;

const parseObject = (value: any, isArray = false, debugInfo = false) => {
    const obj = isArray ? [] : {};
    if (!value) return obj;
    if (debugInfo) console.log('@parse', value, typeof value);
    value
        .trim()
        .split('|')
        .filter((s: string) => s.trim().length)
        .forEach((s: string) => {
            if (debugInfo) console.log('@each', s);
            const jsonObj = JSON.parse(s);
            if (debugInfo) console.log('@each json', jsonObj);
            if (isArray) (obj as any).push(jsonObj)
            else Object.assign(obj, jsonObj);
            if (debugInfo) console.log('@obj', obj);
        })
    return obj;
}

const evalSource = (block: any, root: any, properties: IBlockProperty[], statements: IStatement[] = null, isArray = false, appendSufix = true) => {
    const isPython = block.template !== undefined;
    const template = isPython && !block.template.isRemote
        ? Handlebars.compile(block.template.content)
        : null;
    const source: any = {};
    let rootObj = source;
    if (root) {
        rootObj = source[root] = isArray ? [] : {};
    }

    if (properties && Array.isArray(properties)) {
        properties.forEach(p => {
            const value = !!p.isVariable && p.isVariable
                ? isPython
                    ? Blockly.Python.variableDB_.getName(block.getFieldValue(p.fieldName), Blockly.Variables.NAME_TYPE)
                    : Blockly.JavaScript.variableDB_.getName(block.getFieldValue(p.fieldName), Blockly.Variables.NAME_TYPE)
                : !!p.transform
                    ? p.transform(block.getFieldValue(p.fieldName))
                    : block.getFieldValue(p.fieldName);
            rootObj[p.propertyName] = value;
        });
    }

    if (statements && Array.isArray(statements)) {
        statements.forEach(s => {
            const statements_block_statements = isPython
                ? Blockly.Python.statementToCode(block, s.fieldName)
                : Blockly.JavaScript.statementToCode(block, s.fieldName);
            const blockStatements = parseObject(statements_block_statements, s.isArray) as any;
            if (s.isArray) blockStatements.forEach((bs: any) => rootObj.push(bs));
            else Object.assign(rootObj, blockStatements);
        });
    }

    if (isPython) {
        const augmentedSrc = !!window['appProps'] ? { ...window['appProps'], ...source } : source;
        if (block.template.isRemote) {
            const api = window['api'];

            const output = {
                type: block.type,
                order: block.template.order,
                content: null,
                source,
                isPending: true,
            };
            window['output'].push(output);

            api.getComponentByName(block.template.name)
                .then(component => {
                    if (!!component) {
                        if (properties && Array.isArray(properties)) {
                            const prop = properties.find(p => !!p.assignment);
                            prop.assignment(component, augmentedSrc);
                        }
                        api.compileComponent(component)
                            .then(json => {
                                output.content = json.results;
                                output.isPending = false;
                                window['onOutputDone'](window['output']);
                            });
                    }
                });
        }
        else {
            window['output'].push({
                type: block.type,
                order: block.template.order,
                content: template(augmentedSrc),
                source,
                isPending: false
            });
            if (!!block.raiseOnDone) window['onOutputDone'](window['output']);
        }
    }

    var code = JSON.stringify(source);
    return code + (appendSufix ? '|' : '');
}

const buildSource = (value: string, replacements = [], annotations = []) => {
    const nodeTypes = [
        { nodeName: "B", type: "bold" },
        { nodeName: "I", type: "italic" },
        { nodeName: "S", type: "strong" },
        { nodeName: "A", type: "a" },
    ];
    const nodes = new DOMParser().parseFromString(value, "text/html").body.childNodes;
    const foundAnnotations = [];
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i] as any;
        if (node.nodeName !== "#text") {
            foundAnnotations.push(({
                label: node.innerText,
                type: nodeTypes.find(nt => nt.nodeName === node.nodeName).type
            }));
            value = value.replace(node.outerHTML, node.innerText);
        }
    }
    return {
        description: value,
        replacements,
        annotations: annotations.length
            ? annotations
            : foundAnnotations
    }
}

const xmlFields = (xml: string, fields: string[]): IAppProp[] => {
    const doc: Document = new DOMParser().parseFromString(xml, "text/html");
    const fieldList = [...doc.querySelectorAll("field") as any]
        .map(field => ({
            name: field.attributes[0].nodeValue,
            value: field.textContent,
        }))
        .filter(f => fields.includes(f.name));
    return fieldList.length
        ? fieldList
        : [
            {
                name: 'TRAIN',
                value: 'PLATFORM'
            },
            {
                name: 'FLAVOR',
                value: 'LANGCHAIN'
            }
        ];
}

const platformTemplates = (platforms = [], loadContent = false) => {
    const tpls = [
        { name: "application", order: 0 },
        { name: "custom_dataset_field", order: 225 },
        { name: "plot_splitted_data", order: 300 },
        { name: "transformations", order: 200 },
        { name: "custom_transformation_field", order: 225 },
        { name: "dataset_training", order: 500 },
        { name: "callbacks", order: 525 },
        { name: "custom_callback_field", order: 550 },
        { name: "custom_training_field", order: 575 },
        { name: "image_classification_transfer_learning", order: 600 },
        { name: "plot_evaluated_data", order: 700 },
        { name: "plot_confusion_matrix", order: 800 },
        { name: "export", order: 900 },
        { name: 'custom_chain_field', order: 1100 },
        { name: 'custom_llm_field', order: 1125 },
        { name: 'custom_tool_field', order: 1150 },
        { name: 'custom_util_field', order: 1175 },
        { name: 'custom_chat_prompt_field', order: 1200 },
        { name: 'custom_chat_model_field', order: 1225 },
        { name: 'custom_chat_message_field', order: 1250 },
        { name: 'custom_loader_field', order: 1275 },
        { name: 'custom_vectorstore_field', order: 1300 },
        { name: 'custom_splitter_field', order: 1325 },
        { name: 'custom_embedding_field', order: 1350 },
        { name: 'custom_memory_field', order: 1375 },
        { name: 'custom_retriever_field', order: 1400 },
        { name: 'custom_prompt_field', order: 1425 },
    ];

    srcTemplates.names.forEach((f, ord) => {
        const fileName = require(`./templates/${f.substring(2)}`);
        if (typeof fileName !== 'string') return;

        const nameParts = f.split('/');
        const platform = nameParts[1];
        const parentBlock = nameParts[2];
        const name = nameParts[nameParts.length - 1].split('.')[0];
        const tpl = tpls.find(t => t.name === name);
        const order = tpl
            ? tpl.order
            : tpls.find(t => t.name === parentBlock).order + ord;

        let platformItem = platforms.find(p => p.name === platform);
        if (!platformItem) {
            const newIdx = platforms.push({ name: platform, templates: [] });
            platformItem = platforms[newIdx - 1];
        }

        const newTemplate = {
            name,
            parentBlock,
            platform,
            order,
            isRemote: false,
        };

        if (loadContent) {
            fetch(fileName)
                .then(res => res.text())
                .then(content => platformItem.templates.push({ ...newTemplate, content }));
        } else {
            platformItem.templates.push(newTemplate);
        }
    });

    return platforms;
}

const groupTemplatesByParent = (platforms, concatTemplates = null) => {
    const selectorTypes = [
        { name: "application" },
        { name: "custom_dataset_field", selector: ".*", selectorRef: "name" },
        { name: "plot_splitted_data" },
        { name: "transformations" },
        { name: "custom_transformation_field", selector: ".*", selectorRef: "type" },
        { name: "dataset_training" },
        { name: "callbacks" },
        { name: "custom_callback_field", selector: ".*", selectorRef: "type" },
        { name: "custom_training_field", selector: "true", selectorRef: "transferLearning" },
        { name: "plot_evaluated_data" },
        { name: "plot_confusion_matrix" },
        { name: "export" },
        { name: 'custom_chain_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_llm_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_tool_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_util_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_chat_prompt_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_chat_model_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_chat_message_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_loader_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_vectorstore_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_splitter_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_embedding_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_memory_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_retriever_field', selector: ".*", selectorRef: "type" },
        { name: 'custom_prompt_field', selector: ".*", selectorRef: "type" },
    ];
    const blockTemplates = [];
    platforms.forEach(p => {
        p.templates.forEach(t => {
            let blockItem = blockTemplates.find(p => p.blockName === t.parentBlock);
            if (!blockItem) {
                const newIdx = blockTemplates.push({ blockName: t.parentBlock, templates: [] });
                blockItem = blockTemplates[newIdx - 1];
            }
            const selectorType = selectorTypes.find(st => st.name === t.parentBlock);
            if (!blockItem.templates.find(tf => tf.name === t.name && tf.platform === t.platform)) {
                blockItem.templates.push({
                    name: t.name,
                    selector: selectorType.selector,
                    selectorRef: selectorType.selectorRef,
                    platform: t.platform,
                    isRemote: false,
                });
            }
        });
    });

    return !!concatTemplates
        ? [...blockTemplates, ...concatTemplates]
        : blockTemplates;
}


export {
    APPLICATIONS_KEY,
    SELECTED_APPLICATION_ID_KEY,
    FIELDS_SEPARATOR,
    LIST_SEPARATOR,
    PROPERTY_SEPARATOR,
    DEFAULT_CONTENT,
    newApp,
    hydrate,
    dehydrate,
    labelize,
    parseObject,
    xmlFields,
    evalSource,
    srcImages,
    srcTemplates,
    srcAppTemplates,
    buildSource,
    platformTemplates,
    groupTemplatesByParent,
}
