import moment from "moment";
import storage from "../utils/storage";
import { setHeaderToken } from "./clientService";
import requests from "../api/requests";
import { AUTH_API } from "../api/urls";

const setAuthData = (data) => {
  // save auth data
  const expires = moment().add(data.expiresIn);

  storage.set("token", data.token);
  storage.set("expiresIn", expires.valueOf());
  storage.set("user", data.user);

  // register the token to the client
  setHeaderToken(data.token);
};

export const login = async ({ email, password }) => {
  // send request
  const {
    data: { data },
  } = await requests.create(AUTH_API.login, {
    email,
    password,
  });

  setAuthData(data);
  return data.user;
};

export const register = async (formData) => {
  // send request
  const {
    data: { data },
  } = await requests.create(AUTH_API.register, formData);

  setAuthData(data);
};

export const getCurrentUser = async () => {

  try {
    const { data: { data } } = await requests.get(AUTH_API.currrentUser);
    return data;

    // UnAuthenticated
  } catch (err) {
    logout();
    return null
  }
}

export const logout = () => {
  const keys = ["token", "expiresIn", "user"];

  for (let indx in keys) {
    storage.remove(keys[indx]);
  }

  // remove the token from the client
  setHeaderToken("");
};

const getToken = () => storage.get("token");

export const getUser = () => storage.get("user");
export const getExpiration = () => moment(storage.get("expires"));

export const isAuthenticated = () => getToken() ? true : false


export const setUser = (user) => storage.set("user", user);

export const checkTokenValid = () => {
  if (!moment().isBefore(getExpiration(), "second")) {
    logout();
  }
};
