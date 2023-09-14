import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { FC } from 'react';
import { IPaginationProps } from './Pagination.props';

const Pagination: FC<IPaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      forcePage={currentPage - 1}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
