import { default as PrimeButton } from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

export default function EditTicket({ ticket }) {
  const { t } = useTranslation();
  const history = useHistory();

  const handleClick = () =>
    history.push({
      pathname: `/tickets/${ticket._id}/edit`,
      state: { ticket: ticket },
    });
  return (
    <>
      <PrimeButton onClick={handleClick} variant="contained" color="primary">
        {t("edit")}
      </PrimeButton>
    </>
  );
}
