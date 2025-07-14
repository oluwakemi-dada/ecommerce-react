import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';
import type {
  AllOrdersResponse,
  OrderDetails,
  OrderRequest,
  OrderResponse,
  PaymentResponse,
} from '../types';
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
      invalidatesTags: ['Orders', 'MyOrders'],
    }),
    getOrderDetails: builder.query<OrderDetails, OrderId>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Order', id }],
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
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Order', id: orderId },
      ],
    }),
    getPayPalClientId: builder.query<PayPalClientId, void>({
      query: () => ({
        url: PAYPAL_URL,
        keepUnusedDataFor: 5,
      }),
    }),
    getMyOrders: builder.query<OrderResponse[], void>({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      providesTags: ['MyOrders'],
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query<AllOrdersResponse[], void>({
      query: () => ({
        url: ORDERS_URL,
      }),
      providesTags: ['Orders'],
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation<OrderResponse, OrderId>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, orderId) => [
        { type: 'Order', id: orderId },
      ],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
