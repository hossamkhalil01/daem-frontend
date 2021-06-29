import requests from "../api/requests";
import { ARTICLES_API } from "../api/urls";

export const getAllArticles = async () => {
  return await requests.get(ARTICLES_API.getAllArticles);
};

export const getArticle = async (articleId) => {
  return await requests.get(ARTICLES_API.getArticle(articleId));
};