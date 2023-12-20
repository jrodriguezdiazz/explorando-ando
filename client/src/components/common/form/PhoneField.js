import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const PhoneField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Form.Group controlId={field.name}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        {...field}
        as="input"
        type="tel"
        isInvalid={meta.touched && Boolean(meta.error)}
        {...props}
      />
      <Form.Control.Feedback type="invalid">
        {meta.touched && meta.error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

PhoneField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default PhoneField;
