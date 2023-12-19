import React, {Fragment} from 'react';
import {ListGroup} from 'react-bootstrap';
import {GeoAltFill} from 'react-bootstrap-icons';

const NearbyPlacesList = () => {
  const places = [
    { name: "Hotel Penselvanya", distance: "2 en coche" },
    { name: "Travis Bakery store house", distance: "10 en coche" },
    { name: "Olivia Johnson Garden", distance: "15 en coche" },
    { name: "Norman Opera Circus", distance: "18 en coche" },
    { name: "Rockdesert hotel", distance: "32 en coche" }
  ];

  return (
    <Fragment>
      <ListGroup as="ol" numbered className="my-4">
        {places.map((place, index) => (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={index}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{place.name}</div>
            </div>
            <GeoAltFill className="ms-2" /> {place.distance}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Fragment>
  );
};

export default NearbyPlacesList;
