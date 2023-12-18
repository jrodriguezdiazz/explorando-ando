import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import ReviewsSection from '../../components/reviews/ReviewList';
import SearchBar from '../../components/SearchBar';
import TripsList from '../../components/trips/TripsList';

const HomePage = () => {
  return (
    <Container fluid style={{backgroundColor: '#f8f9fa'}}>
      <Row className="justify-content-md-center text-center">
        <Col>
          <h1>Explore la República Dominicana con una sonrisa</h1>
          <p>Descubre la belleza y el encanto de la República Dominicana. Viaje, Viva y Sonría en Cada Aventura.</p>
          <SearchBar />
        </Col>
      </Row>
      <Row className="justify-content-md-center text-center my-4">
        <Col md={12}>
          <h2>Próximos viajes que te pueden gustar</h2>
          <TripsList />
        </Col>
      </Row>
      <Row className="justify-content-md-center text-center my-4">
        <Col md={12}>
          <h2>Reseñas y Comentarios</h2>
          <ReviewsSection />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
