import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form as FormikForm } from 'formik';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import LoginSchema from '../../schemas/login';
import CustomizedSnackbar from '../common/CustomizedSnackbar';

export default function LoginForm({ handleSubmit, errorMessage }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container style={{ width: '80%' }}>
      <h1>Iniciar Sesión</h1>
      <p>Inicie sesión para acceder a su cuenta Explorando Ando</p>
      {errorMessage && <CustomizedSnackbar variant="error" message={errorMessage} />}
      <Formik
        initialValues={{ email: '', password: '', remindMe: false }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            <Form.Group controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Field name="email" type="email" as={Form.Control} required />
            </Form.Group>

            <Form.Group controlId="loginPassword">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  as={Form.Control}
                  required
                />
                <InputGroup.Text onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="loginRememberMe" className="mb-3">
              <Field name="remindMe" type="checkbox" as={Form.Check} label="Recuérdame" />
            </Form.Group>

            <Button disabled={isSubmitting} variant="primary" type="submit" className="w-100 mb-2">
              Iniciar Sesión
            </Button>

            <div className="d-flex justify-content-between">
              <Form.Text className="text-muted">
                No tienes cuenta? <Link to={'/registrarse'}>Registrate</Link>
              </Form.Text>
              <Link to={'/RecuperarContraseña'}>¿Olvidaste tu contraseña?</Link>
            </div>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
