import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../api/urls";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import LanguageSelect from "../LanguageSelect";

const Navbar = (props) => {
  const { currentUser } = useCurrentUser();

  const { t } = useTranslation();
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
                  {t("home")}
                </NavLink>
              </li>
              {currentUser?._id ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/tickets"
                    exact
                  >
                    {t("tickets")}
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
                  {t("doctors")}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/about-us"
                  exact
                >
                  {t("about-us")}
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              {currentUser?._id ? (
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
                        src={`${BASE_URL}/${currentUser.avatar}`}
                      ></Avatar>{" "}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdown02">
                      <li className="nav-item">
                        <NavLink
                          className="dropdown-item nav-link"
                          to="/profile"
                          exact
                        >
                          {t("profile")}
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="dropdown-item nav-link"
                          to="/logout"
                          exact
                        >
                          {t("logout")}
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
                      {t("login")}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      to="/register"
                      exact
                    >
                      {t("register")}
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
