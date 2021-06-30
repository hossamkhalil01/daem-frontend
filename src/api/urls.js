import env from "../utils/env";

export const BASE_URL = env.get("REACT_APP_API_URL") || "http://localhost:8000";

// base urls
const AUTH_BASE = `${BASE_URL}/auth`;

// end points
export const TICKETS_API = {
  ticket: (ticketId) => `${BASE_URL}/tickets/${ticketId}`,
  removeTicketDoctor: (ticketId) =>
    `${BASE_URL}/tickets/${ticketId}/remove-doctor`,
  getTickets: () => `${BASE_URL}/tickets`,
  createTicket: () => `${BASE_URL}/tickets`,
  userUpdateTicket: (ticketId) => `${BASE_URL}/tickets/user/${ticketId}`,
  moderatorUpdateTicket: (ticketId) =>
    `${BASE_URL}/tickets/moderator/${ticketId}`,
  doctorUpdateTicket: (ticketId) => `${BASE_URL}/tickets/doctor/${ticketId}`,
};

export const DOCTORS_API = {
  getAllDoctors: () => `${BASE_URL}/doctors`,
  getDoctor: (id) => `${BASE_URL}/doctors/${id}`,
};

export const AUTH_API = {
  login: `${AUTH_BASE}/login`,
  register: `${AUTH_BASE}/register`,
  currrentUser: `${AUTH_BASE}/user`,
};

export const COMMENTS_API = {
  comment: (commentId, ticketId) =>
    `${BASE_URL}/tickets/${ticketId}/comments/${commentId}`,
  ticketComments: (ticketId) => `${BASE_URL}/tickets/${ticketId}/comments`,
};

export const ADMIN_API = {
  getAllUsers: `${BASE_URL}/users`,
  updateUser: (userId) => `${BASE_URL}/users/${userId}`,
};

export const USER_API = {
  getUser: (userId) => `${BASE_URL}/users/${userId}`,
  updateUser: () => `${BASE_URL}/users/`,
};

export const ARTICLES_API = {
  article: (articleId) => `${BASE_URL}/articles/${articleId}`,
  allArticles: () => `${BASE_URL}/articles`,
};
