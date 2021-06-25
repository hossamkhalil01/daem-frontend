import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useState } from "react";
import { getUser } from "../services/authService";
import "../styles/Comment.css";
import DeleteComment from "./commentActions/DeleteComment";
import EditComment from "./commentActions/EditComment";

export default function Comment({ comment, removeCommentFromList }) {
  const [editMode, setEditMode] = useState(false);
  const [commentBody, setCommentBody] = useState(comment.body);

  const enterEditMode = () => {
    setEditMode(true);
  };

  const isAuthor = () => getUser()._id === comment.author._id;

  return (
    <div className="comment d-flex">
      <div className="flex-shrink-0">
        <div className="avatar avatar-sm rounded-circle">
          <img
            className="avatar-img"
            src={"http://localhost:8000/" + comment.author.avatar}
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
