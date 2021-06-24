import { useEffect, useState } from "react";
import CommentCard from "../components/CommentCard";
import { getComments } from "../services/commentsService";
export default function TicketComments({ ticketId }) {
  const [comments, setComments] = useState([]);
  const getTicketComments = async () => {
    const _comments = await getComments(ticketId);
    setComments(_comments.data.data);
  };
  
  useEffect(() => {
    getTicketComments();
  },[]);

  const removeComment = (commentId) => {
    const newComments = [...comments];
    const removeIndex = newComments
      .map((comment) => comment._id)
      .indexOf(commentId);
    setComments(newComments.splice(removeIndex+1, 1));
    console.log(comments);
  };

  return (
    <>
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          removeCommentFromList={removeComment}
          comment={comment}
        />))
      }
    </>
  );
}
