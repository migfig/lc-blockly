import React from 'react';
import PropTypes from 'prop-types';

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Icon from './icon';

const InfoPopOverlay = ({ title, children }) => {
    return (
        <Popover id="popOver">
            <Popover.Title><small>{title}</small></Popover.Title>
            <Popover.Content>{children}</Popover.Content>
        </Popover>
    )
}
InfoPopOverlay.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

const InfoPopover = ({ title, children }) => {
    return (
        <OverlayTrigger trigger="click" placement="right" style={{ position: `relative` }}
            overlay={<InfoPopOverlay title={title} children={children} />}>
            <Button as="div" size="sm"
                style={{
                    backgroundColor: `Transparent`,
                    border: `0 solid white`,
                    width: `auto`,
                    height: `auto`,
                    marginLeft: `-4px`
                }}>
                <Icon icon={faInfoCircle} size="sm" />
            </Button>
        </OverlayTrigger>
    )
}
InfoPopover.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default InfoPopover;
