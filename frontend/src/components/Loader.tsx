import { type FC } from 'react';
import { Spinner } from 'react-bootstrap';

const Loader: FC = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    ></Spinner>
  );
};

export default Loader;
