import { getUser } from "../../services/authService";
import AssignDoctor from "./AssignDoctor";
import CheckTicket from "./CheckTicket";
import DeleteTicket from "./DeleteTicket";
import EditTicket from "./EditTicket";
import SetUrgency from "./SetUrgency";

export default function TicketActions({ ticket }) {
  const user = getUser();

  if (user.role === "doctor") {
    return (
      <>
        <SetUrgency ticketId={ticket._id} ticketUrgency={ticket.urgency} />
        <AssignDoctor ticketId={ticket._id} ticketDoctor={ticket.doctor} />
      </>
    );
  } else if (user.role === "moderator") {
    return (
      <>
        <SetUrgency ticketId={ticket._id} ticketUrgency={ticket.urgency} />
        <AssignDoctor ticketId={ticket._id} ticketDoctor={ticket.doctor} />
        <DeleteTicket ticketId={ticket._id} />
        <CheckTicket ticketId={ticket._id} isChecked={ticket.isChecked} />
      </>
    );
  } else if (user._id === ticket.patient._id && ticket.state === "unresolved") {
    return (
      <>
        <EditTicket ticketId={ticket._id} />
        <DeleteTicket ticketId={ticket._id} />
      </>
    );
  } else {
    return <></>;
  }
}
