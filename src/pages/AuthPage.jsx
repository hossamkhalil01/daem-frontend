import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/auth/Login";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { getUser } from "../services/authService";
import Register from "../components/auth/Register";
import "../styles/Auth.css";

const AuthPage = ({ isLogin }) => {
  const history = useHistory();

  useEffect(() => {
    // check if already logged in
    if (getUser())
      // redirect to home
      history.push("/");
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid w-75 mb-2 mt-5">
        <div className="row no-gutter">
          <img
            className="d-none d-md-flex col-md-4 col-lg-6 bg-image"
            src="/assets/images/auth/auth-cover.jpg"
            alt="login-img"
          />
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container ">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
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