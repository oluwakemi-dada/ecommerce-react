import type { FC } from 'react';
import { Table } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { getErrorMessage } from '../../utils/errorUtils';
import OrderListRow from '../../components/OrderListRow';

const OrderListScreen: FC = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{getErrorMessage(error)}</Message>
      ) : (
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
            {orders?.map((order) => (
              <OrderListRow order={order} key={order._id} />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
