import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navbar navbar-expand-md bg-green navbar-dark">
      <button
        className="navbar-toggler"
        id="border"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav header">
          <li className="nav-item">
            <NavLink exact to="/Login" className="nav_link">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to="/" className="nav_link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to="/Create" className="nav_link">
              Create
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to="/Update" className="nav_link">
              Update
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to="/Delete" className="nav_link">
              Delete
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
