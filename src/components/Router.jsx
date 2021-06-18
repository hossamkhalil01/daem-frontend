import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

// Test page to test the pricate routes redirection
import PrivatePage from "../pages/PrivatePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/testPrivate">
          <PrivateRoute>
            <PrivatePage />
          </PrivateRoute>
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/home">
          <LandingPage />
        </Route>
        <Route path="/">
          <Redirect to="/home"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
