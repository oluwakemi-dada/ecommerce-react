import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { getErrorMessage } from '../utils/errorUtils';
import { getFullImageUrl } from '../utils/imageUtils';
import Review from '../components/Review';
import ReviewForm from '../components/ReviewForm';
import AddToCartForm from '../components/AddToCartForm';

const ProductScreen = () => {
  const { id: productId } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId!);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      {isLoading && <Loader />}

      {error && <Message variant='danger'>{getErrorMessage(error)}</Message>}

      {product && (
        <>
          <Row>
            <Col md={5}>
              <Image
                src={getFullImageUrl(product.image)}
                alt={product.name}
                fluid
              />
            </Col>

            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating ?? 0}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* ADD TO CART FORM */}
            <AddToCartForm product={product} />
          </Row>

          {/* PRODUCT REVIEW SECTION */}
          <Row className='review'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews?.length === 0 && <Message>No Reviews</Message>}

              <ListGroup variant='flush'>
                {product.reviews?.map((review) => (
                  <Review review={review} key={review._id} />
                ))}

                <ReviewForm productId={productId!} />
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
