import axios from "axios";
import { TICKET_API } from "../api/urls";

export const createTicket = async (formData) => {
  return axios
    .post(TICKET_API.createTicket(), formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; charset=utf-8; boundary=" +
          Math.random().toString().substr(2),
      },
    })
    .then((res) => {
      console.log(res.data);
    });
};

export const deleteTicket = async (ticketId) => {
  return axios.delete(TICKET_API.deleteTicket(ticketId));
};

export const updateTicket = async (ticketId, updates) => {
  return axios.patch(TICKET_API.updateTicket(ticketId), {
    updates,
  });
};

export const removeTicketDoctor = async (ticketId) => {
  return axios.delete(TICKET_API.removeTicketDoctor(ticketId));
};
