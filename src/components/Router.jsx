import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
// Test page to test the pricate routes redirection
import PrivatePage from "../pages/PrivatePage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import Ticket from "./ticket/Ticket";

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
        <Route exact path="/">
          <Redirect to="/home"></Redirect>
        </Route>
        <Route exact path="/ticket/:id">
          <Ticket />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
