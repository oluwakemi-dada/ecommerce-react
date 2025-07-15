import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';
import type {
  AllUsersResponse,
  PageNumber,
  UpdateProfileRequest,
  User,
  UserLogin,
  UserLogout,
  UserRegister,
  UsersListItem,
} from '../types';

type UserId = string;

type DeleteUser = {
  message: string;
};


export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, UserLogin>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation<User, UserRegister>({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    logout: builder.mutation<UserLogout, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation<User, UpdateProfileRequest>({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: builder.query<AllUsersResponse, PageNumber>({
      query: ({ pageNumber }) => ({
        url: USERS_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation<DeleteUser, UserId>({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    getUserDetails: builder.query<UsersListItem, UserId>({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation<UsersListItem, User>({
      query: (data) => ({
        url: `${USERS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, user) => [
        'Users',
        { type: 'User', id: user._id },
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;
