import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { getUser } from "../../services/authService";
import ROLES from "../../api/roles";

function AdminRoute(props) {
  const { component: Component, ...rest } = props;

  //redirect if is not admin
  if (getUser().role !== ROLES.admin) return <Redirect to="/" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default withRouter(AdminRoute);
