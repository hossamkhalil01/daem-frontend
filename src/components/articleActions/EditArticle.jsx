import { default as PrimeButton } from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

export default function EditArticle({ article }) {
  const { t } = useTranslation();
  const history = useHistory();

  const handleClick = () =>
    history.push({
      pathname: `/articles/${article._id}/edit`,
      state: { article: article },
    });
  return (
    <>
      <PrimeButton onClick={handleClick} variant="contained" color="primary">
        {t("edit")}
      </PrimeButton>
    </>
  );
}
