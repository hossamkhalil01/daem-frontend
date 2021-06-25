import "../../styles/TicketActions.css";
import AssignDoctor from "./AssignDoctor";
import CheckTicket from "./CheckTicket";
import DeleteTicket from "./DeleteTicket";
import EditTicket from "./EditTicket";
import SetUrgency from "./SetUrgency";
export default function TicketActions({ ticket }) {
  return (
    <>
      <SetUrgency ticketId={ticket._id} ticketUrgency={ticket.urgency} />{" "}
      <AssignDoctor  ticketId={ticket._id} ticketDoctor={ticket.doctor} />
      <EditTicket ticketId={ticket._id} />
      <DeleteTicket ticketId={ticket._id} />
      <CheckTicket ticketId={ticket._id} isChecked={ticket.isChecked} />

    </>
  );
}
