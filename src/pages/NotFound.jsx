import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import PageHeaders from "../components/PageHeaders";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeaders pageTitle={t("page-not-found")} />
      <div className="container notfound-container mb-5 mt-5">
        <h2>{t("page-not-found")}</h2>
        <img src="/assets/images/bg/404.png" alt="Not found" />
        <NavLink
          to="/"
          className="btn btn-main text-light btn-lg btn-round-full  mt-5"
        >
          {" "}
          {t("back-to-home")}
          <i className="icofont-simple-left ml-2"></i>
        </NavLink>
      </div>

    </>
  );
}
