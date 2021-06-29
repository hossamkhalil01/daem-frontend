import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import TicketForm from "../components/ticket/TicketForm";
import { useHistory } from "react-router-dom";

export default function NewTicketPage() {
  const history = useHistory();
  const handleTicketCreation = (ticket) => {
    history.push(`/tickets/${ticket._id}`);
  };
  return (
    <>
      <Navbar />
      <TicketForm onCreation={handleTicketCreation} />
      <Footer />
    </>
  );
}
