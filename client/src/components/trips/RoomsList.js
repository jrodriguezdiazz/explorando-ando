import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';

const RoomCard = ({room}) => {
  return (<Card>
      <Card.Img variant="top" src={room.image} />
      <Card.Body>
        <Card.Title>{room.name}</Card.Title>
        <Card.Text>
          {room.feature.map((item) => (<li key={item}>{item}</li>))}
        </Card.Text>
        <Button variant="primary">Reservar</Button>
      </Card.Body>
    </Card>);
};

const RoomsList = ({trip}) => {
  const {accommodations} = trip;
  return (<Row xs={1} md={2} className="g-4">
      {accommodations?.map((accommodation) => (<Col key={accommodation.id}>
          <RoomCard room={accommodation} />
        </Col>))}
    </Row>);
};


export default RoomsList;
