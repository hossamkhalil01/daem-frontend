import axios from "axios";
import { BASE_URL } from "../api/urls";


const axiosObj = null;

const getClient = () => {
  return axiosObj || axiosObj = axios.create({
    baseURL: BASE_URL,
    header: {
      Authorization: token,
    },
  })
}