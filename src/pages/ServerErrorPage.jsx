import { useTranslation } from "react-i18next";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import PageHeaders from "../components/PageHeaders";

export default function ServerError() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeaders pageTitle={t("server-error-title")} />

      <Navbar />
      <div className="container server-error-container">
        <h2>{t("server-error-label")}</h2>
        <img src="/assets/images/bg/server-error.png" alt="server-error" />
      </div>
      <Footer />
    </>
  );
}
