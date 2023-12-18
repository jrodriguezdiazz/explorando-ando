import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import Iframe from '../common/Iframe';
import NearbyPlacesList from '../trips/NearbyPlacesList';

export default function Explore() {
  return (
    <Card>
      <Card.Body>
        <Iframe
          width={'100%'}
          src={'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15047.745278022!2d-70.6842885!3d19.4583122!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c588ebfa7e65%3A0xf4f05177e484049e!2sBella%20Terra%20Mall!5e0!3m2!1sen!2sdo!4v1702859435251!5m2!1sen!2sdo'}
        />
        <Card.Title>Explora el área</Card.Title>
        <ListGroup variant="flush">
          <NearbyPlacesList />
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
