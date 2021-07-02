import { default as PrimeButton } from "@material-ui/core/Button";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { UpdateTicketsListContext } from "../../contexts/updateTicketsListContext";
import { deleteTicket } from "../../services/ticketsService";
import ConfirmationModal from "../ConfirmationModal";

export default function DeleteTicket({ ticketId }) {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const updated = useContext(UpdateTicketsListContext);
  const history = useHistory();
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const confirmDeletion = async () => {
    await deleteTicket(ticketId);
    setOpenModal(false);
    history.push("/tickets");
    updated.setUpdate(!updated.update);
  };
  return (
    <>
      <PrimeButton
        onClick={handleClickOpen}
        variant="contained"
        color="secondary"
      >
        {t("delete")}
      </PrimeButton>

      <ConfirmationModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        confirm={confirmDeletion}
      />
    </>
  );
}
