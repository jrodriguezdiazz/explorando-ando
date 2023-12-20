import React from 'react';
import DatePicker from 'react-datepicker';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';

export const Calendar = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { value } = field;
  const { setValue } = helpers;

  return (
    <div>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <DatePicker
        selected={(value && new Date(value)) || null}
        onChange={(val) => setValue(val)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

Calendar.propTypes = {
  label: PropTypes.string,
};
