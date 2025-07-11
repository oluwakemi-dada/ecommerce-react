import { type FC, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  PayPalButtons,
  usePayPalScriptReducer,
  SCRIPT_LOADING_STATE,
} from '@paypal/react-paypal-js';
import type {
  // ReactPayPalScriptOptions,
  ScriptReducerAction,
} from '@paypal/react-paypal-js';
import type {
  OnApproveData,
  OnApproveActions,
  CreateOrderActions,
  CreateOrderData,
} from '@paypal/paypal-js';

import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from '../slices/ordersApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getErrorMessage } from '../utils/errorUtils';

import type { RootState } from '../types';

const OrderScreen: FC = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId!);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPay && paypal?.clientId) {
      const options = {
        'client-id': paypal?.clientId,
        currency: 'USD',
      };

      const resetOptionsAction: ScriptReducerAction = {
        type: 'resetOptions',
        value: options,
      };

      const setLoadingStatusAction: ScriptReducerAction = {
        type: 'setLoadingStatus',
        value: SCRIPT_LOADING_STATE.PENDING,
      };

      const loadPayPalScript = async () => {
        paypalDispatch(resetOptionsAction);
      };

      paypalDispatch(setLoadingStatusAction);

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal?.clientId, paypalDispatch, loadingPay, errorPayPal]);

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    return actions.order!.capture().then(async function (details) {
      try {
        await payOrder({ orderId: orderId!, details });
        refetch();
        toast.success('Paymemt successful');
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    });
  };

  // const onApproveTest = async () => {
  //   await payOrder({ orderId: orderId!, details: { payer: {} } });
  //   refetch();
  //   toast.success('Paymemt successful');
  // };

  const onError = (error: unknown) => {
    toast.error(getErrorMessage(error));
  };

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order!.totalPrice.toFixed(2),
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{getErrorMessage(error)}</Message>
  ) : (
    <>
      <h1>Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order?.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order?.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order?.shippingAddress.address},{' '}
                {order?.shippingAddress.city}{' '}
                {order?.shippingAddress.postalCode},{' '}
                {order?.shippingAddress.country}.
              </p>
              {order?.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order?.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>

              {order?.isPaid ? (
                <Message variant='success'>Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>

                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order?.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: '10px' }}
                      >
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {/* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
