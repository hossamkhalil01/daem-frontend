export const BASE_URL = "http://localhost:8000";

export const TICKET_API = {
  updateTicket: (ticketId) => `${BASE_URL}/tickets/${ticketId}`,
  deleteTicket: (ticketId) => `${BASE_URL}/tickets/${ticketId}`,
  removeTicketDoctor: (ticketId) =>
    `${BASE_URL}/tickets/${ticketId}/remove-doctor`,
  createTicket: () => `${BASE_URL}/tickets/multipleupload`,
};

export const DOCTORS_API = {
  getAllDoctors: () => `${BASE_URL}/doctors`,
};
