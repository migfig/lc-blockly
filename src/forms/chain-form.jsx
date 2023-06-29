import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import { faInfoCircle, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Icon from '../components/icon';
import NumberField from './fields/number-field';
import SelectField from './fields/select-field';
import InputField from './fields/input-field';
import BooleanField from './fields/boolean-field';
import HelpCard from '../components/help-card';

const ChainForm = (props) => {
    const { onSave, onCancel, onShowHelp } = props;
    const [validated, setValidated] = useState(false);
    const [data, setData] = useState(props.data);
    const [visibleHelp, setVisibleHelp] = useState(false);

    const updateSettings = (changedData, value) => {
        const props = changedData.properties
            .find(dp => dp.name === "settings")
            .itemProperties
            .find(ip => ip.name === value);

        if (!props) changedData.settings = [];
        else changedData.settings = props.properties.map(p => ({ name: p.name, value: p.default }));
        setData({ ...changedData });
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        onSave({ ...data });
    }

    const handleSettings = (name, value) => {
        const tmpSetts = [...data.settings];
        tmpSetts.splice(tmpSetts.indexOf(data.settings.find(s => s.name === name)), 1, { name, value });
        data.settings = [...tmpSetts];
        setData({ ...data });
    }

    return (
        <Card bg="light" text="dark" style={{ fontSize: `0.75rem`, border: `0 solid #ccc` }}>
            <Card.Header style={{ padding: `0.25rem` }}>
                <Button as="div" size="sm"
                    onClick={e => {
                        setVisibleHelp(!visibleHelp);
                        onShowHelp(!visibleHelp);
                    }}
                    style={{
                        backgroundColor: `Transparent`,
                        color: `#343a40`,
                        border: `0 solid white`,
                        width: `auto`,
                        height: `auto`,
                        marginLeft: `0.5rem`
                    }}>
                    <Icon icon={visibleHelp ? faChevronCircleLeft : faInfoCircle} size="1x" />
                    <small title="Click to expand or collapse">Help</small>
                </Button>
            </Card.Header>
            <Card.Body>
                <Form id="frmChain" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row className="mb-2">
                        <Col>
                            {data.properties.map((prop, index) => {
                                return (
                                    {
                                        select: (
                                            <SelectField key={`prop${prop.name}${index}`}
                                                prop={prop}
                                                index={index}
                                                data={data}
                                                onValueChange={(changedData, updatedValue) => {
                                                    if (!!prop.refProperty) updateSettings(changedData, updatedValue);
                                                }}
                                            />
                                        ),

                                        array: (() => {
                                            if (prop.type !== 'array') return null;

                                            return data.settings.map((sett, j) => {
                                                const arrProps = prop.itemProperties
                                                    .find(ip => ip.name === data[prop.refProperty]);

                                                if (!arrProps) return null;
                                                const arrProp = arrProps.properties.find(ap => ap.name === sett.name);

                                                return (
                                                    {
                                                        number: (
                                                            <NumberField key={`prop${sett.name}${j}`}
                                                                prop={arrProp}
                                                                index={j}
                                                                data={sett}
                                                                isNameValue={true}
                                                                onValueChange={(changedData, updatedValue) => handleSettings(sett.name, updatedValue)}
                                                            />
                                                        ),

                                                        input: (
                                                            <InputField key={`prop${sett.name}${j}`}
                                                                prop={arrProp}
                                                                index={j}
                                                                data={sett}
                                                                isNameValue={true}
                                                                onValueChange={(changedData, updatedValue) => handleSettings(sett.name, updatedValue)}
                                                            />
                                                        ),

                                                        checkbox: (
                                                            <BooleanField key={`prop${sett.name}${j}`}
                                                                prop={arrProp}
                                                                index={j}
                                                                data={sett}
                                                                onValueChange={(changedData, isChecked) => handleSettings(sett.name, isChecked)}
                                                            />
                                                        )

                                                    }[arrProp.type]
                                                )
                                            })
                                        })()

                                    }[prop.type]
                                )
                            })}
                        </Col>
                        {visibleHelp && <Col lg={8}>
                            <HelpCard data={data} />
                        </Col>}
                    </Form.Row>
                    <Button id="save" type="submit" variant="outline-primary" size="sm" style={{ float: `right` }}>
                        Save
                    </Button>
                    <Button id="cancel" variant="outline-secondary" size="sm"
                        onClick={onCancel}
                        style={{ float: `right`, marginRight: `8px` }}>
                        Cancel
                    </Button>
                </Form>
            </Card.Body>
        </Card >
    )
}
ChainForm.propTypes = {
    data: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onShowHelp: PropTypes.func.isRequired,
}

export default ChainForm;
