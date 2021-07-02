import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import PageHeaders from "../components/PageHeaders";
import TicketForm from "../components/ticket/TicketForm";

export default function UpdateTicketPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const handleTicketCreation = (ticket) => {
    history.push(`/tickets/${ticket._id}`);
  };
  const location = useLocation();

  if (location.state === undefined) {
    history.push("/tickets/");
  }
  const ticket = location.state?.ticket;
  return (
    <>
      <PageHeaders pageTitle={t("edit-ticket")} />
      <TicketForm ticket={ticket} onCreation={handleTicketCreation} />
    </>
  );
}
