import { useTranslation } from "react-i18next";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div className="container notfound-container">
        <h2>{t("page-not-found")}</h2>
        <img src="/assets/images/bg/404.png" alt="Not found" />
      </div>
      <Footer />
    </>
  );
}
