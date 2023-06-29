import * as Blockly from 'blockly/core';
import 'blockly/python';

import { evalSource, platformTemplates } from '../utils';
import './handlebars-helpers';

const platforms = [];
window['output'] = [];
window['platform'] = null;
window['appProps'] = null;

platformTemplates(platforms, true);

const getPlatformTemplate = (name) => {
  return platforms
    .find(p => p.name.toLowerCase() === window['platform'].toLowerCase())
    .templates
    .find(t => t.name.toLowerCase() === name.toLowerCase());
}

Blockly.Python['application'] = function (block) {
  window['platform'] = block.getFieldValue('PLATFORM');
  block.template = getPlatformTemplate(block.getFieldValue('TEMPLATE'));
  block.raiseOnDone = true;

  // find and set the app properties
  window['appProps'] = null;

  const db = block.workspace.blockDB_;
  const key = Object.keys(db).find(k => db[k].type === 'dataset_training');
  if (key && window['platform'].toLowerCase() === 'pieml') {
    const item = db[key].inputList[0]
    const type = item.fieldRow.find(fr => fr.name === 'TRAIN').value_.toLowerCase();
    const flavor = item.fieldRow.find(fr => fr.name === 'FLAVOR').value_.toLowerCase();
    window['appProps'] = { type, flavor }
  }

  // reset python output
  window['output'].splice(0, window['output'].length);

  const obj = evalSource(
    block,
    /*root*/ null,
    /*props*/[
      {
        propertyName: 'name',
        fieldName: 'APPLICATION_NAME',
        isVariable: false,
        transform: null,
        assignment: null,
      },
      {
        propertyName: 'platform',
        fieldName: 'PLATFORM',
        isVariable: false,
        transform: (value) => value.toLowerCase(),
        assignment: null,
      },
      {
        propertyName: 'template',
        fieldName: 'TEMPLATE',
        isVariable: false,
        transform: (value) => value.toLowerCase(),
        assignment: null,
      }
    ],
    /*statements*/[
      {
        isArray: false,
        fieldName: 'APPLICATION_STATEMENTS',
      }
    ],
    /*isArray*/ false,
    /*appendSufix*/ false
  );

  return JSON.stringify(obj);
};

Blockly.Python['chains'] = function (block) {
  block.template = getPlatformTemplate(block.type);
  return evalSource(
    block,
    /*root*/ 'chains',
    /*props*/ null,
    /*statements*/[
      {
        isArray: true,
        fieldName: 'CHAIN_STATEMENTS',
      }
    ],
    /*isArray*/ true
  );
};

Blockly.Python['custom_chain_field'] = function (block) {
  block.template = getPlatformTemplate(block.getFieldValue('CHAIN').template);
  return evalSource(block, 'chain', [
    {
      propertyName: 'options',
      fieldName: 'CHAIN',
      isVariable: false,
      transform: null,
      assignment: null,
    }
  ]);
};

Blockly.Python['tools'] = function (block) {
  block.template = getPlatformTemplate(block.type);
  return evalSource(
    block,
    /*root*/ 'tools',
    /*props*/ null,
    /*statements*/[
      {
        isArray: true,
        fieldName: 'TOOL_STATEMENTS',
      }
    ],
    /*isArray*/ true
  );
};
