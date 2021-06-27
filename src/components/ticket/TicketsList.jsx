import React, { useState, useEffect } from "react";
import TicketCard from "./TicketCard";

import { DoctorsProvider } from "../../contexts/doctorsContext";
import { getAllDoctors } from "../../services/doctorsService";

export default function TicketList({ tickets, onRemoveTicket }) {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    const _doctors = await getAllDoctors();
    setDoctors(_doctors.data.data);
  };

  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <>
      <DoctorsProvider value={doctors}>
        {tickets.map((ticket) => {
          return (
            <>
              <TicketCard key={ticket._id} ticket={ticket} />
            </>
          );
        })}
      </DoctorsProvider>
    </>
  );
}
