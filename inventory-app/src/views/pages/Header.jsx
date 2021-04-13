import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="mb-3"
    >
      <Navbar.Brand as={Link} to="/">
        Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/transactions">
            Transactions
          </Nav.Link>
          <Nav.Link as={Link} to="/storage">
            Storage
          </Nav.Link>
          <Nav.Link as={Link} to="/buttons">
            Buttons
          </Nav.Link>
          <NavDropdown title="Actions" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/newButton">
              New Button Type
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/newCustomer">
              New Customer
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
