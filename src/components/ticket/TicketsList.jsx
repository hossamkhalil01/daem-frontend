import React, { useState, useEffect } from "react";
import TicketCard from "./TicketCard";

import { DoctorsProvider } from "../../contexts/doctorsContext";
import { getAllDoctors } from "../../services/doctorsService";

export default function TicketList({ tickets }) {
  const [ticketsList, setTicketsList] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    const _doctors = await getAllDoctors();
    setDoctors(_doctors.data.data);
  };

  const removeTicket = (ticketId) => {
    const newTickets = [...ticketsList];
    const removeIndex = newTickets
      .map((ticket) => ticket._id)
      .indexOf(ticketId);
    newTickets.splice(removeIndex, 1);
    setTicketsList(newTickets);
  };

  useEffect(() => {
    setTicketsList(tickets);
    getDoctors();
  }, []);
  return (
    <>
      <DoctorsProvider value={doctors}>
        {ticketsList.map((ticket) => {
          return (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              removeTicketFromList={removeTicket}
            />
          );
        })}
      </DoctorsProvider>
    </>
  );
}
