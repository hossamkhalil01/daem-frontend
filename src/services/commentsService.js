import requests from "../api/requests";
import { COMMENTS_API } from "../api/urls";

export const deleteComment = async (commentId) => {
  return requests.delete(COMMENTS_API.comment(commentId));
};

export const updateComment = async (commentId, updates) => {
  return requests.update(COMMENTS_API.comment(commentId), updates);
};

export const getComments = async (ticketId, params) => {
  return requests.get(COMMENTS_API.ticketComments(ticketId), params);
};

export const addComment = async (ticketId, body) => {
  return requests.create(COMMENTS_API.ticketComments(ticketId), body);
};
