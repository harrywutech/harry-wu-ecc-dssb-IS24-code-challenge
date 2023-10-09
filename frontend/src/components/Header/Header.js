import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="mr-auto">
          <Nav.Link href="/">Product Lists</Nav.Link>
          <Nav.Link href="/products/new">Add Product</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
