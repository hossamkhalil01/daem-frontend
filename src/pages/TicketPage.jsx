import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Loading from "../components/Loading";
import MedicalRecord from "../components/MedicalRecord";
import TicketDetails from "../components/ticket/TicketDetails";
import TicketComments from "../components/TicketComments";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { getTicket } from "../services/ticketsService";

export default function TicketPage() {
  const { currentUser } = useCurrentUser();
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);

  const getTicketDetails = async () => {
    const _ticket = await getTicket(id);
    setTicket(_ticket.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getTicketDetails();
  }, [id]);

  return (
    <>
      <Navbar />
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
            <TicketComments ticketId={ticket._id} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
