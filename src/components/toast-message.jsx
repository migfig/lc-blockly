import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Toast from 'react-bootstrap/Toast';
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import Icon from './icon';

const ToastMessage = ({ title, message, onClose }) => {
    const [show, setShow] = useState(true);

    return <Toast onClose={e => {
            setShow(false);
            onClose();
        }} show={show}
        style={{
            position: `absolute`,
            bottom: 0,
            right: 0,
            zIndex: 9000
        }}
        delay={3000} autohide>
        <Toast.Header>
            <Icon icon={faRobot} size="sm" />
            <strong className="mr-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>
            {message}
        </Toast.Body>
    </Toast>
}
ToastMessage.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ToastMessage;
