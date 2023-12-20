import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const DropDown = ({ label, items = [], ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as="select"
        {...field}
        {...props}
        isInvalid={meta.touched && Boolean(meta.error)}
        isValid={meta.touched && !Boolean(meta.error)}
      >
        {items.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Form.Control>
      {meta.touched && Boolean(meta.error) && (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

DropDown.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  )
};

export default DropDown;
