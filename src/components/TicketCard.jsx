import { useTranslation } from "react-i18next";
import "../styles/TicketCard.css";
import TicketActions from './ticketActions/Tic";';

export default function TicketCard({ ticket }) {
  const { t } = useTranslation();
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
          <span>{t(ticket.patient.gender) + " , "}</span>
          <span>{ticket.age + " " + t("year")}</span>
        </p>
        <p>{formatDate(ticket.createdAt)}</p>
      </div>
      <div className="ticket__body">
        <p>{ticket.description}</p>
      </div>
      <hr />
      <div className="ticket__footer">
        <TicketActions ticket={ticket} />
      </div>
    </div>
  );
}
