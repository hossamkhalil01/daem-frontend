import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AboutUsPage from "../../pages/AboutUsPage";
import UsersPage from "../../pages/admin/UsersPage";
import ArticlePage from "../../pages/ArticlePage";
import ArticlesPage from "../../pages/ArticlesPage";
import AuthPage from "../../pages/AuthPage";
import DoctorPage from "../../pages/DoctorPage";
import DoctorsPage from "../../pages/DoctorsPage";
import LandingPage from "../../pages/LandingPage";
import ProfilePage from "../../pages/ProfilePage";
import TicketPage from "../../pages/TicketPage";
import Logout from "../auth/Logout";
import AdminRoute from "./AdminRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin/users">
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        </Route>
        <Route exact path="/tickets/new">
          {/* TODO: NEW TICEKT */}
        </Route>
        <Route exact path="/doctors/:id">
          <DoctorPage />
        </Route>
        <Route exact path="/doctors">
          <DoctorsPage />
        </Route>
        <Route exact path="/register">
          <AuthPage isLogin={false} />
        </Route>
        <Route exact path="/login">
          <AuthPage isLogin={true} />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/home">
          <LandingPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/tickets/:id">
          <TicketPage />
        </Route>
        <Route exact path="/articles">
          <ArticlesPage />
        </Route>
        <Route exact path="/about-us">
          <AboutUsPage />
        </Route>
        <Route exact path="/articles/:id">
          <ArticlePage />
        </Route>
        <Route exact path="/profile">
          <ProfilePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
