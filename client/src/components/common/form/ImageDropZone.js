import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Form } from 'react-bootstrap';
import { useField } from 'formik';
import Thumbnail from './Thumbnail';

export const ImageDropZone = ({ urlImage, ...props }) => {
  const [field, meta] = useField(props);
  const [file, setFile] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      field.onChange({ target: { value: newFile, name: field.name } });
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    },
  });

  return (
    <section {...getRootProps()}>
      <Form.Group>
        <Form.File
          {...getInputProps()}
          label="Drag and drop some files here, or click to select files"
          data-browse="Browse"
          custom
          isInvalid={meta.touched && Boolean(meta.error)}
        />
        <Form.Control.Feedback type="invalid">
          {meta.touched && meta.error}
        </Form.Control.Feedback>
      </Form.Group>
      {(file || urlImage) && <Thumbnail file={file} urlImage={urlImage} />}
      <p><em>(Only *.jpeg and *.png images will be accepted)</em></p>
    </section>
  );
};

ImageDropZone.propTypes = {
  urlImage: PropTypes.string,
  // other propTypes as needed...
};
