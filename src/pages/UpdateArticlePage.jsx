import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ArticleForm from "../components/article/ArticleForm";
import { useHistory, useLocation } from "react-router-dom";

export default function UpdateArticlePage() {
  const history = useHistory();
  const handleArticleCreation = (article) => {
    history.push(`/articles/${article._id}`);
  };
  const location = useLocation();
  const { article } = location.state;
  return (
    <>
      <Navbar />
      <ArticleForm article={article} onCreation={handleArticleCreation} />
      <Footer />
    </>
  );
}
