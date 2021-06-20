import moment from "moment";
import * as storage from "../utils/storage";
import * as  clientService from "./clientService";
import { AUTH_API } from "../api/urls";
import { getClientObj } from "../services/clientService";

const client = getClientObj();

export const login = async ({ email, password }) => {

  // send request 
  const { data: { data } } = await client.post(AUTH_API.login, {
    email,
    password
  });

  // save auth data
  const expires = moment().add(data.expiresIn);

  storage.set("token", data.token);
  storage.set("expiresIn", expires.valueOf());
  storage.set("user", data.user);

  // register the token to the client
  clientService.setHeaderToken(data.token);

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

