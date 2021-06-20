export const BASE_URL = "http://localhost:8000";

// base urls
const AUTH_BASE = `${BASE_URL}/auth`;

// end points
export const TICKET_API = {
  updateTicket: (ticketId) => `${BASE_URL}/tickets/${ticketId}`,
  deleteTicket: (ticketId) => `${BASE_URL}/tickets/${ticketId}`,
  removeTicketDoctor: (ticketId) => `${BASE_URL}/tickets/${ticketId}/remove-doctor`
};

export const DOCTORS_API = {
  getAllDoctors: () => `${BASE_URL}/doctors`,
};

export const AUTH_API = {

  login: `${AUTH_BASE}/login`,
  register: `${AUTH_BASE}/register`,
}