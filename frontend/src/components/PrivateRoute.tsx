import type { FC } from 'react';
import { Outlet, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../types';

const PrivateRoute: FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
