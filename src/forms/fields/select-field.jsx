import React, { useState } from 'react'
import PropTypes from 'prop-types';

import Form from "react-bootstrap/Form";
import { labelize } from './../../utils';

const isDisabled = (option, value) => {
    return !!option.selector && !!option.selectorRef 
        ? !new RegExp(option.selector).test(value)
        : false;
}

const SelectField = ({ prop, index, data, isNameValue = false, isDatasetField = false, onValueChange }) => {
    const [isValid, setIsValid] = useState(true);
    if (prop.type !== "select" || (!!prop.hideIfSingleOption && prop.hideIfSingleOption && prop.options?.length === 1)) return null;
    
    // special condition to reset options
    const invalidOptValue = 'Select a valid Option...';

    return (
        <Form.Group>
            <Form.Label>{labelize(prop.name.toLowerCase())}</Form.Label>
            <Form.Control id={prop.name} as="select"
                defaultValue={isNameValue ? (data.value !== 0 ? data.value : prop.options[data.value].name) : data[prop.name]}
                onChange={e => {
                    const value = e.target.value;
                    if (value === invalidOptValue) { 
                        setIsValid(false);
                        return;
                    }
                    setIsValid(true);
                    if (!isNameValue) data[prop.name] = value;
                    onValueChange({ ...data }, e.target.value);
                }}
                size="sm"
                style={isValid ? null : { color: `#ccc` }}
                required={prop.required}>
                {prop.options && prop.options.sort((a, b) => a.name > b.name).map((o, k) => (
                    <option 
                        key={`opt${k}`} 
                        value={o[prop.optionName]}
                        title={!!prop.optionTitle ? (`${o[prop.optionTitle]}: ${o.description}`) : ''}
                        disabled={isDisabled(o, data[o.selectorRef])}
                        >
                        {o[prop.optionName]}
                    </option>
                )
                )}
            </Form.Control>
        </Form.Group>
    )
}
SelectField.propTypes = {
    prop: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    isNameValue: PropTypes.bool,
    isDatasetField: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
}

export default SelectField;
