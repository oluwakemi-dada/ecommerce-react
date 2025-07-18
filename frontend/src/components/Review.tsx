import { ListGroup } from 'react-bootstrap';
import type { Review as ReviewType } from '../types';
import Rating from './Rating';

type Props = {
  review: ReviewType;
};

const Review = ({ review }: Props) => {
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
