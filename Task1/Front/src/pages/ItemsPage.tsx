import React, { useState, useEffect } from "react";
import { getItems } from "../api/apiClient";
import TableComponent from "../components/Table";
import FilterForm from "../components/FilterForm";
import Pagination from "../components/Pagination";
import { Container, Button, Row, Col, Alert, Spinner } from "react-bootstrap";

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
  const [valueFilter, setValueFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch data based on filters and pagination
  const fetchItems = async () => {
    try {
      setError(null);
      const response = await getItems(
        codeFilter,
        valueFilter,
        currentPage,
        pageSize
      );
      setItems(response.data.items);
      setTotalPages(response.data.totalPages || 1);
    } catch (err: any) {
      console.error("Ошибка при загрузке данных:", err);
      if (err.response) {
        setError(
          `Server error: ${err.response.status} - ${err.response.statusText}`
        );
      } else if (err.request) {
        setError("The server is not responding");
      } else {
        setError("An error occurred while loading data.");
      }
    } finally {
      setLoading(false);
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
      {error && <Alert variant="danger">{error}</Alert>}

      <FilterForm
        codeFilter={codeFilter}
        valueFilter={valueFilter}
        onCodeFilterChange={setCodeFilter}
        onValueFilterChange={setValueFilter}
      />
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <TableComponent items={items} />
          <Row className="mt-3 align-items-center">
            <Col>
              <p>
                Page {currentPage} of {totalPages} | Showing {pageSize} items
                per page
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
                style={{ padding: "5px" }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </Col>
          </Row>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};

export default ItemsPage;
