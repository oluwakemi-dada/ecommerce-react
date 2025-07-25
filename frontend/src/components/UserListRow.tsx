import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import type { User } from '../types';

type Props = {
  user: User;
  deleteHandler: (id: string) => void;
};

const UserListRow = ({ user, deleteHandler }: Props) => {
  return (
    <tr>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </td>
      <td>
        {user.isAdmin ? (
          <FaCheck
            style={{ color: 'green' }}
            aria-label='Admin user'
            role='img'
          />
        ) : (
          <FaTimes
            style={{ color: 'red' }}
            aria-label='Not an admin'
            role='img'
          />
        )}
      </td>

      <td>
        {user._id && (
          <Link to={`/admin/user/${user._id}/edit`}>
            <Button
              variant='light'
              aria-label={`Edit user: ${user.name}`}
              className='btn-sm'
            >
              <FaEdit />
            </Button>
          </Link>
        )}
        <Button
          variant='danger'
          className='btn-sm'
          onClick={() => deleteHandler(user._id)}
          aria-label={`Delete user: ${user.name}`}
        >
          <FaTrash style={{ color: 'white' }} />
        </Button>
      </td>
    </tr>
  );
};

export default UserListRow;
