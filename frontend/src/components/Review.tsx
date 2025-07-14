import type { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import type { Review as ReviewType } from '../types';
import Rating from './Rating';

type ReviewProps = {
  review: ReviewType;
};

const Review: FC<ReviewProps> = ({ review }) => {
  return (
    <ListGroup.Item>
      <strong>{review.name}</strong>
      <Rating value={review.rating} />
      <p>{review.createdAt.substring(0, 10)}</p>
      <p>{review.comment}</p>
    </ListGroup.Item>
  );
};

export default Review;
