import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BASE_URL } from "../api/urls";
import PageHeaders from "../components/PageHeaders";
import Paginator from "../components/Paginator";
import { getDoctors } from "../services/doctorsService";
import capitalize from "../utils/capitalize";
import {
  createPaginationParams,
  parsePaginatedResponse
} from "../utils/pagination";

const DoctorsPage = (props) => {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [doctors, setDoctors] = useState([]);

  const handlePageChange = async (newPage = 1, filterObj = {}) => {
    // construct the params
    const params = createPaginationParams(filterObj, {
      ...pagination,
      page: newPage,
      limit: 8,
    });
    // get the new page from api
    try {
      const res = await getDoctors(params);
      const { data, paginationInfo } = parsePaginatedResponse(res);
      // set the values
      setPagination(paginationInfo);
      setDoctors(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handlePageChange();
  }, []);

  return (
    <>
      <PageHeaders pageTitle={t("doctors")} />
      <section className="page-title bg-1">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">{t("all-doctors")}</span>
                <h1 className="text-capitalize mb-5 text-lg">
                  {t("specialized-doctors")}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Doctors --> */}
      <section className="section doctors">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="section-title">
                <h2>{t("doctors")}</h2>
                <div className="divider mx-auto my-4"></div>
                <p>{t("doctors-page-body")}</p>
              </div>
            </div>
          </div>

          <div className="row shuffle-wrapper portfolio-gallery">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="col-lg-3 col-sm-6 col-md-6 mb-4 shuffle-item"
                data-groups='["cat1","cat2"]'
              >
                <div className="position-relative doctor-inner-box">
                  <div className="doctor-profile">
                    <div className="doctor">
                      <img
                        src={BASE_URL + "/" + doctor.avatar}
                        alt="doctor"
                        className="img-fluid w-100"
                      />
                    </div>
                  </div>
                  <div className="content mt-3">
                    <h4 className="mb-0">
                      <Link to={"/doctors/" + doctor._id}>
                        {capitalize(doctor.firstname) +
                          " " +
                          capitalize(doctor.lastname)}
                      </Link>
                    </h4>
                    <p></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pagination */}
      <section className="row justify-content-center">
        <div className="w-auto mt-1  mb-5">
          <Paginator
            paginationInfo={pagination}
            onPageChange={handlePageChange}
            size="large"
          />
        </div>
      </section>

      {/* <!-- call to action section --> */}
      <section className={`section cta-page cta-page-${t("language")}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 float-left">
              <div className="cta-content">
                <div className="divider mb-4"></div>
                <h2 className="mb-5 text-lg">
                  <span className="title-color">
                    {t("doctors-page-footer")}
                  </span>
                </h2>
                <Link
                  to="/tickets/new"
                  exact
                  className="btn btn-main-2 btn-round-full"
                >
                  {t("ask-doctor")}
                  <i className="icofont-simple-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorsPage;
