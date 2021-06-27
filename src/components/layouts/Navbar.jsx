import React from "react";
import Avatar from "@material-ui/core/Avatar";
import LanguageSelect from "../LanguageSelect";
import { NavLink } from "react-router-dom";
import { getUser } from "../../services/authService";
import { BASE_URL } from "../../api/urls";

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
              {getUser()?._id ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/tickets"
                    exact
                  >
                    Tickets
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/doctors"
                  exact
                >
                  Doctors
                </NavLink>
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
                <>
                  <li className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link"
                      id="dropdown04"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <Avatar
                        alt="avatar"
                        src={`${BASE_URL}/${getUser().avatar}`}
                      ></Avatar>{" "}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdown02">
                      <li className="nav-item">
                        <NavLink
                          className="dropdown-item nav-link"
                          to="/profile"
                          exact
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="dropdown-item nav-link"
                          to="/logout"
                          exact
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
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
              <LanguageSelect />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
