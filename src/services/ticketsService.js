import axios from "axios";
import { TICKET_API } from "../api/urls";

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
