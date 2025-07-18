import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import type { OrderDetails } from '../types';

type Props = { order: OrderDetails };

const OrderListRow = ({ order }: Props) => {
  return (
    <tr>
      <td>{order._id}</td>
      <td>{order.user && order.user.name}</td>
      <td>{order.createdAt.substring(0, 10)}</td>
      <td>{order.totalPrice}</td>
      <td>
        {order.isPaid ? (
          order.paidAt?.substring(0, 10)
        ) : (
          <FaTimes style={{ color: 'red' }} />
        )}
      </td>
      <td>
        {order.isDelivered ? (
          order.deliveredAt?.substring(0, 10)
        ) : (
          <FaTimes style={{ color: 'red' }} />
        )}
      </td>
      <td>
        {order._id && (
          <Link to={`/order/${order._id}`}>
            <Button variant='light' className='btn-sm'>
              Details
            </Button>
          </Link>
        )}
      </td>
    </tr>
  );
};

export default OrderListRow;
