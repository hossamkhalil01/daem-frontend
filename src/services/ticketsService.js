import requests from "../api/requests";
import { TICKETS_API } from "../api/urls";

export const createTicket = async (formData) => {
  return requests.create(TICKETS_API.createTicket(), formData);
};

export const deleteTicket = async (ticketId) => {
  return requests.delete(TICKETS_API.ticket(ticketId));
};

export const updateTicket = async (ticketId, updates) => {
<<<<<<< HEAD
  return requests.update(TICKETS_API.ticket(ticketId), updates);
=======
  return requests.update(TICKET_API.ticket(ticketId), updates);
>>>>>>> dev
};

export const removeTicketDoctor = async (ticketId) => {
  return requests.delete(TICKETS_API.removeTicketDoctor(ticketId));
};

export const getTicket = async (ticketId) => {
  return requests.get(TICKETS_API.ticket(ticketId));
};

export const getTickets = async (params) => {
  return requests.get(TICKETS_API.getTickets(), params);
};
