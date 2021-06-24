import axios from "axios";
import { BASE_URL } from "../api/urls";
import storage from "../utils/storage";


let axiosObj = null;
let token = storage.get('token') || '';

export const setHeaderToken = (newToken) => {
  token = newToken;
  if (axiosObj)
    axiosObj.defaults.headers['Authorization'] = token;
}

export const getClientObj = () => {

  if (!axiosObj) {
    axiosObj = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: token,
      },
    });
  }
  return axiosObj;
}