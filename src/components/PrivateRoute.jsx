import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

// to be replaced with the auth user
const user = false;


function PrivateRoute(props) {
  const { component: Component, ...rest } = props;

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } //redirect if there is no user
  return <Redirect to="/" />;
}

export default withRouter(PrivateRoute);