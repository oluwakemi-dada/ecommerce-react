import type { FC } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type PagesProps = {
  pages: number;
  page: number;
  isAdmin?: boolean;
  basePath?: string;
  keyword?: string;
};

const Paginate: FC<PagesProps> = ({
  pages,
  page,
  basePath = '',
  keyword = '',
}) => {
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
