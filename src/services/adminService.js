import requests from "../api/requests";
import { ADMIN_API } from "../api/urls";


export const getAllUsers = async (params) => {
  return await requests.get(ADMIN_API.getAllUsers,params);
};

export const updateUserRole = async (userId, newRole) => {
  return await requests.update(ADMIN_API.updateUser(userId), { role: newRole })
}