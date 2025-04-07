import React from 'react';
import { Table } from 'react-bootstrap';

interface Item {
  id: number;
  code: number;
  value: string;
}

interface Props {
  items: Item[];
}

const TableComponent: React.FC<Props> = ({ items }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Code</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.code}</td>
              <td>{item.value}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No data available</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TableComponent;