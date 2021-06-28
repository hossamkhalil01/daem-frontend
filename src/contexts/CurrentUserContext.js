import React, { useEffect, useState } from "react"
import * as authServices from "../services/authService";

const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

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


  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}


export const useCurrentUser = () => React.useContext(CurrentUserContext);

