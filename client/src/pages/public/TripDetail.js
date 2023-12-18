import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import Image from '../../components/common/Image';
import AmenitiesList from '../../components/trips/AmenitiesList';
import Explore from '../../components/trips/Explore';
import RoomsList from '../../components/trips/RoomsList';
import TripDescription from '../../components/trips/TripDescription';

const TripDetail = () => {
  return (
    <Container fluid>
      <Row className="my-4">
        <Image
          height={300}
          src={'https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg'} />
        <Col lg={8}>
          <TripDescription />
          <AmenitiesList />
          <RoomsList />
        </Col>
        <Col lg={4}>
          <Explore />
        </Col>
      </Row>
    </Container>
  );
};

export default TripDetail;
