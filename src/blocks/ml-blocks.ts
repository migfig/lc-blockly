import * as Blockly from 'blockly/core';
import moment from 'moment';

import { srcAppTemplates, srcTemplates } from '../utils';

const platforms = [];
new Set(srcTemplates.names.map(n => n.split('/')[1]))
  .forEach(n => platforms.push(n));

Blockly.Blocks['application'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("application")
      .appendField(new Blockly.FieldTextInput(`Application-` + moment().format('MM-DD-YY:HH:mm:ss')), "APPLICATION_NAME")
      .appendField("platform")
      .appendField(new Blockly.FieldDropdown(
        platforms.filter(p => p === 'langchain').map(p => [p, p.toUpperCase()])
      ), "PLATFORM")
      .appendField("template")
      .appendField(new Blockly.FieldDropdown(
        srcAppTemplates.map(t => {
          const nameParts = t.split('/');
          const tplName = nameParts[nameParts.length - 1].split('.')[0];

          return [tplName, tplName.toUpperCase()];
        })
      ), "TEMPLATE");
    this.appendStatementInput("APPLICATION_STATEMENTS")
      .setCheck(null);
    this.setColour(230);
    this.setTooltip("application configuration");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['chains'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("chain");
    this.appendStatementInput("CHAIN_STATEMENTS")
      .setCheck("chain");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(145);
    this.setTooltip("chains configuration");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['tools'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("agent");
    this.appendStatementInput("TOOL_STATEMENTS")
      .setCheck("tool");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip("agent configuration");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['prompts'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("prompts");
    this.appendStatementInput("PROMPT_STATEMENTS")
      .setCheck("prompt");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(940);
    this.setTooltip("prompts configuration");
    this.setHelpUrl("");
  }
};
