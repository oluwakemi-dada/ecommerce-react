import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {
  pages: number;
  page: number;
  isAdmin?: boolean;
  basePath?: string;
  keyword?: string;
};

const Paginate = ({ pages, page, basePath = '', keyword = '' }: Props) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          const pageNum = x + 1;

          const link = basePath
            ? `/${basePath}/page/${pageNum}`
            : keyword
              ? `/search/${keyword}/page/${pageNum}`
              : `/page/${pageNum}`;

          return (
            <Pagination.Item
              key={pageNum}
              as={Link}
              to={link}
              active={pageNum === page}
            >
              {pageNum}
            </Pagination.Item>
          );
        })}
      </Pagination>
    )
  );
};

export default Paginate;
