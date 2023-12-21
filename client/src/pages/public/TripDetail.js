import {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import Image from '../../components/common/Image';
import Loading from '../../components/Loading';
import AmenitiesList from '../../components/trips/AmenitiesList';
import Explore from '../../components/trips/Explore';
import RoomsList from '../../components/trips/RoomsList';
import TripDescription from '../../components/trips/TripDescription';
import useTripStore from '../../stores/tripStore';

const TripDetail = () => {
  const [trip, setTrip] = useState();
  const {tripId} = useParams();
  const {getTripById} = useTripStore((state) => state);

  useEffect(() => {
    async function fetchData() {
      const trips = await getTripById(tripId);
      console.log(trips.data.data[0]);
      setTrip(trips.data.data[0]);
    }
    fetchData();
  }, []);

  if (!trip) return <Loading />;

  return (<Container fluid>
      <Row className="my-4">
        <Image
          height={300}
          src={trip.banner} />
        <Col lg={8}>
          <TripDescription trip={trip}/>
          <AmenitiesList trip={trip}/>
          <RoomsList trip={trip}/>
        </Col>
        <Col lg={4}>
          <Explore trip={trip}/>
        </Col>
      </Row>
    </Container>);
};

export default TripDetail;
