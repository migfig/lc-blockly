import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Blockly from 'blockly/core';

import BaseField from './BaseField';

import ModalDialog from '../components/modal';
import ChatPromptForm from '../forms/chatprompt-form';

import {
    hydrate,
    dehydrate,
    groupTemplatesByParent,
    platformTemplates,
} from '../utils';

const blockTemplates = groupTemplatesByParent(platformTemplates());

const ModalForm = ({ title, data, onCancel, onSave }) => {
    const [size, setSize] = useState("");

    const onShowHelp = (visible) => setSize(visible ? "lg" : "");

    return <ModalDialog title={title} size={size} onCancel={onCancel}>
        <ChatPromptForm data={data} onSave={onSave} onCancel={onCancel} onShowHelp={onShowHelp} />
    </ModalDialog>
}
ModalForm.propTypes = {
    title: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
}

class ChatPromptField extends BaseField {

    static fromJson(options) {
        return new ChatPromptField(dehydrate(options['data']));
    }

    SERIALIZABLE = true;

    onSave = (values) => {
        if (Object.keys(values).length) {
            this.setValue(values);
        }
        Blockly.DropDownDiv.hideIfOwner(this, true);
    }

    onCancel = () => {
        Blockly.DropDownDiv.hideIfOwner(this, true);
    }

    getText_() {
        const keys = Object.keys(this.value_);
        return this.value_[keys[0]];
    };

    fromXml(fieldElement) {
        const value = dehydrate(fieldElement.textContent);
        
        // re-assign available block templates as options for the select in case they are updated
        value.properties
            .find(p => p.name === "template")
            .options = blockTemplates
                .find(bt => bt.blockName === "custom_chat_prompt_field")
                .templates
                .filter(t => t.platform === this.getPlatform());
        
        this.setValue(value);
    }

    toXml(fieldElement) {
        fieldElement.textContent = hydrate(this.value_);
        return fieldElement;
    }

    render() {
        return <ModalForm
            title="Chat Prompt Settings"
            data={this.value_}
            onCancel={this.onCancel}
            onSave={this.onSave}
        />
    }
}

Blockly.fieldRegistry.register('chat_prompt_field', ChatPromptField);

export default ChatPromptField;
