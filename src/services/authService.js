import moment from "moment";
import * as storage from "../utils/storage";
import * as  clientService from "./clientService";

export const login = (res) => {

  const expires = moment().add(res.expiresIn);

  storage.set("token", res.token);
  storage.set("token", expires.valueOf());
  storage.set("user", res.user);

  // register the token to the client
  clientService.setHeaderToken(res.token);
}

export const logout = () => {

  const keys = ["token", "expires", "user"];

  for (let key in keys) {
    storage.remove(key);
  };

  // remove the token from the client
  clientService.setHeaderToken('');
}

export const getExpiration = () => moment(storage.get("expires"));

export const getToken = () => storage.get("token");

export const getUser = () => storage.get("user");

export const checkTokenValid = () => {

  if (!moment().isBefore(getExpiration(), "second")) {
    logout();
  }
}

