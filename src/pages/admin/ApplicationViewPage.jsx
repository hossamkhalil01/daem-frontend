import { useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import { useTranslation } from "react-i18next";
import DoctorApplicationForm from "../../components/DoctorApplicationForm";
import { Link } from "react-router-dom";

const BecomeDoctorPage = (props) => {
  const [application, setApplication] = useState(null);

  const { t } = useTranslation();

  const handleSuccessSubmit = (newApplication) => {
    // set the state
    setApplication(newApplication);
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
                  {t("become-doctor-subtitle")}
                </span>
                <h1 className="text-capitalize mb-5 text-lg">
                  {t("become-doctor-title")}{" "}
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
            {!application ? (
              <DoctorApplicationForm onSuccessSubmit={handleSuccessSubmit} />
            ) : (
              <div className="justify-content-center text-center">
                <h3 className="title-color">
                  {t("become-doctor-submission-msg")}
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

export default BecomeDoctorPage;
