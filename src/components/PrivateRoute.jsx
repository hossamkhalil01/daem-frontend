import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { getUser } from "../services/authService";

// to be replaced with the auth user
function PrivateRoute(props) {
  const { component: Component, ...rest } = props;

  if (getUser()) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } //redirect if there is no user
  return <Redirect to="/" />;
}

export default withRouter(PrivateRoute);
