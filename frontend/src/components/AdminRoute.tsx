import type { FC } from 'react';
import { Outlet, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../types';

const AdminRoute: FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login' replace />;
};

export default AdminRoute;
