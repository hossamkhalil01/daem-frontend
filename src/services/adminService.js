import requests from "../api/requests";
import { ADMIN_API } from "../api/urls";


export const getAllUsers = async () => {
  return await requests.get(ADMIN_API.getAllUsers);
};
