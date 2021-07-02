import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../api/urls";
import ArticleCard from "../components/article/ArticleCard";
import DeleteArticle from "../components/articleActions/DeleteArticle";
import EditArticle from "../components/articleActions/EditArticle";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Loading from "../components/Loading";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { getArticle, getArticles } from "../services/articlesService";
import { formatDate } from "../utils/formatDate";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeaders from "../components/PageHeaders";

export default function ArticlePage() {
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [curArticle, setCurArticle] = useState({
    title: "",
    body: "",
    image: "",
    author: {},
    createdAt: "",
    updatedAt: "",
  });
  const [latestArticles, setLatestArticles] = useState([]);
  const { currentUser } = useCurrentUser();

  const getLatestArticle = async () => {
    const params = { page: 1, limit: 3 };
    const res = await getArticles(params);
    setLatestArticles(res.data.data.docs);
  };

  const getCurArticle = async () => {
    try {
      const res = await getArticle(id);
      setCurArticle(res.data.data);
    } catch (error) {
      history.push("/notFound");
    }
  };
  useEffect(() => {
    getCurArticle();
    getLatestArticle();
    setLoading(false);
  }, [id]);
  return (
    <>
      <PageHeaders pageTitle={t("article-details")} />
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="page-title bg-1">
            <div className="overlay"></div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="block text-center">
                    <span className="text-white">{t("article-details")}</span>
                    <h1 className="text-capitalize mb-5 text-lg">
                      {curArticle.title}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section blog-wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 mb-5">
                      <div className="single-blog-item">
                        <img
                          src={BASE_URL + "/" + curArticle.image}
                          alt=""
                          className="img-fluid"
                        />

                        <div className="blog-item-content mt-5">
                          <div className="blog-item-meta mb-3">
                            <span className="text-color-2 text-capitalize mr-3">
                              <i className="icofont-user mr-2"></i>{" "}
                              {curArticle.author?.firstname +
                                " " +
                                curArticle.author?.lastname}
                            </span>
                            <span className="text-black text-capitalize mr-3">
                              <i className="icofont-calendar mr-2"></i>{" "}
                              {formatDate(curArticle.createdAt)}
                            </span>
                          </div>

                          <h2 className="mb-4 text-md">{curArticle.title}</h2>

                          <p className="lead mb-4 text-justify">
                            {curArticle.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {curArticle.author?._id === currentUser?._id ? (
                      <div className="d-flex justify-content-around">
                        <EditArticle article={curArticle} />

                        <DeleteArticle articleId={curArticle?._id} />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="sidebar-wrap pl-lg-4 mt-5 mt-lg-0">
                    <div className="sidebar-widget latest-post mb-3">
                      <h5>Latest Articles</h5>

                      {latestArticles.map((article) => (
                        <Link to={`/articles/${article._id}`} key={article._id}>
                          <div className="mb-3">
                            <ArticleCard article={article} />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <Footer />
    </>
  );
}
