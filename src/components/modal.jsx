import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";

const ModalDialog = (props) => {
    const { title, size, children, onCancel } = props;
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        onCancel();
    }

    return (
        <Modal show={show} onHide={handleClose} size={size} scrollable={true}>
            <Modal.Header style={{ backgroundColor: "var(--dark)", color: "var(--light)" }} closeButton>{title}</Modal.Header>
            <Modal.Body style={{ padding: `0rem` }}>
                {children}
            </Modal.Body>
        </Modal>
    )
}
ModalDialog.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onCancel: PropTypes.func.isRequired,
}

export default ModalDialog;
