import React from "react";
import Register from "../components/auth/Register";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
const RegisterPage = (props) => {
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
                    <Register />
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

export default RegisterPage;
