import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const CheckBox = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <Form.Group>
      <Form.Check
        type="checkbox"
        label={label}
        id={props.id || props.name}
        {...field}
        {...props}
        isInvalid={meta.touched && Boolean(meta.error)}
        isValid={meta.touched && !Boolean(meta.error)}
      />
      {meta.touched && Boolean(meta.error) && (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  // other propTypes as needed...
};

export default CheckBox;
