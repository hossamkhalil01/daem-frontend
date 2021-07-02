import requests from "../api/requests";
import { DOCTORS_API } from "../api/urls";

export const getAllDoctors = async () => {
  return await requests.get(DOCTORS_API.getAllDoctors());
};

export const getDoctors = async (params) => {
  return await requests.get(DOCTORS_API.getDoctors(),params);
};

export const getDoctor = async (doctorId) => {
  return await requests.get(DOCTORS_API.getDoctor(doctorId));
};