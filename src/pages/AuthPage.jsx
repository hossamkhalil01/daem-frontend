import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/auth/Login";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Register from "../components/auth/Register";
import PageHeaders from "../components/PageHeaders";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useTranslation } from "react-i18next";
import "../styles/Auth.css";

const AuthPage = ({ isLogin }) => {
  const { currentUser } = useCurrentUser();
  const history = useHistory();
  const { t } = useTranslation();
  useEffect(() => {
    // check if already logged in
    if (currentUser)
      // redirect to home
      history.push("/");
  }, []);

  return (
    <>
      <PageHeaders pageTitle={isLogin ? t("login") : t("register")} />
      <Navbar />
      <div className="container-fluid w-75 mb-1 mt-5">
        <div className="row no-gutter ">
          <img
            className="d-none d-md-flex col-md-4 col-lg-5 bg-image"
            src="/assets/images/auth/auth-cover.jpg"
            alt="login-img"
          />
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container ">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto border p-3">
                    {isLogin ? <Login /> : <Register />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;
