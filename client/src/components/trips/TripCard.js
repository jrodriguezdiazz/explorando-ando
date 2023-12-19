import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

export const TripCard = ({trip}) => {
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
