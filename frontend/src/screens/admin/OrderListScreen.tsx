import type { FC } from 'react';
import { Table } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { getErrorMessage } from '../../utils/errorUtils';
import OrderListRow from '../../components/OrderListRow';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';

const OrderListScreen: FC = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetOrdersQuery({
    pageNumber: pageNumber ?? '1',
  });

  return (
    <>
      <h1>Orders</h1>
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
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.map((order) => (
                <OrderListRow order={order} key={order._id} />
              ))}
            </tbody>
          </Table>

          <Paginate
            pages={Number(data?.pages ?? 1)}
            page={Number(data?.page ?? 1)}
            isAdmin={true}
            basePath='admin/orderlist'
          />
        </>
      )}
    </>
  );
};

export default OrderListScreen;
