import { useTranslation } from "react-i18next";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import PageHeaders from "../components/PageHeaders";

const AboutUsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <PageHeaders pageTitle={t("about-us")} />
      <section className="page-title bg-1">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">{t("about-us-subheader")}</span>
                <h1 className="text-capitalize mb-5 text-lg">
                  {t("about-us-header")}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section about-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h2 className="title-color">{t("about-us-sidebar")}</h2>
            </div>
            <div className="col-lg-8">
              <p>{t("about-us-body")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fetaure-page ">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <img
                  src="/assets/images/about/about-2.jpg"
                  alt=""
                  className="img-fluid w-100"
                />
                <h4 className="mt-3">{t("feature1-header")}</h4>
                <p>{t("feature1-body")}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <img
                  src="/assets/images/about/about-1.jpg"
                  alt=""
                  className="img-fluid w-100"
                />
                <h4 className="mt-3">{t("feature2-header")}</h4>
                <p>{t("feature2-body")}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <img
                  src="/assets/images/about/about-3.jpg"
                  alt=""
                  className="img-fluid w-100"
                />
                <h4 className="mt-3">{t("feature3-header")}</h4>
                <p>{t("feature3-body")}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item">
                <img
                  src="/assets/images/about/about-4.jpg"
                  alt=""
                  className="img-fluid w-100"
                />
                <h4 className="mt-3">{t("feature4-header")}</h4>
                <p>{t("feature4-body")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUsPage;
