import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { BASE_URL } from "../api/urls";
import ArticleCard from "../components/article/ArticleCard";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Paginator from "../components/Paginator";
import Search from "../components/Search";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { getArticles } from "../services/articlesService";
import { formatDate } from "../services/dateService";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../utils/pagination";

const ArticlesPage = (props) => {
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [articles, setArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const handlePageChange = async (newPage = 1, filterObj = {}) => {
    // construct the params
    const params = createPaginationParams(filterObj, {
      ...pagination,
      page: newPage,
      limit: 8,
    });

    // get the new page from api
    try {
      const res = await getArticles(params);
      const { data, paginationInfo } = parsePaginatedResponse(res);
      // set the values
      setPagination(paginationInfo);
      setArticles(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchChange = (searchKey) => {
    // search with the new key
    handlePageChange(1, { q: searchKey });
  };

  const getLatestArticle = async () => {
    const params = { page: 1, limit: 3 };
    const res = await getArticles(params);
    const { data } = parsePaginatedResponse(res);
    setLatestArticles(data);
  };

  useEffect(() => {
    getLatestArticle();
    handlePageChange();
  }, []);

  return (
    <>
      <Navbar />
      <section className="page-title bg-1">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">{t("articles-header")}</span>
                <h1 className="text-capitalize mb-5 text-lg">
                  {t("articles-section-header")}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Main content --> */}
      <section className="section blog-wrap">
        <div className="container">
          <div className="row">
            {/* Articles */}
            <section className="col-lg-8">
              <div className="row">
                {!articles.length ? (
                  <div className="col-lg-12 col-md-12 mb-5 text-center alert alert-info">
                    <h2>
                      <h5>{t("no-articles-found")}</h5>
                    </h2>
                    <p>
                      <Link to="/">
                        <ArrowBackIcon />
                        <h5>{t("back-to-home")}</h5>
                      </Link>
                    </p>
                  </div>
                ) : (
                  articles.map((article) => {
                    return (
                      <div
                        className="col-lg-12 col-md-12 mb-5"
                        key={article._id}
                      >
                        <div className="blog-item">
                          <div className="blog-thumb">
                            <img
                              src={BASE_URL + "/" + article.image}
                              alt="article"
                              className="img-fluid"
                            />
                          </div>
                          <div className="blog-item-content">
                            <div className="blog-item-meta mb-3 mt-4">
                              <span className="text-muted text-capitalize mr-3">
                                <i className="icofont-user mr-2"></i>
                                {article.author.firstname +
                                  " " +
                                  article.author.lastname}
                              </span>
                              <br />
                              <span className="text-black text-capitalize mr-3">
                                <i className="float-left icofont-calendar mr-1"></i>
                                {formatDate(article.createdAt, t("language"))}
                              </span>
                            </div>

                            <h2 className="mt-3 mb-3">
                              <Link
                                to={`/articles/${article._id}`}
                                key={article._id}
                              >
                                {article.title}
                              </Link>
                            </h2>

                            <p className="mb-4">{article.title}</p>
                            <Link
                              to={`/articles/${article._id}`}
                              className="btn btn-main btn-icon btn-round-full"
                            >
                              {t("read-more")}{" "}
                              <i className="icofont-simple-right ml-2"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Pagination */}
              <section className="row mt-4 justify-content-center">
                <div className="w-auto col-lg-8 mb-5">
                  <Paginator
                    paginationInfo={pagination}
                    onPageChange={handlePageChange}
                    size="large"
                  />
                </div>
              </section>
            </section>

            {/* Side Nav */}
            <section className="col-lg-4">
              <div className="sidebar-wrap pl-lg-4 mt-5 mt-lg-0">
                {currentUser && currentUser.role !== "user" ? (
                  <div className="sidebar-widget search mb-3">
                    <h5>{t("new-article-header")}</h5>
                    <NavLink
                      to="/articles/new"
                      exact
                      className="float-right mb-5 btn btn-main-2 btn-icon btn-round-full"
                    >
                      {t("new-article")}{" "}
                      <i className="icofont-simple-right ml-2  "></i>
                    </NavLink>
                  </div>
                ) : (
                  ""
                )}

                <div className="sidebar-widget search mb-3">
                  <h5>{t("search-here")}</h5>
                  <Search
                    onSearch={handleSearchChange}
                    placeholder={t("search-by-title")}
                  />
                </div>
                <div className="sidebar-widget latest-post mb-3">
                  <h5>{t("latest-articles")}</h5>

                  {latestArticles.map((article) => (
                    <Link to={`/articles/${article._id}`} key={article._id}>
                      <div className="mb-3">
                        <ArticleCard article={article} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ArticlesPage;
