import React from 'react';
import {Col, ListGroup, Row} from 'react-bootstrap';
import {Briefcase, Fan, Wifi1} from 'react-bootstrap-icons';

const AmenitiesList = () => {
  return (

    <Row className="my-4">
      <Col md={8}>
        <h3>Facilidades</h3>
        <ListGroup horizontal>
          <ListGroup.Item>
            <Wifi1 /> Free Wifi1
          </ListGroup.Item>
          <ListGroup.Item>
            <Briefcase /> Business Services
          </ListGroup.Item>
          <ListGroup.Item>
            <Fan /> Air Conditioning
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default AmenitiesList;
