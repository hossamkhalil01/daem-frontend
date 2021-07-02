import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import ArticleForm from "../components/article/ArticleForm";
import PageHeaders from "../components/PageHeaders";

export default function UpdateArticlePage() {
  const { t } = useTranslation();
  const history = useHistory();

  const handleArticleCreation = (article) => {
    history.push(`/articles/${article._id}`);
  };
  const location = useLocation();
  if (location.state === undefined) {
    history.push("/articles/");
  }
  const article = location.state?.article;
  return (
    <>
      <PageHeaders pageTitle={t("edit-article")} />
      <ArticleForm article={article} onCreation={handleArticleCreation} />
    </>
  );
}
