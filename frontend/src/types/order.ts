import type { OrderResponseBody } from '@paypal/paypal-js';
import type { CartItem, ShippingAddress } from './cart';

export type OrderItem = {
  _id: string;
  image: string;
  name: string;
  price: number;
  product: string;
  qty: number;
};

export type PaymentResult = {
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
};

export type CreateOrderRequest = {
  orderItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'PayPal';
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

export type CreateOrderResponse = Omit<CreateOrderRequest, 'orderItems'> & {
  _id: string;
  orderItems: OrderItem[];
  isDelivered: boolean;
  createdAt: string;
  isPaid: boolean;
  updatedAt: string;
  user: string;
};

export type OrderDetails = Omit<CreateOrderResponse, 'user'> & {
  deliveredAt?: string;
  paidAt?: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
};

export type PayOrderRequest = {
  orderId: string;
  details: OrderResponseBody;
};

export type PayOrderResponse = CreateOrderResponse & {
  paidAt: string;
  paymentResult: PaymentResult;
};

export type MyOrder = Omit<OrderDetails, 'user'> & {
  user: string;
};

export type MyOrdersResponse = {
  page: string;
  pages: string;
  orders: MyOrder[];
};

export type AllOrdersResponse = {
  page: string;
  pages: string;
  orders: OrderDetails[];
};
