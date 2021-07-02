import { useHistory, withRouter } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../../services/authService";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Logout = (props) => {
  const history = useHistory();
  const { setCurrentUser } = useCurrentUser();

  useEffect(() => {
    const logoutHandle = () => {
      logout();
      setCurrentUser(null);
      history.push("/");
    };

    logoutHandle();
  });

  return <></>;
};

export default withRouter(Logout);
