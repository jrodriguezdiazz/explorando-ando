import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const trips = [
  {
    title: "Punta Cana",
    description: "Playa • Familia • Relajación",
    imageUrl: "/path-to-image-punta-cana.jpg"
  },
  {
    title: "Zona Colonial",
    description: "Historia • Cultura • Gastronomía",
    imageUrl: "/path-to-image-zona-colonial.jpg"
  },
  // ... más viajes
];

const TripCard = ({ trip }) => {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={trip.imageUrl} />
      <Card.Body>
        <Card.Title>{trip.title}</Card.Title>
        <Card.Text>{trip.description}</Card.Text>
        <Button variant="primary">Explorar</Button>
      </Card.Body>
    </Card>
  );
};

const TripsList = () => {
  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {trips.map((trip, idx) => (
        <Col key={idx}>
          <TripCard trip={trip} />
        </Col>
      ))}
    </Row>
  );
};

export default TripsList;
