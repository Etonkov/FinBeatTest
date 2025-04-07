import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <BootstrapPagination>
      {pages.map((page) => (
        <BootstrapPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </BootstrapPagination.Item>
      ))}
    </BootstrapPagination>
  );
};

export default Pagination;