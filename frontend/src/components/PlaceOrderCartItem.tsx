import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import type { CartItem } from '../types';
import { getFullImageUrl } from '../utils/imageUtils';

type PlaceOrderCartItemProps = {
  item: CartItem;
};

const PlaceOrderCartItem: FC<PlaceOrderCartItemProps> = ({ item }) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col md={1}>
          <Image
            src={getFullImageUrl(item.image)}
            alt={item.name}
            fluid
            rounded
          />
        </Col>
        <Col>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
        </Col>
        <Col md={4}>
          {item.qty} x {item.price} = ${item.qty * item.price}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default PlaceOrderCartItem;
