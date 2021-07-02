import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DoctorsProvider } from "../../contexts/doctorsContext";
import { formatDate, getAge } from "../../utils/formatDate";
import { getAllDoctors } from "../../services/doctorsService";
import Carousel from "../Carousel";
import TicketActions from "../ticketActions/TicketActions";

export default function TicketDetails({ ticket }) {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    const _doctors = await getAllDoctors();
    setDoctors(_doctors.data.data);
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
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
      {ticket.patient.diseases ? (
        <p className="chronic-diseases">
          {t("chronic-diseases")} : {ticket.patient.diseases}
        </p>
      ) : (
        ""
      )}
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
