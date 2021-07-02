import requests from "../api/requests";
import { USER_API } from "../api/urls";

export const getUser = async (userId) => {
  return requests.get(USER_API.getUser(userId));
};

export const updateUser = async (updates) => {
  return requests.update(USER_API.updateUser(), updates);
};
