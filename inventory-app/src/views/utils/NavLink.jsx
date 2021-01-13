import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Nav } from "react-bootstrap";

function NavLink(props) {
  var isActive = window.location.pathname === props.to;
  var className = isActive ? "nav-link active" : "nav-link";
  console.log("props", props);
  return <Nav.Link as={Link} className={className} {...props}></Nav.Link>;
}

NavLink.contextTypes = {
  router: PropTypes.object,
};

export default NavLink;
