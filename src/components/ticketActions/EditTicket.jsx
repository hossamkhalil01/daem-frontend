import { default as PrimeButton } from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

export default function EditTicket({ ticketId }) {
  const { t } = useTranslation();
  const history = useHistory();

  const handleClick = () => history.push(`/tickets/${ticketId}/edit`);
  return (
    <>
      <PrimeButton onClick={handleClick} variant="contained" color="primary">
        {t("edit")}
      </PrimeButton>
    </>
  );
}
