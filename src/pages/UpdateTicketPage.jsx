import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import TicketForm from "../components/ticket/TicketForm";
import PageHeaders from "../components/PageHeaders";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
      <Navbar />
      <TicketForm ticket={ticket} onCreation={handleTicketCreation} />
      <Footer />
    </>
  );
}
