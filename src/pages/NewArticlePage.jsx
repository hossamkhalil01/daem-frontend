import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ArticleForm from "../components/article/ArticleForm";
import PageHeaders from "../components/PageHeaders";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function NewArticlePage() {
  const { t } = useTranslation();
  const history = useHistory();

  const handleArticleCreation = (article) => {
    history.push(`/articles/${article._id}`);
  };
  return (
    <>
      <PageHeaders pageTitle={t("new-article")} />
      <Navbar />
      <ArticleForm onCreation={handleArticleCreation} />
      <Footer />
    </>
  );
}
