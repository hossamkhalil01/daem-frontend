import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { Link, useHistory, useLocation } from "react-router-dom";
import { BASE_URL } from "../../api/urls";
import {
  approveApplication,
  rejectApplication
} from "../../services/doctorApplicationsService";
import { formatDate } from "../../utils/formatDate";

const ApplicationViewPage = () => {
  const location = useLocation();
  const { application } = location.state;
  const history = useHistory();

  const { t } = useTranslation();

  const handleApprove = async () => {
    await approveApplication(application._id);
    history.goBack();
  };

  const handleReject = async () => {
    await rejectApplication(application._id);
  };

  return (
    <>
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
              {t("back-to-dashboard")}
            </Link>
            {application ? (
              <div className="text-center border p-4">
                <div className="row">
                  <div className="col-6 row">
                    <label className="lead col-6">{t("state")}</label>
                    <p className="text-muted col-6">{t(application.status)}</p>
                  </div>
                  <div className="col-6 row">
                    <label className="lead col-6">{t("speciality")}</label>
                    <p className="text-muted col-6">{t(application.speciality)}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 row">
                    <label className="lead col-6">{t("name")}</label>
                    <p className="text-muted col-6">
                      {application.applicant.firstname +
                        " " +
                        application.applicant.lastname}
                    </p>
                  </div>
                  <div className="col-6 row">
                    <label className="lead col-6">{t("email")}</label>
                    <p className="text-muted col-6">
                      {application.applicant.email}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 row">
                    <label className="lead col-6">{t("gender")}</label>
                    <p className="text-muted col-6">
                      {application.applicant.gender}
                    </p>
                  </div>
                  <div className="col-6 row">
                    <label className="lead col-6">{t("date-of-birth")}</label>
                    <p className="text-muted col-6">
                      {formatDate(application.applicant.DOB,t("language"))}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-3">
                    <label className="lead">{t("about")}</label>
                  </div>
                  <div className="col-9">
                    <p className="text-muted text-justify">
                      {application.about}
                    </p>
                  </div>
                </div>

                <div className="row align-items-center">
                  <label className="col-3">{t("national-id")}</label>
                  <img
                    className="img-fluid img-thumbnail col-9 w-50 m-2"
                    src={BASE_URL + "/" + application.nationalId}
                    alt=""
                  />
                </div>

                <div className="row align-items-center">
                  <label className="col-3">{t("doctor-id")}</label>
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
                      {t("approve")}
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        handleReject();
                      }}
                    >
                     {t("reject")}
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
    </>
  );
};

export default ApplicationViewPage;
