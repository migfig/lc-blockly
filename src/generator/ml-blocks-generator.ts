import * as Blockly from 'blockly/core';
import 'blockly/javascript';
import { evalSource } from '../utils';

Blockly.JavaScript['application'] = function (block) {
  return evalSource(
    block,
    /*root*/ null,
    /*props*/[
      {
        propertyName: 'name',
        fieldName: 'APPLICATION_NAME',
        isVariable: false,
        transform: null,
        assignment: null
      },
      {
        propertyName: 'platform',
        fieldName: 'PLATFORM',
        isVariable: false,
        transform: null,
        assignment: null
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
};

Blockly.JavaScript['chains'] = function (block) {
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

Blockly.JavaScript['custom_chat_prompt_field'] = function (block) {
  return evalSource(block, 'chat_prompt', [
    {
      propertyName: 'type',
      fieldName: 'CHAT_PROMPT',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_llm_field'] = function (block) {
  return evalSource(block, 'llm', [
    {
      propertyName: 'type',
      fieldName: 'LLM',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_llm_field'] = function (block) {
  return evalSource(block, 'llm', [
    {
      propertyName: 'type',
      fieldName: 'LLM',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_chain_field'] = function (block) {
  return evalSource(block, 'chain', [
    {
      propertyName: 'type',
      fieldName: 'CHAIN',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_tool_field'] = function (block) {
  return evalSource(block, 'tool', [
    {
      propertyName: 'type',
      fieldName: 'TOOL',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_util_field'] = function (block) {
  return evalSource(block, 'util', [
    {
      propertyName: 'type',
      fieldName: 'UTIL',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_chat_model_field'] = function (block) {
  return evalSource(block, 'chat_model', [
    {
      propertyName: 'type',
      fieldName: 'CHAT_MODEL',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_chat_message_field'] = function (block) {
  return evalSource(block, 'chat_message', [
    {
      propertyName: 'type',
      fieldName: 'CHAT_MESSAGE',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_loader_field'] = function (block) {
  return evalSource(block, 'loader', [
    {
      propertyName: 'type',
      fieldName: 'LOADER',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_vectorstore_field'] = function (block) {
  return evalSource(block, 'vectorstore', [
    {
      propertyName: 'type',
      fieldName: 'VECTORSTORE',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_splitter_field'] = function (block) {
  return evalSource(block, 'splitter', [
    {
      propertyName: 'type',
      fieldName: 'SPLITTER',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_embedding_field'] = function (block) {
  return evalSource(block, 'embedding', [
    {
      propertyName: 'type',
      fieldName: 'EMBEDDING',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_memory_field'] = function (block) {
  return evalSource(block, 'memory', [
    {
      propertyName: 'type',
      fieldName: 'MEMORY',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['custom_retriever_field'] = function (block) {
  return evalSource(block, 'retriever', [
    {
      propertyName: 'type',
      fieldName: 'RETRIEVER',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['prompts'] = function (block) {
  return evalSource(
    block,
    /*root*/ 'prompts',
    /*props*/ null,
    /*statements*/[
      {
        isArray: true,
        fieldName: 'PROMPT_STATEMENTS',
      }
    ],
    /*isArray*/ true
  );
};

Blockly.JavaScript['custom_prompt_field'] = function (block) {
  return evalSource(block, 'prompt', [
    {
      propertyName: 'type',
      fieldName: 'PROMPT',
      isVariable: false,
      transform: null,
      assignment: null
    }
  ]);
};

Blockly.JavaScript['tools'] = function (block) {
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
