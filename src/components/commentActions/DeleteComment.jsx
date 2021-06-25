import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as Button } from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { deleteComment } from "../../services/commentsService";
import "../../styles/Comment.css";

export default function DeleteComment({ comment, removeCommentFromList }) {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const handleSure = () => {
    deleteComment(comment._id);
    removeCommentFromList(comment._id);
    setOpenModal(false);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={faTrash}
        onClick={handleClickOpen}
        className="comment__action delete-comment"
      ></FontAwesomeIcon>
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
    </div>
  );
}
