import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../components/Loading";
import LoadMore from "../components/LoadMore";
import NotificationCard from "../components/NotificationCard";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { getNotifications } from "../services/notificationsService";

export default function AllNotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const isLastPage = () => pagination.page === pagination.totalPages;

  const onLoadMore = (newPage) => {
    getAllNotifications(newPage);
  };

  const getAllNotifications = async (newPage) => {
    const params = { page: newPage, limit: 3, recipient: currentUser._id };
    const _notifications = await getNotifications(params);
    setPagination({
      page: _notifications.data.data.page,
      totalPages: _notifications.data.data.totalPages,
    });
    const newNotifications = [
      ...notifications,
      ..._notifications.data.data.docs,
    ];
    setNotifications(newNotifications);
    setLoading(false);
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  return (
    <div className="all-notifications-page">
      {loading ? (
        <Loading />
      ) : (
        <div className="card all-notifications">
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
          {!isLastPage() ? (
            <LoadMore page={pagination.page} onLoadMore={onLoadMore} />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
