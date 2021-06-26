import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/auth/Login";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { getUser } from "../services/authService";

const LoginPage = (props) => {
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
      <div>
        <Login />
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
