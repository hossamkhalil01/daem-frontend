import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";
import Logout from "../auth/Logout";
import RegisterPage from "../../pages/RegisterPage";
import DoctorsPage from "../../pages/DoctorsPage";
import UsersPage from "../../pages/admin/UsersPage";
import AdminRoute from "./AdminRoute";
import Ticket from "../ticket/Ticket";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin/users">
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        </Route>
        <Route path="/doctors">
          <DoctorsPage />
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
          <Ticket />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
