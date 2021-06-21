import { useTranslation } from "react-i18next";
import { formatDate, getAge } from "../services/dateService";
import "../styles/TicketCard.css";
import TicketActions from './ticketActions/Tic";';

export default function TicketCard({ ticket }) {
  const { t } = useTranslation();

  return (
    <div className="ticket-card">
      <h4>{ticket.subject}</h4>
      <div className="ticket__header">
        <p>
          <span>{t(ticket.patient.gender) + " , "}</span>
          <span>{getAge(ticket.patient.DOB) + " " + t("year")}</span>
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
