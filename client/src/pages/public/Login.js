import React, {useCallback} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import LoginForm from '../../components/auth/LoginForm';
import Image from '../../components/common/Image';
import useAuthStore from '../../stores/authStore';

const Login = () => {
  const {errorMessage, login} = useAuthStore((state) => state);

  const handleSubmit = useCallback((values) => login(values), []);

  return (
    <Container fluid>
      <Row className="vh-100">
        <Col md={6} className="my-auto">
          <LoginForm
            handleSubmit={handleSubmit} errorMessage={errorMessage}
          />
        </Col>
        <Col
          md={6} className="d-none d-md-block" style={{
          paddingRight: 0
        }}>
          <Image
            width={'100%'}
            height={'100%'}
            src="https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg" alt="Login Image"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
