import React from 'react';
import PropTypes from 'prop-types';
import { Button as RBButton } from 'react-bootstrap';

export const Button = ({ children, variant, color, className, ...props }) => {
  let bootstrapVariant = '';
  if (variant === 'outlined') {
    bootstrapVariant = color === 'primary' ? 'outline-primary' : 'outline-danger';
  } else {
    bootstrapVariant = color === 'primary' ? 'primary' : 'danger';
  }

  return (
    <RBButton className={className} variant={bootstrapVariant} {...props}>
      {children}
    </RBButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};
