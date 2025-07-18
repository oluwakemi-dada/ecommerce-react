import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useCreateReviewMutation } from '../slices/productsApiSlice';
import { getErrorMessage } from '../utils/errorUtils';
import Loader from './Loader';
import Message from './Message';
import type { RootState } from '../types';

type Props = { productId: string };

const ReviewForm = ({ productId }: Props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createReview({
        productId: productId!,
        rating,
        comment,
      }).unwrap();
      toast.success('Review submitted');
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <ListGroup.Item>
      <h2>Write a Customer Review</h2>
      {loadingProductReview && <Loader />}

      {userInfo ? (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='rating' className='my-2'>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as='select'
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value=''>Select</option>
              <option value='1'>1 - Poor</option>
              <option value='2'>2 - Fair</option>
              <option value='3'>3 - Good</option>
              <option value='4'>4 - Very Good</option>
              <option value='5'>5 - Excellent</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='comment' className='my-2'>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            disabled={loadingProductReview}
            type='submit'
            variant='primary'
            aria-label='Submit a review'
          >
            Submit
          </Button>
        </Form>
      ) : (
        <Message>
          Please <Link to='/login'>sign in</Link> to write a review
        </Message>
      )}
    </ListGroup.Item>
  );
};

export default ReviewForm;
