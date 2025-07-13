import type { FC } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from '../../slices/productsApiSlice';
import { getErrorMessage } from '../../utils/errorUtils';

import ProductListRow from '../../components/ProductListRow';
import { toast } from 'react-toastify';

const ProductListScreen: FC = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3' onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{getErrorMessage(error)}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <ProductListRow product={product} key={product._id} />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
