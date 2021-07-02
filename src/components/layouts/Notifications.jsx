import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  getNotifications,
  setReadNotifications
} from "../../services/notificationsService";
import socket from "../../socketConfig";
import NotificationCard from "../NotificationCard";

const Notifications = (props) => {
  const { currentUser } = useCurrentUser();
  const [unread, setUnread] = useState(0);
  const { t } = useTranslation();

  const initialState = [];
  function reducer(state, action) {
    if (action.type === "NEW") {
      state = [action.notification, ...state];
      state = state.filter((n, index) => state.indexOf(n) === index);
      setUnread(unread + 1);
      return state;
    } else if (action.type === "GET_NOTIFICATIONS") {
      state = action.notifications;
      setUnread(action.notifications.filter((n) => !n.read).length);
    }
    return state;
  }

  const [notifications, dispatch] = useReducer(reducer, initialState);

  const getUserNotifications = async (userId) => {
    const _notifications = await getNotifications({
      recipient: userId,
      read: false,
    });
    dispatch({
      type: "GET_NOTIFICATIONS",
      notifications: _notifications.data.data.docs,
    });
  };

  const readNotifications = async () => {
    const unreadNotifications = notifications.filter((n) => !n.read);
    const notificationIds = unreadNotifications.map((n) => n._id);
    await setReadNotifications(notificationIds);
    setUnread(0);
  };
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
        <p
          class="nav-link dropdown-toggle notification-ui_icon"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={readNotifications}
        >
          <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>{" "}
          {unread > 0 ? <span class="unread-notification"></span> : " "}
        </p>
        <div
          class="dropdown-menu notification-ui_dd show"
          aria-labelledby="navbarDropdown"
        >
          {notifications.length ? (
            <>
              <div class="notification-ui_dd-content">
                {notifications.map((notification) => (
                  <div class="notification-list notification-list--unread">
                    <NotificationCard notification={notification} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            t("no-unread-notifications")
          )}

          <div class="notification-ui_dd-footer">
              <Link to="/notifications" className="btn btn-info m-auto">
                {t("view-all-notifications")}
              </Link>
          </div>
        </div>
      </li>
    </>
  );
};

export default Notifications;
