import { useHistory, withRouter } from "react-router-dom";
import { logout } from "../../services/authService";

const Logout = (props) => {
  const history = useHistory();

  const logoutHandle = () => {
    logout();
    history.push("/");
  };

  return <>{logoutHandle()}</>;
};

export default withRouter(Logout);
