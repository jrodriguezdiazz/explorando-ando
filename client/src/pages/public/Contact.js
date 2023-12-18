import React from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Facebook, Instagram} from '../../components/common/Icons';
import Iframe from '../../components/common/Iframe';

const Contact = () => {
  return (<Container>
    <Row className="my-4">
      <Col md={6} sx={12}>
        <Row>
          <h2>Mantengámonos en contacto</h2>
          <p>
            En Explorando Ando, estamos comprometidos con brindarte la mejor experiencia. Ya sea que tengas preguntas sobre nuestros servicios, necesites asistencia para planificar tu próximo viaje, o simplemente quieras compartir tus experiencias y sugerencias, estamos aquí para escucharte.
            ¡Tu aventura comienza con un mensaje!
          </p>
          <Row className="social-icons">
            <Col xs={3}>
              <Link to="/"><Facebook /></Link>
            </Col>
            <Col xs={3}>
              <Link to="/"><Instagram /></Link>
            </Col>
          </Row>
        </Row>
        <Row>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Escribe tu email" />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control type="text" placeholder="Escribre tu nombre" />
            </Form.Group>

            <Form.Group controlId="formBasicSubject">
              <Form.Label>Tema</Form.Label>
              <Form.Control type="text" placeholder="Escribe el tema" />
            </Form.Group>

            <Form.Group controlId="formBasicMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Tu mensaje" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Row>
      </Col>
      <Col md={5} sx={12}>
        <Row>
          <Iframe
            src={'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15047.745278022!2d-70.6842885!3d19.4583122!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c588ebfa7e65%3A0xf4f05177e484049e!2sBella%20Terra%20Mall!5e0!3m2!1sen!2sdo!4v1702859435251!5m2!1sen!2sdo'}
          />
        </Row>
        <Row>
          contacto
          address: bella terra mall no. 205 a kediri, pare ag17 phone: 123 456 7890 email: explorandoando@gmail.com maps: explorando ando, bella terra mall
        </Row>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <div className="text-center py-4">
          <Link to="/terms-and-conditions" className="text-dark">Terms & Conditions</Link> |
          <Link to="/privacy-policy" className="text-dark">Privacy Policy</Link>
        </div>
      </Col>
    </Row>
  </Container>);
};

export default Contact;
