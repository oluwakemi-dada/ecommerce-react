import type { FC } from 'react';
import { Link } from 'react-router';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { Product } from '../types';
import { Button } from 'react-bootstrap';

type ProductListRowProps = {
  product: Product;
  onDelete: (id: string) => void;
};

const ProductListRow: FC<ProductListRowProps> = ({
  product,
  onDelete,
}) => {
  return (
    <tr>
      <td>{product._id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td>{product.brand}</td>
      <td>
        <Link to={`/admin/product/${product._id}/edit`}>
          <Button variant='light' className='btn-sm mx-2'>
            <FaEdit />
          </Button>
        </Link>
        <Button
          variant='danger'
          className='btn-sm'
          onClick={() => onDelete(product._id)}
        >
          <FaTrash style={{ color: 'white' }} />
        </Button>
      </td>
    </tr>
  );
};

export default ProductListRow;
