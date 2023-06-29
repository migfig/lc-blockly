import React from 'react'
import PropTypes from 'prop-types';

import Form from "react-bootstrap/Form";
import { labelize } from '../../utils';

const TextAreaField = ({ prop, index, data, isNameValue = false, onValueChange }) => {
    if (prop.type !== 'textarea') return null;

    return (
        <Form.Group>
            <Form.Label>{labelize(prop.name.toLowerCase())}</Form.Label>
            <Form.Control as='textarea' id={prop.name}
                type={prop.type}
                min={prop.min}
                max={prop.max}
                step={prop.step}
                rows={5}
                defaultValue={isNameValue ? data.value : data[prop.name]}
                onChange={e => {
                    if (!isNameValue) data[prop.name] = e.target.value;
                    onValueChange({ ...data }, e.target.value);
                }}
                size="sm"
                required={prop.required} />
        </Form.Group>
    )
}
TextAreaField.propTypes = {
    prop: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    isNameValue: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
}

export default TextAreaField;
