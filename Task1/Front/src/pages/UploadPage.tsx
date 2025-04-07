import React, { useState } from "react";
import { uploadItems } from "../api/apiClient";
import { Button, Form, Container, Alert } from "react-bootstrap";

const UploadPage: React.FC = () => {
  const [items, setItems] = useState<Record<string, string>[]>([]);
  const [jsonText, setJsonText] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleAddItem = () => {
    setItems([...items, {}]);
  };

  const handleChange = (index: number, key: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setItems(newItems);
    setJsonText(JSON.stringify(newItems, null, 2));
  };

  const handleSubmit = async () => {
    try {
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
        setItems(parsedItems);
        setMessage("JSON loaded successfully!");
      } else {
        setMessage("Invalid JSON format. Expected an array.");
      }
    } catch (error) {
      setMessage("Error parsing JSON.");
      console.log(error);
    }
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
        <Button onClick={handleSubmit} className="mt-3">
          Upload Data
        </Button>
      </div>
      <h4 className="mt-4">Load JSON</h4>
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
      {items.map((item, index) => (
        <div key={index} className="mb-3">
          <Form.Group>
            <Form.Label>Key</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter key"
              value={Object.keys(item)[0] || ""}
              onChange={(e) =>
                handleChange(index, e.target.value, item[e.target.value])
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Value</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter value"
              value={Object.values(item)[0] || ""}
              onChange={(e) =>
                handleChange(index, Object.keys(item)[0], e.target.value)
              }
            />
          </Form.Group>
        </div>
      ))}
      <Button onClick={handleAddItem} className="me-2 mb-3">
        Add Item
      </Button>
    </Container>
  );
};

export default UploadPage;
