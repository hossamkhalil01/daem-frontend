import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useState } from "react";
import { BASE_URL } from "../api/urls";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import DeleteComment from "./commentActions/DeleteComment";
import EditComment from "./commentActions/EditComment";

export default function Comment({ comment, removeCommentFromList }) {
  const { currentUser } = useCurrentUser();

  const [editMode, setEditMode] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.body);

  const enterEditMode = () => {
    setEditMode(true);
  };

  const isAuthor = () => currentUser._id === comment.author?._id;
  return (
    <div className="comment d-flex">
      <div className="flex-shrink-0">
        <div className="avatar avatar-sm rounded-circle">
          <img
            className="avatar-img"
            src={BASE_URL + "/" + comment.author?.avatar}
            alt=""
          />
        </div>
      </div>
      <div className="flex-shrink-1 ms-sm-3">
        <div className="comment-meta d-flex">
          <p className="me-2 comment__doctor-name">
            {comment.author.role === "doctor" ? "Dr. " : ""}
            {comment.author?.firstname + " " + comment.author?.lastname}
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
            <div className="d-flex">
              <p className="comment__body">{commentBody}</p>
            </div>
            <div className="comment__time">
              <span className="text-muted comment__time">
                {moment(moment.utc(comment.createdAt).toDate()).fromNow()}
              </span>
            </div>
            {isAuthor() ? (
              <div className="comment-actions">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={enterEditMode}
                  className="comment__action"
                ></FontAwesomeIcon>{" "}
                <DeleteComment
                  comment={comment}
                  removeCommentFromList={removeCommentFromList}
                />
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
