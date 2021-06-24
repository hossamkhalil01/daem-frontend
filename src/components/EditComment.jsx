import { useState } from "react";
import { updateComment } from "../services/commentsService";
import "../styles/Comment.css";
export default function EditComment({ commentBody , commentId ,setEditMode, setCommentBody}) {
    const [commentText , setCommentText] = useState(commentBody);

  const editCommentHandler = () => {
      updateComment(commentId,{body: commentText});
      setCommentBody(commentText);
      setEditMode(false);
  };

  const handleChange = (event)=>{
    setCommentText(event.target.value);
  }
  return (
    <form className="post-edit" onSubmit={editCommentHandler}>
      <textarea onChange={handleChange} className="comment__textarea" value={commentText} required/>
      <br/>
      <button id="submit" type="submit" className="btn btn-success">
        submit
      </button>
    </form>
  );
}
