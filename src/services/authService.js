import moment from "moment";
import storage from "../utils/storage";
import { setHeaderToken } from "./clientService";
import requests from "../api/requests";
import { AUTH_API } from "../api/urls";

const storeAuthData = (data) => {
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

  storeAuthData(data);
};

export const register = async (formData) => {
  // send request
  const {
    data: { data },
  } = await requests.create(AUTH_API.register, formData);

  storeAuthData(data);
};

export const logout = () => {
  const keys = ["token", "expires", "user"];

  for (let key in keys) {
    storage.remove(key);
  }

  // remove the token from the client
  setHeaderToken("");
};

export const getExpiration = () => moment(storage.get("expires"));

export const getToken = () => storage.get("token");

export const getUser = () => storage.get("user");

export const setUser = (user) => storage.set("user", user);

export const checkTokenValid = () => {
  if (!moment().isBefore(getExpiration(), "second")) {
    logout();
  }
};
