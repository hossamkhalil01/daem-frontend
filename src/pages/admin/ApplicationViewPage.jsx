import { useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  approveApplication,
  rejectApplication,
} from "../../services/doctorApplicationsService";
import { BASE_URL } from "../../api/urls";
import { formatDate } from "../../utils/formatDate";

const ApplicationViewPage = () => {
  const [curApplication, setCurApplication] = useState(null);
  const location = useLocation();
  const { application } = location.state;
  const history = useHistory();

  const { t } = useTranslation();

  const handleApprove = async () => {
    const res = await approveApplication(application._id);
    history.goBack();
  };

  const handleReject = async () => {
    const res = await rejectApplication(application._id);
  };

  return (
    <>
      <Navbar />
      {/* Page Title Section */}
      <section className="page-title bg-1">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">
                  {t("doctor-application-subtitle")}
                </span>
                <h1 className="text-capitalize mb-5 text-lg">
                  {t("doctor-application-title")}{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become Doctor Form Section */}
      <section className="appoinment section">
        <div className="row justify-content-center">
          <div className="container col-md-8">
            <Link to="/admin/dashboard" className="btn btn-sm btn-info mr-4">
              Back To Dashboard
            </Link>
            {application ? (
              <div className="text-center border p-4">
                <div className="row">
                  <div className="col-6 row">
                    <label className="lead col-6">Status</label>
                    <p className="text-muted col-6">{application.status}</p>
                  </div>
                  <div className="col-6 row">
                    <label className="lead col-6">Speciality</label>
                    <p className="text-muted col-6">{application.speciality}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 row">
                    <label className="lead col-6">Full Name</label>
                    <p className="text-muted col-6">
                      {application.applicant.firstname +
                        " " +
                        application.applicant.lastname}
                    </p>
                  </div>
                  <div className="col-6 row">
                    <label className="lead col-6">Email</label>
                    <p className="text-muted col-6">
                      {application.applicant.email}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 row">
                    <label className="lead col-6">Gender</label>
                    <p className="text-muted col-6">
                      {application.applicant.gender}
                    </p>
                  </div>
                  <div className="col-6 row">
                    <label className="lead col-6">Date Of Birth</label>
                    <p className="text-muted col-6">
                      {formatDate(application.applicant.DOB)}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-3">
                    <label className="lead">About</label>
                  </div>
                  <div className="col-9">
                    <p className="text-muted text-justify">
                      {application.about}
                    </p>
                  </div>
                </div>

                <div className="row align-items-center">
                  <label className="col-3">National ID</label>
                  <img
                    className="img-fluid img-thumbnail col-9 w-50 m-2"
                    src={BASE_URL + "/" + application.nationalId}
                    alt=""
                  />
                </div>

                <div className="row align-items-center">
                  <label className="col-3">Doctor ID</label>
                  <img
                    className="img-fluid img-thumbnail col-9 w-50 m-2"
                    src={BASE_URL + "/" + application.doctorId}
                    alt=""
                  />
                </div>

                {application.status === "pending" ? (
                  <div className="d-flex justify-content-around m-5">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleApprove();
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        handleReject();
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="justify-content-center text-center">
                <h3 className="title-color">
                  {t("doctor-application-notFound-msg")}
                </h3>
                <Link
                  to="/"
                  className="btn btn-main btn-lg btn-round-full mt-5"
                >
                  {" "}
                  {t("back-to-home")}
                  <i className="icofont-simple-left ml-2"></i>
                </Link>
              </div>
            )}
          </div>
          )
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplicationViewPage;
