import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
const PageHeaders = ({ pageTitle }) => {
  const { t } = useTranslation();
  const title = pageTitle ? pageTitle : "";
  return (
    <Helmet>
      <title>{t("project-title") + " | " + title} </title>
    </Helmet>
  );
};

export default PageHeaders;
