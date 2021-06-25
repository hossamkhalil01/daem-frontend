import React from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../../services/authService";

const Navbar = (props) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navigation" id="navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/" exact>
            <img
              src="/assets/images/logo-text.png"
              alt="Daem"
              width="200"
              height="200"
              className="img-fluid"
            />
          </NavLink>

          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarmain"
            aria-controls="navbarmain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icofont-navigation-menu"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarmain">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/home"
                  exact
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/test"
                  exact
                >
                  Services
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/test"
                  exact
                  id="dropdown02"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Department <i className="icofont-thin-down"></i>
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="dropdown02">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      activeClassName="active"
                      to="/test"
                      exact
                    >
                      Departments
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      activeClassName="active"
                      to="/test"
                      exact
                    >
                      Department Single
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/test"
                  exact
                  id="dropdown03"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Doctors <i className="icofont-thin-down"></i>
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="dropdown03">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      activeClassName="active"
                      to="/test"
                      exact
                    >
                      Doctors
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      activeClassName="active"
                      to="/test"
                      exact
                    >
                      Doctor Single
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      activeClassName="active"
                      to="/test"
                      exact
                    >
                      Appoinment
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/about-us"
                  exact
                >
                  About Us
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              {getUser()?._id ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout" exact>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/login"
                      exact
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/register"
                      exact
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
