import type { FC } from 'react';
import { Link } from 'react-router';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import type { OrderItem as OrderItemType } from '../types';
import { getFullImageUrl } from '../utils/imageUtils';

type OrderItemProps = {
  item: OrderItemType;
};

const OrderItem: FC<OrderItemProps> = ({ item }) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col md={1}>
          <Image src={getFullImageUrl(item.image)} alt={item.name} fluid rounded />
        </Col>
        <Col>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
        </Col>
        <Col md={4}>
          {item.qty} x ${item.price} = ${item.qty * item.price}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default OrderItem;
