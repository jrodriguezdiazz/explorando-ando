import React, {useEffect} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import Loading from '../../components/common/Loading';
import {TripCard} from '../../components/trips/TripCard';
import useTripStore from '../../stores/tripStore';


const TripsResults = () => {
  const {trips} = useTripStore((state) => state);

  useEffect(() => {
    console.log(trips);
  }, []);

  if (!trips.length) return <Loading />;
  return (
    <Container>
      <h3>
        Destinos/ofertas que te pueden gustar
      </h3>
      <Row xs={1} md={2} lg={4} className="g-4">
        {trips.map((trip) => (
          <Col key={trip.id}>
            <TripCard trip={trip} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TripsResults;
