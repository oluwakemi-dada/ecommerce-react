import type { FC } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router';

import Rating from './Rating';
import type { Product as ProductType } from '../types';
import { getFullImageUrl } from '../utils/imageUtils';

type ProductProps = {
  product: ProductType;
};

const Product: FC<ProductProps> = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded '>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={getFullImageUrl(product.image)} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating ?? 0}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'> ${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
