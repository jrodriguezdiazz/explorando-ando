import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';

export const ConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
  return (
    <Modal show={confirmDialog.isOpen} onHide={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
      <Modal.Header closeButton>
        <Modal.Title>
          <QuestionCircle size={30} /> {confirmDialog.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {confirmDialog.subTitle}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
          No
        </Button>
        <Button variant="primary" onClick={confirmDialog.onConfirm}>
          Sí
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmDialog.propTypes = {
  confirmDialog: PropTypes.object.isRequired,
  setConfirmDialog: PropTypes.func.isRequired,
};
