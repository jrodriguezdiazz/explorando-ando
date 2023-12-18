import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';

const RoomCard = ({room}) => {
  return (
    <Card>
      <Card.Img variant="top" src={room.imageUrl} />
      <Card.Body>
        <Card.Title>{room.name}</Card.Title>
        <Card.Text>
          {room.description}
        </Card.Text>
        <Button variant="primary">Reservar</Button>
      </Card.Body>
    </Card>
  );
};

const rooms = [
  {
    name: 'Estándar twin bed, Camas múltiples',
    description: '300 pies cuadrados, Duerme 3, 1 cama doble y 1 cama individual',
    imageUrl: 'path-to-image'
  },
  {
    name: 'Estándar twin bed, Camas múltiples',
    description: '300 pies cuadrados, Duerme 3, 1 cama doble y 1 cama individual',
    imageUrl: 'path-to-image'
  },
  {
    name: 'Estándar twin bed, Camas múltiples',
    description: '300 pies cuadrados, Duerme 3, 1 cama doble y 1 cama individual',
    imageUrl: 'path-to-image'
  },
  {
    name: 'Estándar twin bed, Camas múltiples',
    description: '300 pies cuadrados, Duerme 3, 1 cama doble y 1 cama individual',
    imageUrl: 'path-to-image'
  },

  // ... más habitaciones
];

const RoomsList = () => {
  return (
    <Row xs={1} md={2} className="g-4">
      {rooms.map((room, idx) => (
        <Col key={idx}>
          <RoomCard room={room} />
        </Col>
      ))}
    </Row>
  );
};


export default RoomsList;
