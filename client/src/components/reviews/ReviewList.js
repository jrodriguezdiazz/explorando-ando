import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';

const reviews = [
  {
    title: "Salto Jimenoa 2",
    content: "“El ministerio hizo un buen trabajo en la remodelación de los puentes colgantes, señalizaciones y demás. Es un...",
    rating: 4,
    author: "Olga",
    imageUrl: "/path-to-image.jpg"
  },
  {
    title: "Rio Partido",
    content: "“Realmente no necesitas un 4x4, pero sí un SUV y zapatos para caminar. Cenamos nuestro guía turístico...",
    rating: 5,
    author: "Tomás",
    imageUrl: "/path-to-image.jpg"
  },
  // ... more reviews
];

const ReviewCard = ({ review }) => {
  return (
    <Card className="mb-4" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={review.imageUrl} />
      <Card.Body>
        <Card.Title>{review.title}</Card.Title>
        <Card.Text>
          {review.content}
        </Card.Text>
        <div className="review-rating">
          {[...Array(review.rating)].map((_, i) => (
            <StarFill key={i} color="gold" />
          ))}
        </div>
        <Card.Text>
          <small className="text-muted">{review.author}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const ReviewsSection = () => {
  return (
    <Row xs={1} md={3} className="g-4">
      {reviews.map((review, idx) => (
        <Col key={idx}>
          <ReviewCard review={review} />
        </Col>
      ))}
    </Row>
  );
};

export default ReviewsSection;
