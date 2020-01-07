import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import "url-search-params-polyfill";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";

const Header: React.SFC<RouteComponentProps> = props => {

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand href="/login" className="mr-3 p-2">
        Photo & Video Stock
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavLink to="/photos" className="mr-3 p-2">
            Find photos
          </NavLink>
          <NavLink to="/videos" className="mr-3 p-2">
            Find videos
          </NavLink>
          <NavLink to="/admin" className="mr-3 p-2">
            <FaRegUserCircle style={{ fontSize: "2rem", color: "white" }}/>
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Header);
