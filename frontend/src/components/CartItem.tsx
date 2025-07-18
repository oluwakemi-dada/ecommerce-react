import { Col, Image, ListGroup, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import type { CartItem as CartItemType, Product, AppDispatch } from '../types';
import { FaTrash } from 'react-icons/fa';
import { getFullImageUrl } from '../utils/imageUtils';

type Props = {
  item: CartItemType;
};

const CartItem = ({ item }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const addToCartHandler = async (product: Product, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image
            src={getFullImageUrl(item.image)}
            alt={item.name}
            fluid
            rounded
          />
        </Col>
        <Col md={3}>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
        </Col>
        <Col md={2}>${item.price}</Col>
        <Col md={2}>
          <Form.Control
            as='select'
            value={item.qty}
            onChange={(e) => {
              addToCartHandler(item, Number(e.target.value));
            }}
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={2}>
          <Button
            type='button'
            variant='light'
            onClick={() => removeFromCartHandler(item._id)}
          >
            <FaTrash />
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItem;
