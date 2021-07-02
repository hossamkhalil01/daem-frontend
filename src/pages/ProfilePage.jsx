import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import UserProfile from "../components/UserProfile";
import PageHeaders from "../components/PageHeaders";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeaders pageTitle={t("profile")} />
      <Navbar />
      <div className="mb-5">
        <UserProfile />
      </div>
      <Footer />
    </>
  );
}
