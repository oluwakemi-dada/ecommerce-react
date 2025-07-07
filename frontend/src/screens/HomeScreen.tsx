import type { FC } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getErrorMessage } from '../utils/errorUtils';
import type { Product as ProductType } from '../types';

const HomeScreen: FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant='danger'>{getErrorMessage(error)}</Message>;
  }

  if (products) {
    return (
      <>
        <h1>Latest Products</h1>
        <Row>
          {products?.map((product: ProductType) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </>
    );
  }
};

export default HomeScreen;
