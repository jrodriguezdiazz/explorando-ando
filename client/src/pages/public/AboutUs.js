import React from 'react';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {Facebook, Instagram, Tripadvisor, Twitter} from '../../components/common/Icons';

const AboutUs = () => {
  return (
    <Container>
      <Row className="my-4">
        <Col xs={12} md={8}>
          <h1>NOSOTROS</h1>
          <p>
            ExplorandoAndo es la plataforma web para los amantes de los viajes en la República Dominicana. En nuestro sitio, miles de viajeros confían cada mes en la sabiduría colectiva de exploradores previos. El sitio web se basa en un enfoque personalizado, utilizando reseñas, opiniones de usuarios previos y el perfil individual de cada usuario para ofrecer recomendaciones sólidas y satisfacer sus necesidades específicas.
          </p>
          <p>
            Ya sea que busque aventuras emocionantes o tranquilidad en playas paradisíacas, ExplorandoAndo ayudará a descubrir los destinos más espectaculares de la República Dominicana. Además de estas recomendaciones, te brindamos acceso exclusivo a ofertas y opciones de reserva sencillas para que puedas planificar tu próximo viaje con facilidad y ahorrar en el proceso.
          </p>
        </Col>
        <Col xs={12} md={3}>
          <Card>
            <Card.Img variant="top" src="https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg" />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={3}>
          <Card>
            <Card.Img variant="top" src="/path-to-your-image.jpg" />
            <Card.Body>
              <Card.Title>Juan Carrasco</Card.Title>
              <Card.Text>Co-Fundador</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card>
            <Card.Img variant="top" src="/path-to-your-image.jpg" />
            <Card.Body>
              <Card.Title>Juan Carrasco</Card.Title>
              <Card.Text>Co-Fundador</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card>
            <Card.Img variant="top" src="/path-to-your-image.jpg" />
            <Card.Body>
              <Card.Title>Juan Carrasco</Card.Title>
              <Card.Text>Co-Fundador</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card>
            <Card.Img variant="top" src="/path-to-your-image.jpg" />
            <Card.Body>
              <Card.Title>Juan Carrasco</Card.Title>
              <Card.Text>Co-Fundador</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* Repite la estructura de Card para los otros miembros del equipo */}
      </Row>
      <Row className="mt-5">
        <Col xs={12} className="text-center">
          <Button variant="link"><Facebook /></Button>
          <Button variant="link"><Instagram /></Button>
          <Button variant="link"><Twitter /></Button>
          <Button variant="link"><Tripadvisor /></Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
