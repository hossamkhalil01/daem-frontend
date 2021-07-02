import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { getNotifications } from "../../services/notificationsService";
import socket from "../../socketConfig";
import NotificationCard from "../NotificationCard";
const Notifications = (props) => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();
  const [unread, setUnread] = useState(0);

  const [{ notifications }, dispatch] = useReducer(
    (state, action) => {
      if (action.type === "NEW") {
        state.notifications = [action.notification, ...state.notifications];
        state.notifications = state.notifications.filter(
          (n, index) => state.notifications.indexOf(n) === index
        );
        setUnread(state.notifications.filter((n) => n.new).length);
        return state;
      }
      else if (action.type === "GET_NOTIFICATIONS"){
        state.notifications = action.notifications;
      }
      return state;
    },
    { notifications: [] }
  );

  const getUserNotifications = async (userId)=>{
      const _notifications = await getNotifications({recipient : userId});
      dispatch({ type: "GET_NOTIFICATIONS", notifications: _notifications.data.data.docs });
      console.log(notifications);
  }
  useEffect(() => {
    if (currentUser) {
        getUserNotifications(currentUser._id);
        socket.emit("authenticated", currentUser._id);
    }
    socket.on("newNotification", (notification) => {
      dispatch({ type: "NEW", notification });
    });
  }, []);

  return (
    <>
      <li class="nav-item dropdown notification-ui show">
        <a
          class="nav-link dropdown-toggle notification-ui_icon"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>{" "}
          {unread > 0 ? <span class="unread-notification"></span> : " "}
        </a>
        <div
          class="dropdown-menu notification-ui_dd show"
          aria-labelledby="navbarDropdown"
        >
          <div class="notification-ui_dd-content">
            {notifications.map((notification) => (
              <div class="notification-list notification-list--unread">
               <NotificationCard notification={notification}/>
              </div>
            ))}
          </div>

          <div class="notification-ui_dd-footer">
            <a href="#!" class="btn btn-success btn-block">
              View All
            </a>
          </div>
        </div>
      </li>
    </>
  );
};

export default Notifications;
