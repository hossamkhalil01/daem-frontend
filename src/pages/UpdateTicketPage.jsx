import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import TicketForm from "../components/ticket/TicketForm";
import { useHistory, useLocation } from "react-router-dom";

export default function UpdateTicketPage() {
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
      <Navbar />
      <TicketForm ticket={ticket} onCreation={handleTicketCreation} />
      <Footer />
    </>
  );
}
