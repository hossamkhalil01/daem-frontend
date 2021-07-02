import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

const NotificationCard = ({ notification }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const handleTicketRedirection = () =>
    history.push(`/tickets/${notification.ticket}`);
  if (notification.action === "comment")
    return (
      <>
        <div class="notification-list_detail notification-comment">
          <p onClick={handleTicketRedirection} class="notification-body">
            <b>{notification.actor}</b> {t("commented-on-ticket")}
          </p>
          <p>
            <small>
              {moment(notification.createdAt, "YYYY-MM-DDTh:mm:ss").fromNow()}
            </small>
          </p>
        </div>
      </>
    );
  else
    return (
      <>
        <div class="notification-list_detail">
          {t("your-app-was")} {t(notification.appStatus)}
          <p>
            <small>
              {moment(notification.createdAt, "YYYY-MM-DDTh:mm:ss").fromNow()}
            </small>
          </p>
        </div>
      </>
    );
};

export default NotificationCard;
