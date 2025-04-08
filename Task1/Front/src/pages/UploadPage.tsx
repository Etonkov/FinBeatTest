import React, { useState } from "react";
import { uploadItems } from "../api/apiClient";
import { Button, Form, Container, Alert, Row, Col } from "react-bootstrap";

const UploadPage: React.FC = () => {
  const [items, setItems] = useState<Record<string, string>[]>([]);
  const [jsonText, setJsonText] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<
    Record<number, { key?: string; value?: string }>
  >({});

  const validateItem = (index: number, key: string, value: string) => {
    const itemErrors: { key?: string; value?: string } = {};
    if (!key || isNaN(parseInt(key))) {
      itemErrors.key = "Key is required and must be an integer.";
    }
    if (!value) {
      itemErrors.value = "Value is required.";
    } else if (value.length > 200) {
      itemErrors.value = "Value must not exceed 200 characters.";
    }

    const allKeys = items.map((item) => Object.keys(item)[0]);
    const allValues = items.map((item) => Object.values(item)[0]);

    if (allKeys.filter((k, i) => i !== index && k === key).length > 0) {
      itemErrors.key = "Key must be unique.";
    }
    if (allValues.filter((v, i) => i !== index && v === value).length > 0) {
      itemErrors.value = "Value must be unique.";
    }

    return itemErrors;
  };

  const handleAddItem = () => {
    setItems([...items, {}]);
  };

  const handleChange = (index: number, key: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { [key]: value };
    setItems(newItems);

    const itemErrors = validateItem(index, key, value);
    setErrors((prevErrors) => ({ ...prevErrors, [index]: itemErrors }));

    setJsonText(JSON.stringify(newItems, null, 2));
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);

    setErrors((prevErrors) => {
      const { [index]: _, ...remainingErrors } = prevErrors;
      return remainingErrors;
    });

    setJsonText(JSON.stringify(newItems, null, 2));
  };

  const handleSubmit = async () => {
    try {
      const isValid = items.every((item, index) => {
        const key = Object.keys(item)[0];
        const value = Object.values(item)[0];
        const itemErrors = validateItem(index, key, value);
        setErrors((prevErrors) => ({ ...prevErrors, [index]: itemErrors }));
        return Object.keys(itemErrors).length === 0;
      });

      if (!isValid) {
        setMessage("Validation failed. Please check the fields.");
        return;
      }

      await uploadItems(items);
      setMessage("Data uploaded successfully!");
    } catch (error) {
      setMessage("Error uploading data.");
    }
  };

  const handleJsonUpload = () => {
    try {
      const parsedItems = JSON.parse(jsonText);
      if (Array.isArray(parsedItems)) {
        let isValid = true;
        const newErrors: Record<number, { key?: string; value?: string }> = {};

        parsedItems.forEach((item: Record<string, string>, index: number) => {
          const key = Object.keys(item)[0];
          const value = Object.values(item)[0];
          const itemErrors = validateItem(index, key, value);
          newErrors[index] = itemErrors;

          if (Object.keys(itemErrors).length > 0) {
            isValid = false;
          }
        });

        setErrors(newErrors);
        if (isValid) {
          setItems(parsedItems);
          setMessage("JSON loaded successfully!");
        } else {
          setMessage("Validation failed for loaded JSON.");
        }
      } else {
        setMessage("Invalid JSON format. Expected an array.");
      }
    } catch (error) {
      setMessage("Error parsing JSON.");
      console.log(error);
    }
  };

  const isFormValid = () => {
    return items.every((item, index) => {
      const key = Object.keys(item)[0];
      const value = Object.values(item)[0];
      const itemErrors = validateItem(index, key, value);
      return Object.keys(itemErrors).length === 0;
    });
  };

  return (
    <Container className="mt-4">
      <h2>Data Upload</h2>
      {message && (
        <Alert
          variant={message.includes("successfully") ? "success" : "danger"}
        >
          {message}
        </Alert>
      )}
      <div>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="mt-3"
        >
          Upload Data
        </Button>
      </div>
      <h4 className="mt-4">Parse JSON</h4>
      <Form.Group>
        <Form.Label>JSON Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder='Example: [{"key1": "value1"}, {"key2": "value2"}]'
          value={jsonText}
          onChange={(e) => {
            setJsonText(e.target.value);
          }}
        />
      </Form.Group>
      <div>
        <Button onClick={handleJsonUpload} className="mt-2 mb-3">
          Load JSON
        </Button>
      </div>
      <h4>Add Items Manually</h4>
      {items.map((item, index) => {
        const key = Object.keys(item)[0] || "";
        const value = Object.values(item)[0] || "";
        return (
          <Row key={index} className="mb-3 align-items-center">
            <Col>
              <Form.Group>
                <Form.Label>Key</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter key"
                  value={key}
                  isInvalid={!!errors[index]?.key}
                  onChange={(e) => handleChange(index, e.target.value, value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[index]?.key}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter value"
                  value={value}
                  isInvalid={!!errors[index]?.value}
                  onChange={(e) => handleChange(index, key, e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[index]?.value}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                Remove
              </Button>
            </Col>
          </Row>
        );
      })}
      <Button onClick={handleAddItem} className="me-2 mb-3">
        Add Item
      </Button>
    </Container>
  );
};

export default UploadPage;
