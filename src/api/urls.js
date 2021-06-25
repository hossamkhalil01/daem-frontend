export const BASE_URL = "http://localhost:8000";

// base urls
const AUTH_BASE = `${BASE_URL}/auth`;

// end points
export const TICKET_API = {
  ticket: (ticketId) => `${BASE_URL}/tickets/${ticketId}`,
  removeTicketDoctor: (ticketId) => `${BASE_URL}/tickets/${ticketId}/remove-doctor`,
  getTickets: ()=>`${BASE_URL}/tickets`,
  createTicket: () => `${BASE_URL}/tickets`,
};

export const DOCTORS_API = {
  getAllDoctors: () => `${BASE_URL}/doctors`,
};

export const AUTH_API = {
  login: `${AUTH_BASE}/login`,
  register: `${AUTH_BASE}/register`,
}

export const COMMENTS_API = {
  comment: (commentId,ticketId)=> `${BASE_URL}/tickets/${ticketId}/comments/${commentId}`,
  ticketComments: (ticketId)=> `${BASE_URL}/tickets/${ticketId}/comments`
};

export const ADMIN_API = {
  getAllUsers: `${BASE_URL}/users`,
  updateUser: (userId) => `${BASE_URL}/users/${userId}`,
};

export const USER_API = {
  getUser: (userId) => `${BASE_URL}/users/${userId}`,
  updateUser: () => `${BASE_URL}/users/`,
};
