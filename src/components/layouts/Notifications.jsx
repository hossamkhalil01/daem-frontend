import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import socket from "../../socketConfig";

const Notifications = (props) => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (currentUser) socket.emit("authenticated", currentUser._id);
    socket.on("newNotification", (notification) => {
      const newNotifications = [notification,...notifications];
      setNotifications(newNotifications);
      setUnread(notifications.filter((n) => n.new).length);
      console.log(notifications);
    });
  }, []);
  return (
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
        {unread>0 ? <span class="unread-notification"></span> : " "}
      </a>
      <div
        class="dropdown-menu notification-ui_dd show"
        aria-labelledby="navbarDropdown"
      >
        <div class="notification-ui_dd-content">
          <div class="notification-list notification-list--unread">
            <div class="notification-list_detail">
              <p>
                <b>John Doe</b> reacted to your post
              </p>
              <p>
                <small>10 mins ago</small>
              </p>
            </div>
          </div>
          <div class="notification-list notification-list--unread">
            <div class="notification-list_detail">
              <p>
                <b>Richard Miles</b> reacted to your post
              </p>
              <p>
                <small>1 day ago</small>
              </p>
            </div>
          </div>
          <div class="notification-list">
            <div class="notification-list_detail">
              <p>
                <b>Brian Cumin</b> reacted to your post
              </p>
              <p>
                <small>1 day ago</small>
              </p>
            </div>
          </div>
          <div class="notification-list">
            <div class="notification-list_detail">
              <p>
                <b>Lance Bogrol</b> reacted to your post
              </p>
              <p>
                <small>1 day ago</small>
              </p>
            </div>
          </div>
        </div>
        <div class="notification-ui_dd-footer">
          <a href="#!" class="btn btn-success btn-block">
            View All
          </a>
        </div>
      </div>
    </li>
  );
};

export default Notifications;
