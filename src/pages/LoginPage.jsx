import React from "react";
import Login from "../components/auth/Login";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

const LoginPage = (props) => {
  return (
    <>
      <Navbar />
      <div>
        <Login />
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
