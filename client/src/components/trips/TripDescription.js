import React, {Fragment} from 'react';
import {Badge} from 'react-bootstrap';

export default function TripDescription({ trip }) {
  const {title, description, province} = trip
  return (
    <Fragment>
      <h2>{title}</h2>
      <Badge bg="warning" text="light">4.5/5 (84 Reseñas)</Badge>
      <p>Provincia {province}, República Dominicana</p>
      <h4>Descripción del destino</h4>
      <p>
        {description}
      </p>
    </Fragment>
  );
}
