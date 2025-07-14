import type { FC } from 'react';
import { Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/userApiSlice';
import { getErrorMessage } from '../../utils/errorUtils';
import UserListRow from '../../components/UserListRow';

const UserListScreen: FC = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        toast.success('User deleted');
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <UserListRow
                user={user}
                key={user._id}
                deleteHandler={deleteHandler}
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
