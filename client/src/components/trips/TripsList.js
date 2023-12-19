import React, {useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import useTripStore from '../../stores/tripStore';
import Loading from '../common/Loading';
import {TripCard} from './TripCard';

const TripsList = () => {
  const {nextTrips, fetchNextTrips} = useTripStore((state) => state);

  useEffect(() => {
    async function fetchData() {
      await fetchNextTrips();
    }

    fetchData()
  }, []);

  if (!nextTrips.length) return <Loading />;

  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {nextTrips.map((trip) => (
        <Col key={trip.id}>
          <TripCard trip={trip} />
        </Col>
      ))}
    </Row>
  );
};

export default TripsList;
