import AmenitiesList from './AmenitiesList';
import React from 'react';
import {Button, Card, Col, ListGroup, Row} from 'react-bootstrap';

const RoomCard = ({room, trip}) => {
  return (<Card>
    <Card.Img variant="top" src={room.image} />
    <Card.Body>
      <Card.Title>{room.name}</Card.Title>
      <Card.Text>
        {room?.feature?.map((item) => (<li key={item}>{item}</li>))}
      </Card.Text>

      <Card.Footer>
        {room?.priceDetails.map((data) => {
          const {price_id, price, valid_from, valid_to} = data;
          return <ListGroup className={'my-3'}>
            <ListGroup.Item key={price_id}>
              <li>
                Precio: USD ${price}
              </li>
              <li>
                Valido desde: {valid_from} - {valid_to}
              </li>
              <Button variant="primary">Reservar</Button>
            </ListGroup.Item>
          </ListGroup>
        })}
        <AmenitiesList trip={trip} />
      </Card.Footer>
    </Card.Body>
  </Card>);
};

const RoomsList = ({trip}) => {
  const {accommodations} = trip;
  return (<div>
    <h3>Habitaciones</h3>
    <Row xs={1} md={2} className="g-4">
      {accommodations?.map((accommodation) => (<Col key={accommodation.id}>
        <RoomCard room={accommodation} trip={trip}/>
      </Col>))}
    </Row>
  </div>);
};


export default RoomsList;
