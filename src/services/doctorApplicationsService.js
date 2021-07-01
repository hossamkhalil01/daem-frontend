import requests from "../api/requests";
import { DOCTORS_APPLICATION_API } from "../api/urls";


export const getSpecialities = async () => {
  return requests.get(DOCTORS_APPLICATION_API.specialities);
};

export const getApplications = async (params) => {
  return requests.get(DOCTORS_APPLICATION_API.BASE_URL, params);
};

export const getApplication = async (id) => {
  return requests.get(DOCTORS_APPLICATION_API.application(id));
};

export const createApplication = async (formData) => {
  return requests.create(DOCTORS_APPLICATION_API.BASE_URL, formData);
};

export const approveApplication = async () => {
  return requests.create(DOCTORS_APPLICATION_API.approve);
};


export const rejectApplication = async (formData) => {
  return requests.create(DOCTORS_APPLICATION_API.reject);
};
