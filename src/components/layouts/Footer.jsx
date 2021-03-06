import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
const Footer = (props) => {
  const { t } = useTranslation();
  return (
    <footer className="footer section gray-bg mt-5">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-4  col-sm-6">
            <div className="widget mb-5 mb-lg-0">
              <div className="logo mb-4">
                <NavLink to="/home" exact>
                  <img
                    src="/assets/images/logo-text.png"
                    alt="Daem"
                    width="300"
                    height="200"
                    className="img-fluid"
                  />
                </NavLink>
              </div>
              <p>
                {t("footer-developed-by")} <br /> <br />
                <a
                  href="https://github.com/montaser223"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abdul-Rhaman Montaser <br />
                </a>
                <a
                  href="https://github.com/AhmedMamdouh996"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ahmed Mamdouh <br />
                </a>
                <a
                  href="https://github.com/AyaHamedd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aya Hamed <br />
                </a>
                <a
                  href="https://github.com/hossamkhalil01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hossam Khalil <br />
                </a>
              </p>

              <ul className="list-inline footer-socials mt-4">
                <li className="list-inline-item">
                  <a href="#">
                    <i className="icofont-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="icofont-linkedin"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://github.com/hossamkhalil01/daem-frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="icofont-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="widget widget-contact mb-5 mb-lg-0">
              <h4 className="text-capitalize mb-3">
                {t("footer-intouch-header")}
              </h4>
              <div className="divider mb-4"></div>

              <div className="footer-contact-block mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-email mr-3"></i>
                  <span className="h6 mb-0">{t("footer-intouch-body")}</span>
                </div>
                <h5 className="mt-2">
                  <a href="#">daem@gmail.com</a>
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-btm py-4 mt-5">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6">
              <div className="copyright">
                &copy; Copyright Reserved to{" "}
                <span className="text-color"> </span> by{" "}
                <a href="https://www.iti.gov.eg/" target="_blank">
                  ITI Students
                </a>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <a className="backtop js-scroll-trigger" href="#top">
                <i className="icofont-long-arrow-up"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
