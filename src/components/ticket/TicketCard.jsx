import { useTranslation } from "react-i18next";
import "../../styles/TicketCard.css";
import AssignDoctor from "./ticketActions/AssignDoctor";
import CheckTicket from "./ticketActions/CheckTicket";
import DeleteTicket from "./ticketActions/DeleteTicket";
import SetUrgency from "./ticketActions/SetUrgency";

export default function TicketCard({ ticket }) {
  const { t } = useTranslation();
  const doctors = [
    {
      _id: "60ca3d8f4589492a190e1bba",
      title: "The Shawshank Redemption",
      year: 1994,
    },
    { _id: "60ca3d8f4589492a190e1bba", title: "The Godfather", year: 1972 },
  ];

  const formatDate = (date) =>
    date.toLocaleString(t("language"), {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="ticket-card">
      <h4>{ticket.subject}</h4>
      <div className="ticket__header">
        <p>
          <span>{t(ticket.gender) + " , "}</span>
          <span>{ticket.age + " " + t("year")}</span>
        </p>
        <p>{formatDate(ticket.createdAt)}</p>
      </div>
      <div className="ticket__body">
        <p>{ticket.description}</p>
      </div>
      <hr />
      <div className="ticket__footer">
        <AssignDoctor
          ticketId={ticket._id}
          doctors={doctors}
          ticketDoctor={ticket.doctor}
        />{" "}
        <SetUrgency ticketId={ticket._id} ticketUrgency={ticket.urgency} />{" "}
        <DeleteTicket ticketId="" />
        <CheckTicket ticketId={ticket._id} isChecked={ticket.isChecked} />
      </div>
    </div>
  );
}