import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import UploadPage from "./pages/UploadPage";
import ItemsPage from "./pages/ItemsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand style={{ fontSize: "2rem", fontWeight: "bold" }}>
            FinBeatTest
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/upload">
                Upload
              </Nav.Link>
              <Nav.Link as={Link} to="/view">
                View data
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/view" element={<ItemsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
