import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ArticleForm from "../components/article/ArticleForm";
import { useHistory } from "react-router-dom";

export default function NewArticlePage() {
  const history = useHistory();
  const handleArticleCreation = (article) => {
    history.push(`/articles/${article._id}`);
  };
  return (
    <>
      <Navbar />
      <ArticleForm onCreation={handleArticleCreation} />
      <Footer />
    </>
  );
}
