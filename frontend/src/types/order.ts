import type { ShippingAddress } from './cart';
import type { User } from './user';

export type OrderItem = {
  name: string;
  qty: number;
  image: string;
  price: number;
};

export type OrderRequest = {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

// Db - database
export type DbOrderItem = OrderItem & {
  product: string;
  _id: undefined;
};

export type OrderResponse = {
  _id: string;
  user: string;
  orderItems: DbOrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  deliveredAt: string;
  paidAt: string;
};

// Order details
export type PaymentResult = {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
};

export type OrderDetails = Omit<OrderResponse, 'user'> & {
  user: {
    _id: string;
    name: string;
    email: string;
  };
};

// Payment response from paypal
export type PaymentResponse = Omit<OrderResponse, 'deliveredAt'> &
  PaymentResult;
