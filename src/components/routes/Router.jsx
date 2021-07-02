import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Footer from "../../components/layouts/Footer";
import Navbar from "../../components/layouts/Navbar";
import AboutUsPage from "../../pages/AboutUsPage";
import ApplicationViewPage from "../../pages/admin/ApplicationViewPage";
import { Dashboard } from "../../pages/admin/Dashboard";
import AllNotificationsPage from "../../pages/AllNotifications";
import ArticlePage from "../../pages/ArticlePage";
import ArticlesPage from "../../pages/ArticlesPage";
import AuthPage from "../../pages/AuthPage";
import BecomeDoctorPage from "../../pages/BecomeDoctorPage";
import DoctorPage from "../../pages/DoctorPage";
import DoctorsPage from "../../pages/DoctorsPage";
import LandingPage from "../../pages/LandingPage";
import NewArticlePage from "../../pages/NewArticlePage";
import NewTicketPage from "../../pages/NewTicketPage";
import NotFound from "../../pages/NotFound";
import ProfilePage from "../../pages/ProfilePage";
import ServerError from "../../pages/ServerErrorPage";
import TicketPage from "../../pages/TicketPage";
import TicketsPage from "../../pages/TicketsPage";
import UpdateArticlePage from "../../pages/UpdateArticlePage";
import UpdateTicketPage from "../../pages/UpdateTicketPage";
import Logout from "../auth/Logout";
import AdminDoctorRoute from "./AdminDoctorRoute";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import UserDoctorRoute from "./UserDoctorRoute";
const Router = () => {
  return (
    <BrowserRouter>
          <Navbar />
      <Switch>
        <Route exact path="/admin/dashboard">
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        </Route>
        <Route exact path="/admin/doctor-application/view">
          <AdminRoute>
            <ApplicationViewPage />
          </AdminRoute>
        </Route>
        <Route exact path="/become-doctor">
          <UserDoctorRoute>
            <BecomeDoctorPage />
          </UserDoctorRoute>
        </Route>

        <Route exact path="/tickets/new">
          <PrivateRoute>
            <NewTicketPage />
          </PrivateRoute>
        </Route>
        <Route exact path="/articles/new">
          <AdminDoctorRoute>
            <NewArticlePage />
          </AdminDoctorRoute>
        </Route>
        <Route exact path="/articles/:id/edit">
          <AdminDoctorRoute>
            <UpdateArticlePage />
          </AdminDoctorRoute>
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
          <PrivateRoute>
            <TicketPage />
          </PrivateRoute>
        </Route>
        <Route exact path="/notifications">
          <PrivateRoute>
            <AllNotificationsPage />
          </PrivateRoute>
        </Route>
        <Route exact path="/tickets/:id/edit">
          <UpdateTicketPage />
        </Route>
        <Route exact path="/tickets">
          <PrivateRoute>
            <TicketsPage />
          </PrivateRoute>
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
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        </Route>
        <Route exact path="/notFound">
          <NotFound />
        </Route>
        <Route exact path="/server-error">
          <ServerError />
        </Route>
        <Route path="*">
          <Redirect
            to={{
              pathname: "/notFound",
            }}
          />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
