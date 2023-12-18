import PropTypes from 'prop-types';
import React from 'react';
import { Alert } from 'react-bootstrap';
import { CheckCircle, ExclamationDiamond, InfoCircle, XCircle } from 'react-bootstrap-icons';

const variantIcon = {
  success: <CheckCircle />,
  warning: <ExclamationDiamond />,
  error: <XCircle />,
  info: <InfoCircle />,
};

const CustomizedSnackbar = ({ message, variant }) => {
  return (
    <Alert variant={variant} className="d-flex align-items-center">
      {variantIcon[variant]}
      <span className="ml-3">{message}</span>
    </Alert>
  );
};

CustomizedSnackbar.propTypes = {
  message: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default CustomizedSnackbar;
