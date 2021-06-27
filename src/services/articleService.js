import requests from "../api/requests";
import { ARTICLE_API } from "../api/urls";

export const deleteArticle = async (articleId) => {
  return requests.delete(ARTICLE_API.article(articleId));
};

export const updateArticle = async (articleId, updates) => {
  return requests.update(ARTICLE_API.article(articleId), updates);
};

export const getArticles = async (params) => {
  return requests.get(ARTICLE_API.getArticles(), params);
};

export const createArticle = async (formData) => {
  return requests.create(ARTICLE_API.allArticles(), formData);
};
