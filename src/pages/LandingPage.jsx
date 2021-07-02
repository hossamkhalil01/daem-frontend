import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import ArticleCard from "../components/article/ArticleCard";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import PageHeaders from "../components/PageHeaders";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { getArticles } from "../services/articlesService";

const LandingPage = (props) => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const params = { limit: 3 };
  const getRecentArticles = async () => {
    const _articles = await getArticles(params);
    setArticles(_articles.data.data.docs);
  };
  useEffect(() => {
    getRecentArticles(params);
  }, []);
  return (
    <>
      <PageHeaders pageTitle={t("home")} />
      <Navbar />
      <div>
        {!currentUser || currentUser.role === "user" ? (
          <section className={`banner banner-${t("language")}`}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-xl-7">
                  <div className="block">
                    <div className="divider mb-3"></div>
                    <span className="text-uppercase text-sm letter-spacing "></span>
                    <h1 className="mb-3 mt-3">{t("banner-header")}</h1>

                    <p className="mb-4 pr-5">{t("banner-body")}</p>
                    <div className="btn-container ">
                      <NavLink
                        to="/tickets/new"
                        exact
                        className="btn btn-main-2 btn-icon btn-round-full"
                      >
                        {t("ask-doctor")}{" "}
                        <i className="icofont-simple-right ml-2  "></i>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        <section className="section suggested-articles-section">
          <div className="container">
            <div className="suggested-articles__header ">
              <h2 className="mb-5">{t("articles-section-header")}</h2>
            </div>
            <div className="suggested-articles">
              {articles.map((article) => (
                <div className="grid" key={article._id}>
                  <ArticleCard article={article}></ArticleCard>
                </div>
              ))}
            </div>
            <div className="">
              <NavLink
                to="/articles"
                exact
                className="btn btn-main-2 float-right mt-3 btn-icon btn-round-full"
              >
                {t("view-all-articles")}{" "}
                <i className="icofont-simple-right ml-2  "></i>
              </NavLink>
            </div>
          </div>
        </section>
        {!currentUser || currentUser.role === "user" ? (
          <section className={`section about about-${t("language")} mb-5`}>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="about-content pl-4 mt-4 mt-lg-0">
                    <h2 className="title-color">
                      {t("doctor-register-header")}
                    </h2>
                    <p className="mt-4 mb-5">{t("doctor-register-body")}</p>

                    <Link
                      to="/become-doctor"
                      className="btn btn-main-2 btn-round-full btn-icon"
                    >
                      {t("doctor-register-btn")}
                      <i className="icofont-simple-right ml-3"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
