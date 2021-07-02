import requests from "../api/requests";
import { NOTIFICATIONS_API } from "../api/urls";

export const setReadNotifications = async (notificationIds) => {
  return requests.update(NOTIFICATIONS_API.setReadNotifications(), notificationIds);
};

export const getNotifications = async (params) => {
  return requests.get(NOTIFICATIONS_API.getNotifications(), params);
};