import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';
import type { OrderDetails, OrderRequest, OrderResponse } from '../types';

type OrderId = string;

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, OrderRequest>({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query<OrderDetails, OrderId>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5, // 5secs
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  ordersApiSlice;
