import React from 'react';
import PropTypes from 'prop-types';
import { Toast, Alert } from 'react-bootstrap';

export const Notification = ({ notify, setNotify }) => {

  const handleClose = () => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Toast
      onClose={handleClose}
      show={notify.isOpen}
      delay={3000}
      autohide
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
      }}
    >
      <Toast.Header closeButton={false}>
        <strong className="mr-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>
        <Alert
          variant={notify.type === 'error' ? 'danger' : notify.type}
          onClose={handleClose}
          dismissible
        >
          {notify.message}
        </Alert>
      </Toast.Body>
    </Toast>
  );
};

Notification.propTypes = {
  notify: PropTypes.object.isRequired,
  setNotify: PropTypes.func.isRequired,
};

export default Notification;
