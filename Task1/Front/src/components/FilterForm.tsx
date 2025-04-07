import React from "react";
import { Form, Row, Col } from "react-bootstrap";

interface Props {
  codeFilter: number | undefined;
  valueFilter: string;
  onCodeFilterChange: (value: number | undefined) => void;
  onValueFilterChange: (value: string) => void;
}

const FilterForm: React.FC<Props> = ({
  codeFilter,
  valueFilter,
  onCodeFilterChange,
  onValueFilterChange,
}) => {
  return (
    <Form>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Filter by Code</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Code"
              value={codeFilter || ""}
              onChange={(e) =>
                onCodeFilterChange(
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Filter by Value</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Value"
              value={valueFilter}
              onChange={(e) => onValueFilterChange(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterForm;
