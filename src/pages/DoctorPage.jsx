import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoctor } from "../services/doctorsService";
import capitalize from "../utils/capitalize";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import { NavLink } from "react-router-dom";
import { BASE_URL } from "../api/urls";
const DoctorPage = (props) => {
  const { id } = useParams();

  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    getDoctor(id).then((res) => {
      setDoctor(res.data.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <section className="page-title bg-1">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="block text-center">
                  <span className="text-white">Doctor Details</span>
                  <h1 className="text-capitalize mb-5 text-lg">
                    {doctor?._id
                      ? capitalize(doctor.firstname) +
                        " " +
                        capitalize(doctor.lastname)
                      : ""}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section doctor-single">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="doctor-img-block">
                  <img
                    src={`${BASE_URL}/${doctor.avatar}`}
                    alt=""
                    className="img-fluid w-100"
                  />

                  <div className="info-block mt-4">
                    <h4 className="mb-0">
                      {doctor?._id
                        ? capitalize(doctor.firstname) +
                          " " +
                          capitalize(doctor.lastname)
                        : ""}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-lg-8 col-md-6">
                <div className="doctor-details mt-4 mt-lg-0">
                  <h2 className="text-md">About</h2>
                  <div className="divider my-4"></div>
                  <p>{doctor.about}</p>

                  <NavLink
                    to="/tickets/new"
                    exact
                    className="btn btn-main-2 btn-round-full"
                  >
                    Create Ticket<i className="icofont-simple-right ml-2"></i>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default DoctorPage;
