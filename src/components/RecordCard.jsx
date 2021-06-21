import { default as Button } from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { formatDate } from "../services/dateService";
import "../styles/RecordCard.css";

export default function RecordCard({ ticket }) {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleTicketRedirection = () => history.push(`/ticket/${ticket._id}`);

  return (
    <>
      <div onClick={handleClickOpen} className="record-card">
        <div className="record__header">
          {" "}
          <span>{ticket.subject} </span>{" "}
          <span className="record__date">{formatDate(ticket.createdAt, t("language"))}</span>
        </div>
        <div className="record__body">
          <p>{ticket.description}</p>
        </div>
      </div>
      <Dialog
        open={openModal}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ticket.subject}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ticket.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTicketRedirection} color="primary">
            {t("go-to-ticket")}
          </Button>
          <Button onClick={handleCancel} color="primary" autoFocus>
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
