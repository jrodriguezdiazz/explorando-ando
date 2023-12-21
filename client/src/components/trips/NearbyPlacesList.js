import React, {Fragment} from 'react';
import {ListGroup} from 'react-bootstrap';
import {GeoAltFill} from 'react-bootstrap-icons';

const NearbyPlacesList = ({trip}) => {
  const {nearbyPlaces} = trip;
  return (<Fragment>
    <ListGroup as="ol" numbered className="my-4">
      {nearbyPlaces?.map(({name, distance}) => (<ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        key={name}
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{name}</div>
        </div>
        <GeoAltFill className="ms-2" /> {distance}
      </ListGroup.Item>))}
    </ListGroup>
  </Fragment>);
};

export default NearbyPlacesList;
