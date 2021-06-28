import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// to be replaced with the auth user
function PrivateRoute(props) {
  const { currentUser } = useCurrentUser();
  const { component: Component, ...rest } = props;

  //redirect if there is no user
  if (currentUser) return <Redirect to="/" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default withRouter(PrivateRoute);
