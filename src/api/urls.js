export const BASE_URL = "http://localhost:8000";

export const TICKET_API = {
  updateTicket: (ticketId) => `${BASE_URL}/tickets/${ticketId}`,
  deleteTicket: (ticketId) => `${BASE_URL}/tickets/${ticketId}`,
};
