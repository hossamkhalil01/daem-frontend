import React, { useEffect, useState } from "react"
import Loading from "../components/Loading";
import * as authServices from "../services/authService";

const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  const normalRender = () => {
    return (
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
      </CurrentUserContext.Provider>
    );
  }
  useEffect(() => {

    const fetchCurrentUser = () => {

      // current user not defined and user is authenticated
      if (!currentUser && authServices.isAuthenticated()) {
        authServices.getCurrentUser()
          .then(user => setCurrentUser(user))
          .catch(err => setCurrentUser(null));
      };
    }
    fetchCurrentUser();

  }, []);

  return <>{currentUser === false ? <Loading /> : normalRender()}</>;
}

export const useCurrentUser = () => React.useContext(CurrentUserContext);

