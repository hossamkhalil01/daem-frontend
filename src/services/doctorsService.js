import requests from "../api/requests";
import { DOCTORS_API } from "../api/urls";

export const getAllDoctors = async () => {
  return await requests.get(DOCTORS_API.getAllDoctors());
};