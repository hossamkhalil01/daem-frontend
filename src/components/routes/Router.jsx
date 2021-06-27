import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import UsersPage from "../../pages/admin/UsersPage";
import DoctorPage from "../../pages/DoctorPage";
import DoctorsPage from "../../pages/DoctorsPage";
import LandingPage from "../../pages/LandingPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import TicketPage from "../../pages/TicketPage";
import Logout from "../auth/Logout";
import AdminRoute from "./AdminRoute";
import { AboutUsPage } from "../../pages/AboutUs";
import TicketsPage from "../../pages/TicketsPage";
const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin/users">
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        </Route>

        <Route path="/tickets/new">{/* TODO: NEW TICEKT */}</Route>
        <Route path="/doctors/:id">
          <DoctorPage />
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
          <TicketPage />
        </Route>
        <Route path="/tickets">
          <TicketsPage />
        </Route>
        <Route exact path="/about-us">
          <AboutUsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
