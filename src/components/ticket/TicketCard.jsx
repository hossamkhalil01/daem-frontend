import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { formatDate, getAge } from "../../services/dateService";
import TicketActions from './ticketActions/Tic";';

export default function TicketCard({ ticket }) {
  const { t } = useTranslation();
  const handleTicketRedirection = () => history.push(`/ticket/${ticket._id}`);
  const history = useHistory();
  return (
    <div className="ticket-card">
      <h4 onClick={handleTicketRedirection}>{ticket.subject}</h4>
      <div className="ticket__header">
        <p>
          <span>{t(ticket.patient.gender) + " , "}</span>
          <span>{getAge(ticket.patient.DOB) + " " + t("year")}</span>
        </p>
        <p>{formatDate(ticket.createdAt, t("language"))}</p>
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
