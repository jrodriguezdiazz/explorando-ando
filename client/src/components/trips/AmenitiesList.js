import React from 'react';
import {Col, ListGroup, Row} from 'react-bootstrap';
import {CardChecklist} from 'react-bootstrap-icons';

const AmenitiesList = ({trip}) => {
  const {tripscomforts} = trip;
  return (

    <Row className="my-4">
      <Col md={12} sx={12} l={8}>
        <h3>Facilidades</h3>
        <ListGroup horizontal>
          {tripscomforts?.map((confort) => (
            <ListGroup.Item key={confort}>
              <CardChecklist /> {confort}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default AmenitiesList;
