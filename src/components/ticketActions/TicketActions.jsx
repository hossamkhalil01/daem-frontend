import AssignDoctor from "./AssignDoctor";
import CheckTicket from "./CheckTicket";
import DeleteTicket from "./DeleteTicket";
import EditTicket from "./EditTicket";
import SetUrgency from "./SetUrgency";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

export default function TicketActions({ ticket }) {
  const { currentUser } = useCurrentUser();

  if (currentUser.role === "doctor") {
    return (
      <>
        <SetUrgency ticketId={ticket._id} ticketUrgency={ticket.urgency} />
        <AssignDoctor ticketId={ticket._id} ticketDoctor={ticket.doctor} />
      </>
    );
  } else if (currentUser.role === "moderator") {
    return (
      <>
        <SetUrgency ticketId={ticket._id} ticketUrgency={ticket.urgency} />
        <AssignDoctor ticketId={ticket._id} ticketDoctor={ticket.doctor} />
        <DeleteTicket ticketId={ticket._id} />
        <CheckTicket ticketId={ticket._id} isChecked={ticket.isChecked} />
      </>
    );
  } else if (
    currentUser._id === ticket.patient._id &&
    ticket.state === "unresolved"
  ) {
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
