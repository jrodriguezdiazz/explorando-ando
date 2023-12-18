import React, {useState} from 'react';
import {Button, Col, Container, Form, FormControl, InputGroup, Row} from 'react-bootstrap';
import {Eye, EyeSlash} from 'react-bootstrap-icons';

export default function SingupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle the actual registration logic here
  const handleRegister = (event) => {
    event.preventDefault();
    // Perform registration
  };

  return (
    <Container
      style={{
        width: '80%'
      }}>
      <h1>Registro</h1>
      <p>Vamos a prepararte para que puedas acceder a tu cuenta personal.</p>
      <Form onSubmit={handleRegister}>
        <Row>
          <Col>
            <Form.Group controlId="registrationFirstName">
              <Form.Label>Primer Nombre</Form.Label>
              <Form.Control type="text" placeholder="John" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="registrationLastName">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" placeholder="Doe" required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="registrationEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="john.doe@gmail.com" required />
        </Form.Group>

        <Form.Group controlId="registrationPhone">
          <Form.Label>Número Telefónico</Form.Label>
          <Form.Control type="tel" placeholder="123 456 7890" required />
        </Form.Group>

        <Form.Group controlId="registrationPassword">
          <Form.Label>Contraseña</Form.Label>
          <InputGroup>
            <FormControl
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              required
            />
            <InputGroup.Text onClick={togglePasswordVisibility}>
              {showPassword ? <EyeSlash /> : <Eye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="registrationConfirmPassword">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <InputGroup>
            <FormControl
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="********"
              required
            />
            <InputGroup.Text onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <EyeSlash /> : <Eye />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="registrationTerms" className="mb-3">
          <Form.Check type="checkbox" label="Acepto todos los Términos y Políticas de Privacidad" required />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-2">
          Crear Cuenta
        </Button>

        <Form.Text className="text-muted">
          ¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a>
        </Form.Text>
      </Form>
    </Container>
  );
}
