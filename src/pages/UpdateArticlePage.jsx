import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ArticleForm from "../components/article/ArticleForm";
import PageHeaders from "../components/PageHeaders";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
      <Navbar />
      <ArticleForm article={article} onCreation={handleArticleCreation} />
      <Footer />
    </>
  );
}
