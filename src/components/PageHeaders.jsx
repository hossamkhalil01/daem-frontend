import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
const PageHeaders = ({ pageTitle }) => {
  const { t } = useTranslation();
  return (
    <Helmet>
      <title>{t("project-title") + " | " + pageTitle || ""} </title>
    </Helmet>
  );
};

export default PageHeaders;
