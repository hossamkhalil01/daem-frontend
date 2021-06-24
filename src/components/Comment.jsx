import moment from "moment";
import React from "react";
import "../styles/Comment.css";

export default function Comment({ comment }) {
  return (
    <div class="comment d-flex">
      <div class="flex-shrink-0">
        <div class="avatar avatar-sm rounded-circle">
          <img
            class="avatar-img"
            src={"http://localhost:8000/public/images/" + comment.author.avatar}
            alt=""
          />
        </div>
      </div>
      <div class="flex-shrink-1 ms-2 ms-sm-3">
        <div class="comment-meta d-flex">
          <p class="me-2 comment__doctor-name">
            {comment.author.firstname + " " + comment.author.lastname}
          </p>
        </div>
        <div class="comment-body">{comment.body}</div>
        <span class="text-muted comment__time">
          { moment(comment.createdAt, "YYYY-MM-DDTh:mm:ss").fromNow()}
        </span>
      </div>
    </div>
  );
}
