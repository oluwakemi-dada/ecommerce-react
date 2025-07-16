import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';
import type {
  AllOrdersResponse,
  OrderDetails,
  CreateOrderRequest,
  CreateOrderResponse,
  PageNumber,
  PayOrderResponse,
  PayOrderRequest,
  MyOrdersResponse,
} from '../types';

type OrderId = string;

type PayPalClientId = {
  clientId: string;
};

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
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
      providesTags: (__result, _error, id) => [{ type: 'Order', id }],
      keepUnusedDataFor: 5, // 5secs
    }),
    payOrder: builder.mutation<PayOrderResponse, PayOrderRequest>({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: {
          ...details,
        },
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: 'Order', id: orderId },
      ],
    }),
    getPayPalClientId: builder.query<PayPalClientId, void>({
      query: () => ({
        url: PAYPAL_URL,
        keepUnusedDataFor: 5,
      }),
    }),
    getMyOrders: builder.query<MyOrdersResponse, PageNumber>({
      query: ({ pageNumber }) => ({
        url: `${ORDERS_URL}/mine`,
        params: {
          pageNumber,
        },
      }),
      providesTags: ['MyOrders'],
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query<AllOrdersResponse, PageNumber>({
      query: ({ pageNumber }) => ({
        url: ORDERS_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ['Orders'],
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation<OrderDetails, OrderId>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
      invalidatesTags: (_result, _error, orderId) => [
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
