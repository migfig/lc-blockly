/// <reference path="../node_modules/blockly/blockly.d.ts"/>
/// <reference path="../node_modules/blockly/python.js"/>
/// <reference path="../node_modules/blockly/core.js"/>

import React, { useContext, useState } from 'react';

import BlocklyPython from 'blockly/python';
import Blockly from 'blockly';
import * as BlocklyCore from 'blockly/core'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './components/layout';
import ToastMessage from './components/toast-message';
import BlocklyComponent, { Block } from './Blockly';

import './blocks/customblocks';
import './generator/generator';
import './blocks/ml-blocks';
import './generator/ml-blocks-generator';
import './generator/ml-blocks-generator-python';

import DataContext from './context';

import {
  newApp,
  xmlFields,
} from './utils';

import { IApplication, IOption, ILeftMenu } from './types';

const App = () => {
  const ctx = useContext(DataContext);
  const store = ctx.store;
  const buildToastAction = (title: string, message: string, isVisible = false) => ({ title, message, isVisible });
  const defaultToastAction = buildToastAction('', '');
  const [applications, setApplications] = useState(store.getApplications());
  const [selectedApplicationId, setSelectedApplicationId] = useState(store.getSelectedApplicationId());
  const [application, setApplication] = useState(applications.find((app: IApplication) => app.id === selectedApplicationId) || newApp());
  const [initialXml, setInitialXml] = useState(application?.content);
  const [topMenu,] = useState(store.getTopMenu());
  const [leftMenu, setLeftMenu] = useState(store.getLeftMenu());
  const [isBusy, setIsBusy] = useState(true);
  const [toastAction, setToastAction] = useState(defaultToastAction);

  let simpleWorkspace: BlocklyComponent;
  const isRemote = ctx.whoAmI === "remote context";

  const onItemSelected = (option: IOption, index: number) => {
    switch (option.link) {
      case "#new":
        addApplication(newApp());
        break;
      case "#save":
        saveApplication();
        break;
      case "#download":
        downloadApplications();
        break;
      case "#add-sample":
        addApplication(option.app || newApp());
        break;
      default: /*Selected Application item*/
        loadApplication(index);
        break;
    }
  }

  const onItemRemoved = (option: IOption, index: number) => {
    setIsBusy(true);

    const app = newApp();
    const tmpApps = [...applications];
    const isSingleApp = applications.length === 1;
    if (isSingleApp)
      tmpApps.splice(tmpApps.indexOf(application), 1, app);
    else
      tmpApps.splice(tmpApps.indexOf(application), 1);
    const apps = [
      ...tmpApps,
    ];
    const selApp = isSingleApp ? app : apps[0];
    setSelectedApplicationId(selApp.id);
    setApplication(selApp);
    setApplications(apps);
    const menu = [...leftMenu];
    menu[0].items = [...apps];
    setLeftMenu(menu);
    setToastAction(buildToastAction('Application removed', `${option.name} has been successfuly removed`, true));
    saveState(apps, selApp.id, menu);
    setTimeout(() => {
      document.location.reload();
    }, 500);
  }

  const onItemClonned = (option: IOption, index: number) => {
    const tmpApp = newApp();
    const app = {
      ...application,
      id: tmpApp.id,
      name: `${application.name}-${tmpApp.name.replace('Application-', '')}`
    };
    addApplication(app)
  }

  const saveState = (apps: IApplication[], selAppId: string, menu: ILeftMenu[], clearBusy: boolean = true) => {
    store.setApplications(apps);
    store.setSelectedApplicationId(selAppId);
    store.setLeftMenu(menu);
    if (clearBusy) setIsBusy(false);
  }

  const loadApplication = (index: number) => {
    const app = applications[index];
    if (selectedApplicationId !== app.id) {
      setIsBusy(true);
      setSelectedApplicationId(app.id);
      setApplication(app)
      setInitialXml(app.content);
      saveState(applications, app.id, leftMenu);
      document.location.reload();
    }
  }

  const addApplication = (existingApp: IApplication) => {
    setIsBusy(true);
    const app = existingApp || newApp();
    setSelectedApplicationId(app.id);
    setApplication(app);
    const apps = [...applications, app];
    setApplications(apps)
    const menu = [...leftMenu];
    menu[0].items = [...apps];
    setLeftMenu(menu);
    setInitialXml(app.content);
    setToastAction(buildToastAction('Application added', `${app.name} has been successfuly added`, true));
    saveState(apps, app.id, menu);
    setTimeout(() => {
      document.location.reload();
    }, 500);
  }

  const onOutputDone = (outputList, saveAsNotebook = true) => {
    if (outputList.filter(o => o.isPending === true).length) {
      return;
    }

    // console.log('outputList: ', JSON.stringify(outputList))

    const elements = [];
    for (const item of outputList) {
      const arrayItems = ['chains', 'tools']
      for (const arrayItemName of arrayItems) {
        if (!!item['source'][arrayItemName]) {
          for (const chainItem of item['source'][arrayItemName]) {
            const propName = Object.keys(chainItem)[0]
            const prop = chainItem[propName]
            if (Array.isArray(prop)) {
              const prompts = []
              for (const innerItem of prop) {
                const innerPropName = Object.keys(innerItem)[0]
                const innerProp = innerItem[innerPropName]
                prompts.push({
                  type: innerPropName.toUpperCase(),
                  name: innerProp['type']['type'],
                  arguments: innerProp['type']['settings'],
                  index: 0,
                });              
              }
              elements.push({
                type: prompts[0].type,
                name: prompts.map(p => p.arguments[0].value).join('. '),
                arguments: [],
                index: 99999999
              })
            } else {
              elements.push({
                type: propName.toUpperCase().replace('VECTORSTORE', 'STORE'),
                name: prop['type']['type'],
                arguments: prop['type']['settings'],
                index: 0,
              });
            }
          }
        }
      }
    }
    
    const api = window['api'];
    api.buildLangChain({ elements: elements })
      .then(json => {
        const content = json.lines.join('\n')
        const out = {
          content,
          mimeType: 'application/python',
          extension: 'py',
        };
        downloader(out.content, out.mimeType, `${window['applicationName'] || application.name}.${out.extension}`);
        setIsBusy(false);    
      });
  }

  const saveApplication = () => {
    setIsBusy(true);
    window['api'] = ctx.api;
    window['onOutputDone'] = isRemote ? onOutputDone: (outputList, saveAsNotebook) => {};
    const json = JSON.parse(JSON.parse(BlocklyPython.workspaceToCode(simpleWorkspace.workspace)));

    const xml = Blockly.Xml.workspaceToDom(simpleWorkspace.workspace);
    const content = Blockly.Xml.domToText(xml);

    const app = {
      id: application.id,
      name: json.name,
      content: content,
      json: json
    };
    window['applicationName'] = app.name;
    const tmpApps = [...applications];
    tmpApps.splice(tmpApps.indexOf(application), 1, app);
    const apps = [
      ...tmpApps,
    ];
    setApplication(app);
    setApplications(apps);
    const menu = [...leftMenu];
    menu[0].items = [...apps];
    setLeftMenu(menu);
    setToastAction(buildToastAction('Application saved', `${app.name} has been successfuly saved`, true));
    saveState(apps, selectedApplicationId, menu, false);

    if (!isRemote) onOutputDone(window['output']);
  }

  const downloadApplications = () => {
    const apps = [...applications];
    apps.forEach(a => {
      const origName = a.name;
      a.name = `${a.name}-Sample`;
      if (a.content.indexOf(a.name) < 0) a.content = a.content.replace(`>${origName}<`, `>${a.name}<`);
      a.json = {};
    });
    downloader(JSON.stringify(apps), 'application/json', `sample-applications.json`);
  }

  const downloadUri = (uri: string, name: string) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    link.click();
  }

  const downloader = (data: BlobPart, type: string, name: string) => {
    const blob = new Blob([data], { type });
    let url = window.URL.createObjectURL(blob);
    downloadUri(url, name);
    window.URL.revokeObjectURL(url);
  }

  window.onload = (ev: Event) => setIsBusy(false);

  const raisedEvent = (e: any) => {
    if (e instanceof Blockly.Events.Ui) {
      return;  // Don't mirror UI events.
    }
    var json = e.toJson();
    const fields = ["PLATFORM", "TEMPLATE", "TRAIN", "FLAVOR"];
    switch (json.type) {
      case "create":
        const xml = json.xml;
        const matches = xmlFields(xml, fields);
        fields.forEach((f: any) => {
          window[f] = matches.find(m => m.name === f)?.value;
        });
        break;
      case "change":
        if (fields.includes(json.name)) {
          window[json.name] = json.newValue.toLowerCase();
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <Layout onItemSelected={onItemSelected} onItemRemoved={onItemRemoved} onItemClonned={onItemClonned} topMenu={topMenu} leftMenu={leftMenu} isBusy={isBusy}>
        <BlocklyComponent ref={(e: BlocklyComponent) => {
          simpleWorkspace = e;
          if (!!e) e.primaryWorkspace.addChangeListener(raisedEvent)
        }}
          theme={BlocklyCore.Themes.Dark}
          readOnly={false}
          trashcan={true}
          media={'media/'}
          move={{
            scrollbars: false,
            drag: true,
            wheel: true
          }}
          zoom={{
            controls: true,
            wheel: true,
            startScale: 1,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
          }}
          grid={{
            spacing: 20,
            length: 1,
            snap: true
          }}
          initialXml={initialXml}>
          <Block type="chains" />
          <Block type="custom_chain_field" />
          <Block type="tools" />
          <Block type="custom_tool_field" />
          <Block type="custom_util_field" />
          <Block type="custom_llm_field" />
          <Block type="custom_loader_field" />
          <Block type="custom_splitter_field" />
          <Block type="custom_embedding_field" />
          <Block type="custom_retriever_field" />
          <Block type="custom_memory_field" />
          <Block type="custom_vectorstore_field" />
          <Block type="custom_chat_model_field" />
          <Block type="custom_chat_message_field" />
          <Block type="custom_chat_prompt_field" />
          <Block type="prompts" />
          <Block type="custom_prompt_field" />
        </BlocklyComponent>
      </Layout>
      {toastAction.isVisible && <ToastMessage title={toastAction.title} message={toastAction.message} onClose={e => setToastAction(defaultToastAction)} />}
    </div>
  );
}

export default App;
