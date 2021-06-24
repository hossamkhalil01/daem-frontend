import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as Button } from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getUser } from "../services/authService";
import "../styles/Comment.css";
import EditComment from "./EditComment";

export default function Comment({ comment ,removeCommentFromList}) {
  const [editMode, setEditMode] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.body);
  
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const enterEditMode = () => {
    setEditMode(true);
  };
  const handleClickOpen = () => {
    setOpenModal(true);
  };
  const handleSure = (event) => {
    // deleteComment(comment._id);
    removeCommentFromList(comment._id);
    setOpenModal(false);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  const isAuthor = () => JSON.parse(getUser())._id === comment.author._id;

  return (
    <div className="comment d-flex">
      <div className="flex-shrink-0">
        <div className="avatar avatar-sm rounded-circle">
          <img
            className="avatar-img"
            src={"http://localhost:8000/public/images/" + comment.author.avatar}
            alt=""
          />
        </div>
      </div>
      <div className="flex-shrink-1 ms-sm-3">
        <div className="comment-meta d-flex">
          <p className="me-2 comment__doctor-name">
            {comment.author.firstname + " " + comment.author.lastname}
          </p>
        </div>
        {editMode ? (
          <EditComment
            commentBody={commentBody}
            commentId={comment._id}
            setEditMode={setEditMode}
            setCommentBody={setCommentBody}
          />
        ) : (
          <div>
            <div className="comment-body">{commentBody}</div>
            <span className="text-muted comment__time">
              {moment(comment.createdAt, "YYYY-MM-DDTh:mm:ss").fromNow()}
            </span>
            {isAuthor() ? (
              <div className="comment-actions">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={enterEditMode}
                  className="comment__action"
                ></FontAwesomeIcon>{" "}
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={handleClickOpen}
                  className="comment__action"
                ></FontAwesomeIcon>
                <Dialog
                  open={openModal}
                  onClose={handleCancel}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  disableBackdropClick
                >
                  <DialogTitle id="alert-dialog-title">
                    {t("confirmation")}
                  </DialogTitle>
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
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}
