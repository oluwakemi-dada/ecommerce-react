import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import type { AppDispatch } from '../types';
import type { Product } from '../types';

type AddToCartFormProps = {
  product: Product;
};

const AddToCartForm: FC<AddToCartFormProps> = ({ product }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    if (!product) return;

    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <Col md={3}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>
                <strong>${product.price}</strong>
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Status:</Col>
              <Col>
                <strong>
                  {(product?.countInStock ?? 0) > 0
                    ? 'In Stock'
                    : 'Out Of Stock'}
                </strong>
              </Col>
            </Row>
          </ListGroup.Item>

          {product.countInStock > 0 && (
            <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col>
                  <Form.Control
                    as='select'
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
          )}

          <ListGroup.Item>
            <Button
              className='btn-block'
              type='button'
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              Add To Cart
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default AddToCartForm;
