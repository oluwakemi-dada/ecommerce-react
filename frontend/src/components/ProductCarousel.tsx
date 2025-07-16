import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Image, Carousel } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import { getErrorMessage } from '../utils/errorUtils';

const ProductCarousel: FC = () => {
  const { data: products, error } = useGetTopProductsQuery();

  return (
    <>
      {error && <Message variant='danger'>{getErrorMessage(error)}</Message>}

      {products && (
        <Carousel pause='hover' className='bg-primary mb-4'>
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='carousel-caption'>
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
