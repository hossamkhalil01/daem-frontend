import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import MedicalRecord from "../components/MedicalRecord";
import PageHeaders from "../components/PageHeaders";
import TicketDetails from "../components/ticket/TicketDetails";
import TicketComments from "../components/TicketComments";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { getTicket } from "../services/ticketsService";

export default function TicketPage() {
  const history = useHistory();
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);

  const getTicketDetails = async () => {
    try {
      const _ticket = await getTicket(id);
      setTicket(_ticket.data.data);
      setLoading(false);
    } catch (err) {
      if (err.response.status === 500) history.push("/server-error");
      history.push("/notFound");
    }
  };

  useEffect(() => {
    getTicketDetails();
  }, [id]);

  return (
    <>
      <PageHeaders pageTitle={t("ticket-details")} />
      {loading ? (
        <Loading />
      ) : (
        <div className="ticket-page">
          <div className="ticket-container">
            <TicketDetails ticket={ticket} />
            {currentUser.role === "doctor" ? (
              <MedicalRecord userId={ticket.patient.id} />
            ) : (
              " "
            )}
            <TicketComments ticketId={ticket._id} ticketState={ticket.state} />
          </div>
        </div>
      )}
    </>
  );
}
