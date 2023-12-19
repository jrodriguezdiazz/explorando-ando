import React, {useEffect} from 'react';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import useTripStore from '../../stores/tripStore';

const destinations = [
  {
    title: 'Punta Cana',
    description: 'La zona turística más popular de República Dominicana.',
    date: 'September 19, 2024',
    imageUrl: 'https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg'
  },
  {
    title: 'Punta Cana',
    description: 'La zona turística más popular de República Dominicana.',
    date: 'September 19, 2024',
    imageUrl: 'https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg'
  },
  {
    title: "Punta Cana",
    description: "La zona turística más popular de República Dominicana.",
    date: "September 19, 2024",
    imageUrl: "https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg"
  },
  {
    title: "Punta Cana",
    description: "La zona turística más popular de República Dominicana.",
    date: "September 19, 2024",
    imageUrl: "https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg"
  },
  {
    title: "Punta Cana",
    description: "La zona turística más popular de República Dominicana.",
    date: "September 19, 2024",
    imageUrl: "https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg"
  },
  {
    title: "Punta Cana",
    description: "La zona turística más popular de República Dominicana.",
    date: "September 19, 2024",
    imageUrl: "https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg"
  },
  // ... other destinations
];

const DestinationCard = ({ destination }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={destination.imageUrl} />
      <Card.Body>
        <Card.Title>{destination.title}</Card.Title>
        <Card.Text>
          {destination.description}
        </Card.Text>
        <Button variant="primary">Explore</Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{destination.date}</small>
      </Card.Footer>
    </Card>
  );
};

const TripsResults = () => {
  const {trips} = useTripStore((state) => state);

  useEffect(() => {
    console.log(trips);
  }, []);

  return (
    <Container>
      <h3>
        Destinos/ofertas que te pueden gustar
      </h3>
      <Row xs={1} md={2} lg={4} className="g-4">
        {destinations.map((destination, idx) => (
          <Col key={idx}>
            <DestinationCard destination={destination} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TripsResults;
