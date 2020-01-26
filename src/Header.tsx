import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import "url-search-params-polyfill";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";

const Header: React.SFC<RouteComponentProps> = props => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <NavLink to="https://antonshilin.github.io/photos" className="mr-3 p-2 text-decoration-none  text-white">
        Photo & Video Stock
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto text-uppercase">
          <NavLink
            to="https://antonshilin.github.io/photos"
            className="mr-3 p-2 text-decoration-none  text-white"
          >
            Find photos
          </NavLink>
          <NavLink
            to="https://antonshilin.github.io/videos"
            className="mr-3 p-2 text-decoration-none  text-white"
          >
            Find videos
          </NavLink>
          <NavLink to="https://antonshilin.github.io/login" className="mr-3 p-2">
            <FaRegUserCircle style={{ fontSize: "1.5rem", color: "white" }} />
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Header);
