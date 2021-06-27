import { default as PrimeButton } from "@material-ui/core/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { deleteTicket } from "../../services/ticketsService";
import ConfirmationModal from "../ConfirmationModal";
import { UpdateTicketsListContext } from "../../contexts/updateTicketsListContext";
import { useContext } from "react";

export default function DeleteTicket({ ticketId }) {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const updated = useContext(UpdateTicketsListContext);

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const confirmDeletion = async () => {
    await deleteTicket(ticketId);
    setOpenModal(false);
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
