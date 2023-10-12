import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav class="navbar navbar-dark bg-dark justify-content-between">
        <Nav.Link href="/">Product Lists</Nav.Link>
        <Nav.Link href="/products/new">Add Product</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
