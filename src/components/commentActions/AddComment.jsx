import { useState } from "react";
import { addComment } from "../../services/commentsService";
import { getUser } from "../../services/authService";

export const AddComments = ({ ticketId = "60d5ea70180efb2719f2d412" }) => {
  const [comment, updateComment] = useState("");
  const [error, setError] = useState("");
  const handleCommentSubmit = async () => {
    if (comment === "") return setError("you can't add empty comment ");
    try {
      await addComment(ticketId, {
        body: comment,
        author: getUser()?._id,
        ticket: ticketId,
      });
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
    <div className="row align-baseline">
      <div className="col-md-10">
        <textarea
          onBlur={() => upadteInputStates()}
          value={comment}
          onChange={(e) => updateComment(e.target.value)}
          className="form-control"
        ></textarea>
      </div>
      <div className="col-md-2">
        <button
          onClick={() => handleCommentSubmit()}
          className="btn btn-success"
        >
          Add
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
