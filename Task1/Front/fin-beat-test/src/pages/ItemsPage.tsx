import React, { useState, useEffect } from 'react';
import { getItems } from '../api/apiClient';
import TableComponent from '../components/Table';
import FilterForm from '../components/FilterForm';
import Pagination from '../components/Pagination';
import { Container, Button, Row, Col } from 'react-bootstrap';

interface Item {
  id: number;
  code: number;
  value: string;
}

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const [codeFilter, setCodeFilter] = useState<number | undefined>();
  const [valueFilter, setValueFilter] = useState<string>('');

  // Function to fetch data based on filters and pagination
  const fetchItems = async () => {
    try {
      const response = await getItems(codeFilter, valueFilter, currentPage, pageSize);
      setItems(response.data.items);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Fetch data when component mounts or when parameters change
  useEffect(() => {
    fetchItems();
  }, [currentPage, pageSize, codeFilter, valueFilter]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to the first page when page size changes
  };

  return (
    <Container className="mt-4">
      <h2>Items List</h2>
      <FilterForm
        codeFilter={codeFilter}
        valueFilter={valueFilter}
        onCodeFilterChange={setCodeFilter}
        onValueFilterChange={setValueFilter}
      />
      <TableComponent items={items} />
      <Row className="mt-3 align-items-center">
        <Col>
          <p>
            Page {currentPage} of {totalPages} | Showing {pageSize} items per page
          </p>
        </Col>
        <Col className="text-end">
          <Button onClick={fetchItems} variant="primary" className="me-2">
            Refresh Data
          </Button>
          <label htmlFor="pageSize">Items per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="ms-2"
            style={{ padding: '5px' }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </Col>
      </Row>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </Container>
  );
};

export default ItemsPage;