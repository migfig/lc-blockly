import React from 'react'
import PropTypes from 'prop-types';

import Form from "react-bootstrap/Form";
import { labelize } from '../../utils';

const InputField = ({ prop, index, data, isNameValue = false, onValueChange }) => {
    if (prop.type !== "input") return null;

    return (
        <Form.Group>
            <Form.Label>{labelize(prop.name.toLowerCase())}</Form.Label>
            <Form.Control id={prop.name}
                type={prop.type}
                min={prop.min}
                max={prop.max}
                step={prop.step}
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
InputField.propTypes = {
    prop: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    isNameValue: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
}

export default InputField;
