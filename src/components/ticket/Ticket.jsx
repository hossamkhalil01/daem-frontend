import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { DoctorsProvider } from "../../contexts/doctorsContext";
import { formatDate, getAge } from "../../services/dateService";
import { getAllDoctors } from "../../services/doctorsService";
import { getTicket } from "../../services/ticketsService";
import "../../styles/Ticket.css";
import Carousel from "../Carousel";
import Loading from "../Loading";
import TicketActions from "../ticketActions/TicketActions";

export default function Ticket() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  const getTicketDetails = async () => {
    const _ticket = await getTicket(id);
    setTicket(_ticket.data.data);
    setLoading(false);
  };
  const getDoctors = async () => {
    const _doctors = await getAllDoctors();
    setDoctors(_doctors.data.data);
  };

  useEffect(() => {
    getTicketDetails();
    getDoctors();
  }, [id]);

  return loading ? (
    <Loading/>
  ) : (
    <div className="ticket">
      <h2>{ticket.subject}</h2>
      <div className="ticket__details">
        <p>
          <span>{t(ticket.patient.gender) + " , "}</span>
          <span>{getAge(ticket.patient.DOB) + " " + t("year")}</span>
        </p>
        <p>{formatDate(ticket.createdAt, t("language"))}</p>
      </div>
      <div className="ticket__description">
        <p>{ticket.description}</p>
      </div>
      {ticket.images.length ? (
        <div className="ticket-carousel">
          <Carousel images={ticket.images} />
        </div>
      ) : (
        ""
      )}
      <hr />
      <DoctorsProvider value={doctors}>
        <div className="ticket__actions">
          <TicketActions ticket={ticket} />
        </div>
      </DoctorsProvider>
    </div>
  );
}
