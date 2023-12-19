import React from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import Iframe from '../common/Iframe';
import NearbyPlacesList from '../trips/NearbyPlacesList';

export default function Explore({trip}) {
  const {location} = trip;

  return (
    <Card>
      <Card.Body>
        <Iframe
          width={'100%'}
          src={location}
        />
        <Card.Title className={"mt-4"}>Explora el área</Card.Title>
        <ListGroup variant="flush">
          <NearbyPlacesList trip={trip}/>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
