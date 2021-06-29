import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Paginator from "../components/Paginator";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../api/urls";
import { getAllArticles } from "../services/articlesService";
import capitalize from "../utils/capitalize";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../utils/pagination";

const ArticlesPage = (props) => {
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [articles, setArticles] = useState([]);

  const handlePageChange = async (newPage = 1, filterObj = {}) => {
    // construct the params
    const params = createPaginationParams(filterObj, {
      ...pagination,
      page: newPage,
      limit: 8,
    });

    // get the new page from api
    try {
      const res = await getAllArticles(params);
      const { data, paginationInfo } = parsePaginatedResponse(res);
      // set the values
      setPagination(paginationInfo);
      setArticles(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
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
                <span className="text-white">Our Doctor's</span>
                <h1 className="text-capitalize mb-5 text-lg">Articles</h1>
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
                {articles.map((article) => {
                  return (
                    <div className="col-lg-12 col-md-12 mb-5">
                      <div className="blog-item">
                        <div className="blog-thumb">
                          <img
                            src={BASE_URL + "/" + article.image}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="blog-item-content">
                          <div className="blog-item-meta mb-3 mt-4">
                            <span className="text-muted text-capitalize mr-3">
                              <i className="icofont-comment mr-2"></i>5 Comments
                            </span>
                            <span className="text-black text-capitalize mr-3">
                              <i className="icofont-calendar mr-1"></i> 28th
                              January
                            </span>
                          </div>

                          <h2 className="mt-3 mb-3">
                            <a href="blog-single.html">{article.title}</a>
                          </h2>

                          <p className="mb-4">{article.title}</p>

                          <a
                            href="blog-single.html"
                            target="_blank"
                            className="btn btn-main btn-icon btn-round-full"
                          >
                            Read More{" "}
                            <i className="icofont-simple-right ml-2"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Side Nav */}
            <section className="col-lg-4">
              <div className="sidebar-wrap pl-lg-4 mt-5 mt-lg-0">
                <div className="sidebar-widget search mb-3">
                  <h5>Search Here</h5>
                  <form action="#" className="search-form">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search"
                    />
                    <i className="ti-search"></i>
                  </form>
                </div>
                <div className="sidebar-widget latest-post mb-3">
                  <h5>Popular Posts</h5>

                  <div className="py-2">
                    <span className="text-sm text-muted">03 Mar 2018</span>
                    <h6 className="my-2">
                      <a href="#">Thoughtful living in los Angeles</a>
                    </h6>
                  </div>

                  <div className="py-2">
                    <span className="text-sm text-muted">03 Mar 2018</span>
                    <h6 className="my-2">
                      <a href="#">Vivamus molestie gravida turpis.</a>
                    </h6>
                  </div>

                  <div className="py-2">
                    <span className="text-sm text-muted">03 Mar 2018</span>
                    <h6 className="my-2">
                      <a href="#">
                        Fusce lobortis lorem at ipsum semper sagittis
                      </a>
                    </h6>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="row mt-3">
        <div className="w-auto col-lg-8 mb-5">
          <Paginator
            paginationInfo={pagination}
            onPageChange={handlePageChange}
            size="large"
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ArticlesPage;
