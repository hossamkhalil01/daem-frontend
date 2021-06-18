import axios from "axios";
import { DOCTORS_API } from "../api/urls";

export const getAllDoctors = async () => {
  return await axios.get(DOCTORS_API.getAllDoctors());
};