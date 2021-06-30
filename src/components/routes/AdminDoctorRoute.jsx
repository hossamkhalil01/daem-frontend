import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ROLES from "../../api/roles";

function AdminDoctorRoute(props) {
  const { currentUser } = useCurrentUser();
  const { component: Component, ...rest } = props;

  console.log(currentUser.role);

  console.log(ROLES.admin, ROLES.doc);
  //redirect if is not admin or doctor
  if (currentUser?.role !== ROLES.admin && currentUser?.role !== ROLES.doc)
    return <Redirect to="/" />;

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default withRouter(AdminDoctorRoute);
