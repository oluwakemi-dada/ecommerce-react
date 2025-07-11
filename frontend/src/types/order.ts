import type { ShippingAddress } from './cart';

export type OrderItem = {
  name: string;
  qty: number;
  image: string;
  price: number;
};

export type OrderRequest = {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'PayPal';
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

export type PaymentResult = {
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
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
  paymentMethod: 'PayPal';
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
  paidAt?: string;
};

export type OrderDetails = Omit<OrderResponse, 'user'> & {
  user: {
    _id: string;
    name: string;
    email: string;
  };
};

export type AllOrdersResponse = Omit<OrderResponse, 'user'> &
  PaymentResult & {
    user: {
      _id: string;
      name: string;
    };
  };

// Payment response from paypal
export type PaymentResponse = Omit<OrderResponse, 'deliveredAt'> &
  PaymentResult;
