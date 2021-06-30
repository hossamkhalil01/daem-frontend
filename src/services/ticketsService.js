import requests from "../api/requests";
import { TICKETS_API } from "../api/urls";

export const createTicket = async (formData) => {
  return requests.create(TICKETS_API.createTicket(), formData);
};

export const deleteTicket = async (ticketId) => {
  return requests.delete(TICKETS_API.ticket(ticketId));
};

export const updateTicketUser = async (ticketId, updates) => {
  return requests.update(TICKETS_API.userUpdateTicket(ticketId), updates);
};

export const updateTicketDoctor = async (ticketId, updates) => {
  return requests.update(TICKETS_API.doctorUpdateTicket(ticketId), updates);
};

export const updateTicketModerator = async (ticketId, updates) => {
  return requests.update(TICKETS_API.moderatorUpdateTicket(ticketId), updates);
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
