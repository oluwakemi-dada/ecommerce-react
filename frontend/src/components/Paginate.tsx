import type { FC } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router';

type PagesProps = {
  pages: number;
  page: number;
  isAdmin?: boolean;
};

const Paginate: FC<PagesProps> = ({ pages, page, isAdmin = false }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            as={Link}
            to={!isAdmin ? `/page/${x + 1}` : `/admin/productlist/page/${x + 1}`}
            active={x + 1 === page}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
