import React, {useState} from 'react';
import {Button, Container, Form, FormControl, InputGroup} from 'react-bootstrap';
import {Eye, EyeSlash} from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle the actual login logic here
  const handleLogin = (event) => {
    event.preventDefault();
    // Perform login
  };

  return (
    <Container
      style={{
        width: '80%'
      }}>
      <h1>Iniciar Sesión</h1>
      <p>Inicie sesión para acceder a su cuenta Explorando Ando</p>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="loginEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="john.doe@gmail.com" required />
        </Form.Group>

        <Form.Group controlId="loginPassword">
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

        <Form.Group controlId="loginRememberMe" className="mb-3">
          <Form.Check type="checkbox" label="Recuérdame" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-2">
          Iniciar Sesión
        </Button>

        <div className="d-flex justify-content-between">
          <Form.Text className="text-muted">
            No tienes cuenta? <Link href="/registrarse">Registrate</Link>
          </Form.Text>
          <a href="/forgot-password">Recuperar Contraseña</a>
        </div>
      </Form>
    </Container>
  );
}
