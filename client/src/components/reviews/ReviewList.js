import React, {useEffect} from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {StarFill} from 'react-bootstrap-icons';
import useReviewStore from '../../stores/reviewStore';
import Loading from '../common/Loading';

const ReviewCard = ({review}) => {
  return (
    <Card className="mb-4" style={{width: '18rem'}}>
      <Card.Body>
        <Card.Title>{review.tripName} ~ {review.header}</Card.Title>
        <Card.Text>
          {review.review.slice(0, 100)}...
        </Card.Text>
        <div className="review-rating">
          {[...Array(review.starts)].map((_, i) => (
            <StarFill key={i} color="gold" />
          ))}
        </div>
        <Card.Text>
          <small className="text-muted">{review.name}</small>
        </Card.Text>
      </Card.Body>
      <Card.Img variant="top" src={review.image} />
    </Card>
  );
};

const ReviewsSection = () => {
  const {reviews, fetchLatestReviews} = useReviewStore((state) => state);


  useEffect( () => {
    async function fetchData() {
      await fetchLatestReviews();
    }

    fetchData();
  }, []);

  if (!reviews.length) return <Loading />;

  return (
    <Row xs={1} md={3} className="g-4">
      {reviews.map((review) => (
        <Col key={review.id}>
          <ReviewCard review={review} />
        </Col>
      ))}
    </Row>
  );
};

export default ReviewsSection;
