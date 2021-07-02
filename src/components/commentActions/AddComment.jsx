import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { addComment } from "../../services/commentsService";
export default function AddComment ({ ticketId ,addCommentToList}){
  const { currentUser } = useCurrentUser();
  const [comment, updateComment] = useState("");
  const [error, setError] = useState("");
  const {t} = useTranslation();
  const handleCommentSubmit = async () => {
    if (comment === "") return setError("you can't add empty comment ");
    try {
      const newComment = await addComment(ticketId, {
        body: comment,
        author: currentUser?._id,
        ticket: ticketId,
      });
      addCommentToList(newComment.data.data);
      updateComment("");
      setError("");
    } catch (error) {
      setError("something went wrong");
    }
  };

  const upadteInputStates = () => {
    setError("");
  };

  return (
    <div className="row align-baseline justify-content-center mb-4 mt-4">
      <div className="col-md-6">
        <textarea
          onBlur={() => upadteInputStates()}
          value={comment}
          onChange={(e) => updateComment(e.target.value)}
          className="form-control"
        ></textarea>
      </div>
      <div className="col-md-1">
        <button
          onClick={() => handleCommentSubmit()}
          className="btn btn-success"
        >
          {t("submit")}
        </button>
      </div>
      {error === "" ? (
        ""
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-9 alert alert-danger mt-3">{error}</div>
          <div className="col-md-2"></div>
        </div>
      )}
    </div>
  );
};
