import type { FC } from 'react';
import { Row, Col } from 'react-bootstrap';

import products from '../products';
import type { Product as ProductType } from '../types';
import Product from '../components/Product';

const HomeScreen: FC = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product: ProductType) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
