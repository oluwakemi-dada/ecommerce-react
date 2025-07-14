import type { FC } from 'react';
import { Table, Button } from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetUsersQuery } from '../../slices/userApiSlice';
import { getErrorMessage } from '../../utils/errorUtils';
import UserListRow from '../../components/UserListRow';

const UserListScreen: FC = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      console.log('Delete user');
    }
  };

  return (
    <>
      <h1>Users</h1>
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
