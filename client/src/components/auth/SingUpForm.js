import {Field, Form as FormikForm, Formik} from 'formik';
import React, {useState} from 'react';
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from 'react-bootstrap';
import {Eye, EyeSlash} from 'react-bootstrap-icons';
import * as Yup from 'yup';
import CustomizedSnackbar from '../common/CustomizedSnackbar';


const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Primer nombre es obligatorio'),
  last_name: Yup.string().required('Apellido es obligatorio'),
  email: Yup.string().email('Email no válido').required('Email es obligatorio'),
  phone: Yup.string().required('Número telefónico es obligatorio'),
  password: Yup.string().required('Contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirmar contraseña es obligatorio'),
  acceptTerms: Yup.bool().oneOf([true], 'Debe aceptar los términos y condiciones'),
});

const sex = [
  {value: 1, label: 'M'},
  {value: 2, label: 'F'},
];

export default function SignupForm({handleSubmit, errorMessage}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const initialValues = {
    first_name: '', last_name: '', email: '', phone: '', password: '', confirmPassword: '', acceptTerms: false,
  };

  return (<Container style={{width: '80%'}}>
    <h1>Registro</h1>
    <p>Vamos a prepararte para que puedas acceder a tu cuenta personal.</p>
    {errorMessage && <CustomizedSnackbar variant="error" message={errorMessage} />}
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({passwordConfirmation, terms, ...values}, {setSubmitting}) => {
        console.log(values);
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({
        values, errors, touched, handleChange, handleBlur, isSubmitting,
      }) => (<FormikForm>
        <Row>
          <Col>
            <Form.Group controlId="registrationfirst_name">
              <Form.Label>Primer Nombre</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.first_name && !!errors.first_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.first_name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="registrationlast_name">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.last_name && !!errors.last_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.last_name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="registrationEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="registrationuser_name">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="user_name"
                name="user_name"
                value={values.user_name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.user_name && !!errors.user_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.user_name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

        </Row>
        <Row>
          <Col>
            <Form.Group controlId="registrationPhone">
              <Form.Label>Número Telefónico</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.phone && !!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="registrationBirthday">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={values.birthday}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.birthday && !!errors.birthday}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birthday}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="registrationPassword">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <FormControl
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                />
                <InputGroup.Text onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="registrationConfirmPassword">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <InputGroup>
                <FormControl
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                />
                <InputGroup.Text onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="registrationGender">
              <Form.Label>Género</Form.Label>
              <Field as="select" name="sex_id" className="form-control">
                {sex.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              {touched.sex_id && errors.sex_id ? (
                <div className="error">{errors.sex_id}</div>
              ) : null}
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>
        <Form.Group controlId="registrationTerms" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Acepto todos los Términos y Políticas de Privacidad"
            name="acceptTerms"
            checked={values.acceptTerms}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.acceptTerms && !!errors.acceptTerms}
          />
          <Form.Control.Feedback type="invalid">
            {errors.acceptTerms}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-2" disabled={isSubmitting}>
          Crear Cuenta
        </Button>
        <Form.Text className="text-muted">
          ¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a>
        </Form.Text>
      </FormikForm>)}
    </Formik>
  </Container>);
}
