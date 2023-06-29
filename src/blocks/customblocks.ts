import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BaseField';

import '../fields/ChainField';
import '../fields/ChatMessageField';
import '../fields/ChatModelField';
import '../fields/ChatPromptField';
import '../fields/EmbeddingField';
import '../fields/LlmField';
import '../fields/LoaderField';
import '../fields/MemoryField';
import '../fields/RetrieverField';
import '../fields/SplitterField';
import '../fields/ToolField';
import '../fields/UtilField';
import '../fields/VectorStoreField';
import '../fields/PromptField';

import { hydrate, platformTemplates, groupTemplatesByParent } from '../utils';

const customChatPromptFieldDef = require('./json-definitions/custom_chat_prompt_field.json');
const customLlmFieldDef = require('./json-definitions/custom_llm_field.json');
const customChainFieldDef = require('./json-definitions/custom_chain_field.json');
const customToolFieldDef = require('./json-definitions/custom_tool_field.json');
const customUtilFieldDef = require('./json-definitions/custom_util_field.json');
const customChatModelFieldDef = require('./json-definitions/custom_chat_model_field.json');
const customChatMessageFieldDef = require('./json-definitions/custom_chat_message_field.json');
const customLoaderFieldDef = require('./json-definitions/custom_loader_field.json');
const customVectorstoreFieldDef = require('./json-definitions/custom_vectorstore_field.json');
const customSplitterFieldDef = require('./json-definitions/custom_splitter_field.json');
const customEmbeddingFieldDef = require('./json-definitions/custom_embedding_field.json');
const customMemoryFieldDef = require('./json-definitions/custom_memory_field.json');
const customRetrieverFieldDef = require('./json-definitions/custom_retriever_field.json');
const customPromptFieldDef = require('./json-definitions/custom_prompt_field.json');

const blockTemplates = groupTemplatesByParent(platformTemplates());

// assign the block templates 
[
  { name: 'custom_chat_prompt_field', def: customChatPromptFieldDef },
  { name: 'custom_llm_field', def: customLlmFieldDef },
  { name: 'custom_chain_field', def: customChainFieldDef },
  { name: 'custom_tool_field', def: customToolFieldDef },
  { name: 'custom_util_field', def: customUtilFieldDef },
  { name: 'custom_chat_model_field', def: customChatModelFieldDef },
  { name: 'custom_chat_message_field', def: customChatMessageFieldDef },
  { name: 'custom_loader_field', def: customLoaderFieldDef },
  { name: 'custom_vectorstore_field', def: customVectorstoreFieldDef },
  { name: 'custom_splitter_field', def: customSplitterFieldDef },
  { name: 'custom_embedding_field', def: customEmbeddingFieldDef },
  { name: 'custom_memory_field', def: customMemoryFieldDef },
  { name: 'custom_retriever_field', def: customRetrieverFieldDef },
  { name: 'custom_prompt_field', def: customPromptFieldDef },
].forEach(t => {
  t.def.properties
    .find(p => p.name === "template")
    .options = blockTemplates.find(bt => bt.blockName === t.name)?.templates;
});

const customBaseField = {
  "type": "custom_base_field",
  "message0": "custom field %1",
  "args0": [
    {
      "type": "base_field",
      "name": "FIELD",
      "text": "Click me"
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
};

Blockly.Blocks['custom_base_field'] = {
  init: function () {
    this.jsonInit(customBaseField);
    this.setStyle('loop_blocks');
  }
};

const customChatPromptField = {
  "type": "custom_chat_prompt_field",
  "message0": "chat_prompt type %1 + settings",
  "args0": [
    {
      "type": "chat_prompt_field",
      "name": "CHAT_PROMPT",
      "data": hydrate(customChatPromptFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select chat_prompt settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_chat_prompt_field"] = {
  init: function () {
    this.jsonInit(customChatPromptField);
    this.setStyle("procedure_blocks");
    this.setColour(220);
  }
};

const customLlmField = {
  "type": "custom_llm_field",
  "message0": "llm type %1 + settings",
  "args0": [
    {
      "type": "llm_field",
      "name": "LLM",
      "data": hydrate(customLlmFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select llm settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_llm_field"] = {
  init: function () {
    this.jsonInit(customLlmField);
    this.setStyle("procedure_blocks");
    this.setColour(30);
  }
};

const customChainField = {
  "type": "custom_chain_field",
  "message0": "chain type %1 + settings",
  "args0": [
    {
      "type": "chain_field",
      "name": "CHAIN",
      "data": hydrate(customChainFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select chain settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_chain_field"] = {
  init: function () {
    this.jsonInit(customChainField);
    this.setStyle("procedure_blocks");
    this.setColour(175);
  }
};

const customToolField = {
  "type": "custom_tool_field",
  "message0": "tool type %1 + settings",
  "args0": [
    {
      "type": "tool_field",
      "name": "TOOL",
      "data": hydrate(customToolFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select tool settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_tool_field"] = {
  init: function () {
    this.jsonInit(customToolField);
    this.setStyle("procedure_blocks");
    this.setColour(270);
  }
};

const customUtilField = {
  "type": "custom_util_field",
  "message0": "util type %1 + settings",
  "args0": [
    {
      "type": "util_field",
      "name": "UTIL",
      "data": hydrate(customUtilFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select util settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_util_field"] = {
  init: function () {
    this.jsonInit(customUtilField);
    this.setStyle("procedure_blocks");
    this.setColour(280);
  }
};

const customChatModelField = {
  "type": "custom_chat_model_field",
  "message0": "chat_model type %1 + settings",
  "args0": [
    {
      "type": "chat_model_field",
      "name": "CHAT_MODEL",
      "data": hydrate(customChatModelFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select chat_model settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_chat_model_field"] = {
  init: function () {
    this.jsonInit(customChatModelField);
    this.setStyle("procedure_blocks");
    this.setColour(230);
  }
};

const customChatMessageField = {
  "type": "custom_chat_message_field",
  "message0": "chat_message type %1 + settings",
  "args0": [
    {
      "type": "chat_message_field",
      "name": "CHAT_MESSAGE",
      "data": hydrate(customChatMessageFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select chat_message settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_chat_message_field"] = {
  init: function () {
    this.jsonInit(customChatMessageField);
    this.setStyle("procedure_blocks");
    this.setColour(240);
  }
};

const customLoaderField = {
  "type": "custom_loader_field",
  "message0": "loader type %1 + settings",
  "args0": [
    {
      "type": "loader_field",
      "name": "LOADER",
      "data": hydrate(customLoaderFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select loader settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_loader_field"] = {
  init: function () {
    this.jsonInit(customLoaderField);
    this.setStyle("procedure_blocks");
    this.setColour(60);
  }
};

const customVectorstoreField = {
  "type": "custom_vectorstore_field",
  "message0": "vectorstore type %1 + settings",
  "args0": [
    {
      "type": "vectorstore_field",
      "name": "VECTORSTORE",
      "data": hydrate(customVectorstoreFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select vectorstore settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_vectorstore_field"] = {
  init: function () {
    this.jsonInit(customVectorstoreField);
    this.setStyle("procedure_blocks");
    this.setColour(80);
  }
};

const customSplitterField = {
  "type": "custom_splitter_field",
  "message0": "splitter type %1 + settings",
  "args0": [
    {
      "type": "splitter_field",
      "name": "SPLITTER",
      "data": hydrate(customSplitterFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select splitter settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_splitter_field"] = {
  init: function () {
    this.jsonInit(customSplitterField);
    this.setStyle("procedure_blocks");
    this.setColour(100);
  }
};

const customEmbeddingField = {
  "type": "custom_embedding_field",
  "message0": "embedding type %1 + settings",
  "args0": [
    {
      "type": "embedding_field",
      "name": "EMBEDDING",
      "data": hydrate(customEmbeddingFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select embedding settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_embedding_field"] = {
  init: function () {
    this.jsonInit(customEmbeddingField);
    this.setStyle("procedure_blocks");
    this.setColour(120);
  }
};

const customMemoryField = {
  "type": "custom_memory_field",
  "message0": "memory type %1 + settings",
  "args0": [
    {
      "type": "memory_field",
      "name": "MEMORY",
      "data": hydrate(customMemoryFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select memory settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_memory_field"] = {
  init: function () {
    this.jsonInit(customMemoryField);
    this.setStyle("procedure_blocks");
    this.setColour(140);
  }
};

const customRetrieverField = {
  "type": "custom_retriever_field",
  "message0": "retriever type %1 + settings",
  "args0": [
    {
      "type": "retriever_field",
      "name": "RETRIEVER",
      "data": hydrate(customRetrieverFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select retriever settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_retriever_field"] = {
  init: function () {
    this.jsonInit(customRetrieverField);
    this.setStyle("procedure_blocks");
    this.setColour(160);
  }
};

const customPromptField = {
  "type": "custom_prompt_field",
  "message0": "prompt type %1 + settings",
  "args0": [
    {
      "type": "prompt_field",
      "name": "PROMPT",
      "data": hydrate(customPromptFieldDef)
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "select prompt settings",
  "helpUrl": "",
};

Blockly.Blocks["custom_prompt_field"] = {
  init: function () {
    this.jsonInit(customPromptField);
    this.setStyle("procedure_blocks");
    this.setColour(954);
  }
};
