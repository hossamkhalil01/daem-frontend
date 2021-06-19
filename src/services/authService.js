import moment from "moment";
import storage from "../utils/storage";


const login = (res) => {

  const expires = moment().add(res.expiresIn);

  storage.set("token", res.token);
  storage.set("token", res.expires.valueOf());
  storage.set("user", res.user);

  // register the client

}

const logout = () => {

  const keys = ["token", "expires", "user"];

  for (let key in keys) {
    storage.remove(key);
  }
}

const getExpiration = () => moment(storage.get("expires"));

const getToken = () => storage.get("token");

const getUser = () => storage.get("user");

