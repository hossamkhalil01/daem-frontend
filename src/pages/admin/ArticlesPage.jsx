import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ArticleTable from "../../components/article/ArticleTable";
import Paginator from "../../components/Paginator";
import Search from "../../components/Search";
import PageHeaders from "../../components/PageHeaders";
import { UpdateArticlesListProvider } from "../../contexts/updateArticlesListContext";
import { getArticles } from "../../services/articlesService";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../../utils/pagination";

const ArticlesPage = (props) => {
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [articles, setArticles] = useState([]);
  const [update, setUpdate] = useState(false);

  const { t } = useTranslation();

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

  useEffect(() => {
    handlePageChange();
  }, [update]);

  return (
    <>
      <PageHeaders pageTitle={`${t("dashboard")} (${t("articles")})`} />
      <UpdateArticlesListProvider value={{ update, setUpdate }}>
        <div className="container">
          <div className="sidebar-wrap pl-lg-4 mt-5 mt-lg-0">
            <div className="sidebar-widget search mb-3">
              <h5>{t("search-here")}</h5>
              <Search
                onSearch={handleSearchChange}
                placeholder={t("search-by-title")}
              />
            </div>
          </div>
        </div>
        {/* <!-- Main content --> */}
        <div>
          <div className="row mt-5 container-fluid justify-content-center main-content">
            <div className="col-8">
              <ArticleTable articles={articles} />
              <div className="row justify-content-end">
                <div className="w-auto mt-4">
                  <Paginator
                    size="medium"
                    paginationInfo={pagination}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UpdateArticlesListProvider>
    </>
  );
};

export default ArticlesPage;
