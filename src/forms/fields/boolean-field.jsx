import React from 'react'
import PropTypes from 'prop-types';

import Form from "react-bootstrap/Form";
import { labelize } from './../../utils';

const BooleanField = ({ prop, index, data, onValueChange }) => {
    if (prop.type !== "checkbox") return null;

    return (
        <Form.Group>
            <Form.Check id={prop.name}
                label={labelize(prop.name)}
                type={prop.type}
                defaultValue={data[prop.name]}
                checked={data[prop.name]}
                onChange={e => {
                    data[prop.name] = e.target.checked;
                    onValueChange({ ...data }, e.target.checked);
                }}
                size="sm"
                required={prop.required} />
        </Form.Group>

    )
}
BooleanField.propTypes = {
    prop: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    onValueChange: PropTypes.func.isRequired,
}

export default BooleanField;
