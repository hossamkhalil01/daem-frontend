import React from "react";
import { useTranslation } from "react-i18next";
import PageHeaders from "../components/PageHeaders";
import UserProfile from "../components/UserProfile";

export default function ProfilePage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeaders pageTitle={t("profile")} />
      <div className="mb-5">
        <UserProfile />
      </div>
    </>
  );
}
