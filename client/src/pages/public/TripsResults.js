import React, {useEffect} from 'react';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Loading from '../../components/common/Loading';
import useTripStore from '../../stores/tripStore';

const TripCard = ({trip}) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/explora/${trip.id}`);
  };

  return (
    <Card style={{width: '18rem', margin: '20px 0px'}}>
      <Card.Img variant="top" src={trip.banner} />
      <Card.Body>
        <Card.Title>{trip.title}</Card.Title>
        <Card.Text>
          {trip.description.slice(0, 100)}...
        </Card.Text>
        <Button variant="primary" onClick={handleClick}>Ver en detalle 👀</Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Provincia: {trip.province}</small>
      </Card.Footer>
    </Card>
  );
};

const TripsResults = () => {
  const {trips} = useTripStore((state) => state);

  useEffect(() => {
    console.log(trips);
  }, []);

  if (!trips.length) return <Loading />;
  return (
    <Container>
      <h3>
        Destinos/ofertas que te pueden gustar
      </h3>
      <Row xs={1} md={2} lg={4} className="g-4">
        {trips.map((trip) => (
          <Col key={trip.id}>
            <TripCard trip={trip} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TripsResults;
