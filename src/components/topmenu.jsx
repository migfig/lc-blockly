import React, { useState } from 'react';
import PropTypes from 'prop-types';

import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropDown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { faRobot } from "@fortawesome/free-solid-svg-icons";

import Icon from './icon';

const TopMenu = ({ onItemSelected, isBusy, menu: topMenu }) => {
    const [menu,] = useState(topMenu);

    return (
        <NavBar bg="dark" variant="dark">
            <NavBar.Brand href="#home">
                {isBusy ? <Spinner animation="grow" /> : <Icon icon={faRobot} size="lg" />}
                <span style={{color: `#ccc`}}>LangChain Applications</span>
            </NavBar.Brand>
            <NavBar.Toggle />
            <NavBar.Collapse className="justify-content-end">
                <Nav className="ml-auto">
                    {menu.map((m, i) => {
                        if (!!m.options && m.options.length) {
                            return (
                                <DropdownButton key={`topMenu${i}`} as={ButtonGroup} title={m.label} size="sm" variant="dark">
                                    {m.options.map((o, j) => (
                                        <DropDown.Item key={`topInnerMenu${j}`} variant="dark" eventKey={j} onClick={
                                            e => onItemSelected(o, j)
                                        }>
                                            <Icon icon={o.icon} size="sm" color="primary" /> <small>{o.label}</small>
                                        </DropDown.Item>
                                    ))}

                                </DropdownButton>
                            )
                        }
                        else return (
                            <Nav.Link key={`topMenu${i}`} variant="dark" href={m.link} onClick={
                                e => onItemSelected(m, i)
                            }>
                                <Icon icon={m.icon} size="sm" color="primary" /><small>{m.label}</small>
                            </Nav.Link>
                        )
                    })}
                </Nav>
            </NavBar.Collapse>
        </NavBar>
    )
}
TopMenu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
    menu: PropTypes.array.isRequired,
    isBusy: PropTypes.bool.isRequired,
}
TopMenu.defaultProps = {
    isBusy: false,
}

export default TopMenu;
