import requests from "../api/requests";
import { TICKET_API } from "../api/urls";

export const deleteTicket = async (ticketId) => {
  return requests.delete(TICKET_API.ticket(ticketId));
};

export const updateTicket = async (ticketId, updates) => {
  return requests.update(TICKET_API.ticket(ticketId),
    updates
  );
};

export const removeTicketDoctor = async (ticketId) => {
  return requests.delete(TICKET_API.removeTicketDoctor(ticketId));
};

export const getTicket = async (ticketId) => {
  return requests.get(TICKET_API.ticket(ticketId));
};

export const getTickets = async (params) => {
  return requests.get(TICKET_API.getTickets(),params)
}