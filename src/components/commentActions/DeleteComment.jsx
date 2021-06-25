import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { deleteComment } from "../../services/commentsService";
import ConfirmationModal from "../ConfirmationModal";
export default function DeleteComment({ comment, removeCommentFromList }) {
  const [openModal, setOpenModal] = useState(false);

  const confirmDeletion = () => {
    deleteComment(comment._id);
    removeCommentFromList(comment._id);
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
      <ConfirmationModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        confirm={confirmDeletion}
      />
    </div>
  );
}
