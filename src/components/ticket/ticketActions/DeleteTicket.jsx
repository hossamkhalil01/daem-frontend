import PrimeButton from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";

export default function DeleteTicket({ ticketId }) {
  const { t } = useTranslation();
  return (
    <PrimeButton variant="contained" color="secondary">
      {t("delete")}
    </PrimeButton>
  );
}
