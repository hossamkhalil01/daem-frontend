import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import UsersPage from "../../pages/admin/UsersPage";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import TicketPage from "../../pages/TicketPage";
import Logout from "../auth/Logout";
import AdminRoute from "./AdminRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin/users">
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/home">
          <LandingPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/home"></Redirect>
        </Route>
        <Route exact path="/ticket/:id">
          <TicketPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
