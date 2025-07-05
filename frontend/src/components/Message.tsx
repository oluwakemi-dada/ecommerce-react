import { type FC } from 'react';
import { Alert } from 'react-bootstrap';

type  MessageProps = {
  variant?: 'success' | 'danger' | 'warning' | 'info';
  children: React.ReactNode;
}

const Message: FC<MessageProps> = ({ variant = 'info', children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
