import {
  default as Button,
  default as PrimeButton
} from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { deleteTicket } from "../../../services/ticketsService";

export default function DeleteTicket({ ticketId }) {
  const [openModal, setOpenModal] = useState(false);

  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleSure = async (event) => {
    await deleteTicket(ticketId);
    setOpenModal(false);
  };
  const handleCancel = () => {
    setOpenModal(false);
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
      
      <Dialog
        open={openModal}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
      >
        <DialogTitle id="alert-dialog-title">{t("confirmation")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("delete-confirmation")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSure} color="primary">
            {t("sure")}
          </Button>
          <Button onClick={handleCancel} color="primary" autoFocus>
            {t("cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
