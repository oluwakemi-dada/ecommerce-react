import { Alert } from 'react-bootstrap';

type Props = {
  variant?: 'success' | 'danger' | 'warning' | 'info';
  children: React.ReactNode;
};

const Message = ({ variant = 'info', children }: Props) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
