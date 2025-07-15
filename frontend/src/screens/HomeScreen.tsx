import type { FC } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getErrorMessage } from '../utils/errorUtils';
import type { Product as ProductType } from '../types';
import { Link, useParams } from 'react-router';
import Paginate from '../components/Paginate';

const HomeScreen: FC = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber: pageNumber ?? '1',
  });
  return (
    <>
      {keyword && (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading && <Loader />}
      {error && <Message variant='danger'>{getErrorMessage(error)}</Message>}
      {data?.products && (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products?.map((product: ProductType) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
