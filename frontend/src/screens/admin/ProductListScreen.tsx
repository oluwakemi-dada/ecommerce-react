import type { FC } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import { getErrorMessage } from '../../utils/errorUtils';

import ProductListRow from '../../components/ProductListRow';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';

const ProductListScreen: FC = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber: pageNumber ?? '1',
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted');
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        toast.success('Product created');
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
      {loadingDelete && <Loader />}
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
              {data?.products?.map((product) => (
                <ProductListRow
                  product={product}
                  key={product._id}
                  onDelete={deleteHandler}
                />
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={data?.pages ?? 1}
            page={data?.page ?? 1}
            isAdmin={true}
            basePath='admin/productlist'
          />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
