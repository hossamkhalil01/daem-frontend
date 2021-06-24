import React from "react";
import TicketForm from "../components/ticket/TicketForm";

const LandingPage = (props) => {
  const ticket = {
    _id: "60d4c8a7888f98b220f8af10",
    images: [
      "public/images/tickets/60d21a871ccce47898a5d0b8/1624557735224-daem-img_20171220_213941_646.jpg",
      "public/images/tickets/60d21a871ccce47898a5d0b8/1624557735227-daem-screenshot-from-2021-06-02-22-50-56.png",
      "public/images/tickets/60d21a871ccce47898a5d0b8/1624557735229-daem-screenshot-from-2021-06-06-20-08-26.png",
    ],
    state: "unresolved",
    doctor: null,
    isChecked: false,
    subject: "ticket subject",
    description: "ticket description",
    patient: "60d21a871ccce47898a5d0b8",
  };
  return (
    <>
      <h3> Landing Page </h3>
      <TicketForm ticket={ticket} />
    </>
  );
};

export default LandingPage;
