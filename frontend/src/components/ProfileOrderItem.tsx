import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import type { MyOrder } from '../types';

type Props = {
  order: MyOrder;
};

const ProfileOrderItem = ({ order }: Props) => {
  return (
    <tr>
      <td>{order._id}</td>
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
        <Link to={`/order/${order._id}`}>
          <Button className='btn-sm' variant='light'>
            Details
          </Button>
        </Link>
      </td>
    </tr>
  );
};

export default ProfileOrderItem;
