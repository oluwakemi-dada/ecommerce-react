import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';
import type { User, UserLogin, UserLogout } from '../types';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, UserLogin>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<UserLogout, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;
