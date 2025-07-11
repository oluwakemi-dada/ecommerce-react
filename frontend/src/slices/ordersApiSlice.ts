import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';
import type { OrderDetails, OrderRequest, OrderResponse, PaymentResponse } from '../types';
import type { OrderResponseBody } from '@paypal/paypal-js';

type OrderId = string;

type PayPalClientId = {
  clientId: string;
};

type PayOrderRequest = {
  orderId: string;
  details: OrderResponseBody;
};

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
    payOrder: builder.mutation<PaymentResponse, PayOrderRequest>({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: {
          ...details,
        },
      }),
    }),
    getPayPalClientId: builder.query<PayPalClientId, void>({
      query: () => ({
        url: PAYPAL_URL,
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} = ordersApiSlice;
