import Button from "@material-ui/core/Button";
import React from "react";
import { useTranslation } from "react-i18next";
export default function LoadMore({onLoadMore,page}) {
  const handleLoadMore = () => {
    onLoadMore(page+1);
  };
  const {t} = useTranslation();
  return (
    <div className="load-more">
    <Button  onClick={handleLoadMore} variant="contained">
      {t("load-more")}
    </Button>
    </div>
  );
}
