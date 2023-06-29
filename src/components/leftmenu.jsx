import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { faFileCode, faTrashAlt, faClone } from "@fortawesome/free-regular-svg-icons";
import Icon from './icon';
import { xmlFields } from './../utils';

const LeftMenu = (props) => {
    const { onItemSelected, onItemRemoved, onItemClonned } = props;
    const [menu,] = useState(props.menu);
    const [isActive, setIsActive] = useState(menu[0].items.map(mi => false));

    const handleActiveState = (index) => {
        const resetState = menu[0].items.map(mi => false);
        resetState[index] = !isActive[index];
        setIsActive(resetState);
    }

    return (
        <>
            {menu.map((m, i) =>
                <ListGroup key={`leftMenu${i}`}>
                    <ListGroup.Item action href={`#${m.label}`} disabled style={{ marginLeft: `-8px`, backgroundColor: `#1e1e1e` }}>
                        <small>
                            <strong style={{ color: `#98caff`}}>
                                <Icon icon={m.icon} size="sm" /> {m.label}
                            </strong>
                        </small>
                    </ListGroup.Item>
                    {m.items && Array.isArray(m.items) && m.items.map((mi, j, array) => {
                        const fields = xmlFields(mi.content, ["TRAIN", "FLAVOR"]);
                        const type = fields.find(f => f.name === 'TRAIN').value;
                        const flavor = fields.find(f => f.name === 'FLAVOR').value;
                        
                        return (<ListGroup.Item key={`leftMenuItem${j}`} active={mi.id === localStorage.getItem("selectedApplicationId")}
                            action
                            href={`#${mi.name}`}
                            className={isActive[j] ? "list-group-item.active" : ""}
                            onSelect={() => {
                                handleActiveState(j);
                                onItemSelected(mi, j);
                            }}
                            style={{ padding: 0 }}
                        >
                            <Row style={{ marginLeft: 0, marginRight: 0, backgroundColor: '#1e1e1e' }}>
                                <Col lg={1}>
                                    <Icon icon={faFileCode} size="sm" />
                                </Col>
                                <Col>
                                    <small style={{ color: `#63aeff` }}>{mi.name}</small>
                                    <br />
                                    <small style={{ color: `#ccc` }}>{type.toLowerCase()}: <i>{flavor.toLowerCase()}</i></small>
                                </Col>
                                <Col lg={5}>
                                    <Button as="div" size="sm"
                                        onClick={e => onItemRemoved(mi, j)}
                                        style={{
                                            backgroundColor: `Transparent`,
                                            color: `#343a40`,
                                            border: `0 solid white`,
                                            width: `auto`,
                                            height: `auto`,
                                            float: `right`,
                                        }}>
                                        <Icon icon={faTrashAlt} size="sm" />
                                    </Button>
                                    <Button as="div" size="sm"
                                        onClick={e => onItemClonned(mi, j)}
                                        style={{
                                            backgroundColor: `Transparent`,
                                            color: `#343a40`,
                                            border: `0 solid white`,
                                            width: `auto`,
                                            height: `auto`,
                                            float: `right`,
                                        }}>
                                        <Icon icon={faClone} size="sm" />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>)
                    })}
                </ListGroup>
            )}
        </>
    )
}
LeftMenu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
    onItemRemoved: PropTypes.func.isRequired,
    onItemClonned: PropTypes.func.isRequired,
    menu: PropTypes.array.isRequired,
}

export default LeftMenu;
