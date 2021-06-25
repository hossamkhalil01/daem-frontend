import React, { useEffect, useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Paginator from "../components/Paginator";
import { BASE_URL } from "../api/urls";
import { getAllDoctors } from "../services/doctorsService";
import capitalize from "../utils/capitalize";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../utils/pagination";

const DoctorsPage = (props) => {
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
      const res = await getAllDoctors(params);
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
      <Navbar />
      <section className="page-title bg-1">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">All Doctors</span>
                <h1 className="text-capitalize mb-5 text-lg">
                  Specalized doctors
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- portfolio --> */}
      <section className="section doctors">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="section-title">
                <h2>Doctors</h2>
                <div className="divider mx-auto my-4"></div>
                <p>
                  We provide a wide range of creative services adipisicing elit.
                  Autem maxime rem modi eaque, voluptate. Beatae officiis neque{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 text-center  mb-5">
            <div className="btn-group btn-group-toggle " data-toggle="buttons">
              <label className="btn active ">
                <input
                  type="radio"
                  name="shuffle-filter"
                  value="all"
                  checked="checked"
                />
                All Department
              </label>
              <label className="btn ">
                <input type="radio" name="shuffle-filter" value="cat1" />
                Cardiology
              </label>
              <label className="btn">
                <input type="radio" name="shuffle-filter" value="cat2" />
                Dental
              </label>
              <label className="btn">
                <input type="radio" name="shuffle-filter" value="cat3" />
                Neurology
              </label>
              <label className="btn">
                <input type="radio" name="shuffle-filter" value="cat4" />
                Medicine
              </label>
              <label className="btn">
                <input type="radio" name="shuffle-filter" value="cat5" />
                Pediatric
              </label>
              <label className="btn">
                <input type="radio" name="shuffle-filter" value="cat6" />
                Traumatology
              </label>
            </div>
          </div>

          <div className="row shuffle-wrapper portfolio-gallery">
            {doctors.map((doctor) => (
              <div
                class="col-lg-3 col-sm-6 col-md-6 mb-4 shuffle-item"
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
                      <a href="doctor-single.html">
                        {capitalize(doctor.firstname) +
                          " " +
                          capitalize(doctor.lastname)}
                      </a>
                    </h4>
                    <p>Cardiology</p>
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
      {/* <!-- /portfolio --> */}
      <section className="section cta-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="cta-content">
                <div className="divider mb-4"></div>
                <h2 className="mb-5 text-lg">
                  We are pleased to offer you the{" "}
                  <span className="title-color">
                    chance to have the healthy
                  </span>
                </h2>
                <a
                  href="appoinment.html"
                  className="btn btn-main-2 btn-round-full"
                >
                  Get appoinment<i className="icofont-simple-right  ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DoctorsPage;
