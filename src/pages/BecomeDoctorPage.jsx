import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { useTranslation } from "react-i18next";

import DoctorApplicationForm from "../components/DoctorApplicationForm";

const BecomeDoctorPage = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      {/* Page Title Section */}
      <section class="page-title bg-1">
        <div class="overlay"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="block text-center">
                <span class="text-white">{t("become-doctor-subtitle")}</span>
                <h1 class="text-capitalize mb-5 text-lg">
                  {t("become-doctor-title")}{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become Doctor Form Section */}
      <section class="appoinment section">
        <div className="row justify-content-center">
          <div class="container col-md-8">
            <DoctorApplicationForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BecomeDoctorPage;
