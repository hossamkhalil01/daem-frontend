import React from "react";
import TicketForm from "../components/ticket/TicketForm";
import PageHeaders from "../components/PageHeaders";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function NewTicketPage() {
  const { t } = useTranslation();
  const history = useHistory();

  const handleTicketCreation = (ticket) => {
    history.push(`/tickets/${ticket._id}`);
  };
  return (
    <>
      <PageHeaders pageTitle={t("new-ticket")} />
      <TicketForm onCreation={handleTicketCreation} />
    </>
  );
}
