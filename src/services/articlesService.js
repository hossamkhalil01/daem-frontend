import requests from "../api/requests";
import { ARTICLES_API } from "../api/urls";

export const deleteArticle = async (articleId) => {
  return requests.delete(ARTICLES_API.article(articleId));
};

export const updateArticle = async (articleId, updates) => {
  return requests.update(ARTICLES_API.article(articleId), updates);
};

export const getArticles = async (params) => {
  return requests.get(ARTICLES_API.allArticles(), params);
};

export const getArticle = async (articleId, params) => {
  return requests.get(ARTICLES_API.article(articleId), params);
};

export const createArticle = async (formData) => {
  return requests.create(ARTICLES_API.allArticles(), formData);
};
