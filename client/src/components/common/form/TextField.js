import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const TextField = ({ label, shrink = true, ...props }) => {
  const [field, meta] = useField(props);
  const isMultiline = props?.type === 'textarea';

  return (
    <Form.Group controlId={field.name}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        {...field}
        as={isMultiline ? 'textarea' : 'input'}
        isInvalid={meta.touched && Boolean(meta.error)}
        {...props}
        rows={isMultiline ? 4 : undefined}
      />
      <Form.Control.Feedback type="invalid">
        {meta.touched && meta.error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  shrink: PropTypes.bool,
};

export default TextField;
