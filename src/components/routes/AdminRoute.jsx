import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ROLES from "../../api/roles";

function AdminRoute(props) {
  const { currentUser } = useCurrentUser();
  const { component: Component, ...rest } = props;

  //redirect if is not admin
  if (currentUser?.role !== ROLES.admin) return <Redirect to="/" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default withRouter(AdminRoute);
