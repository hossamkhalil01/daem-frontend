import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { getUser } from "../../services/authService";

// to be replaced with the auth user
function PrivateRoute(props) {
  const { component: Component, ...rest } = props;

  //redirect if there is no user
  if (getUser()) return <Redirect to="/" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default withRouter(PrivateRoute);
