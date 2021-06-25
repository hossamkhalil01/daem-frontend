import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateComment } from "../../services/commentsService";

export default function EditComment({ commentBody , commentId ,setEditMode, setCommentBody}) {
    const [commentText , setCommentText] = useState(commentBody);
    const { t } = useTranslation();

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
        {t("submit")}
      </button>
    </form>
  );
}
