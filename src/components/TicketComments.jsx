import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CommentCard from "../components/CommentCard";
import { getComments } from "../services/commentsService";
import AddComment from "./commentActions/AddComment";
import LoadMore from "./LoadMore";

export default function TicketComments({ ticketId, ticketState }) {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [comments, setComments] = useState([]);
  const isLastPage = () => pagination.page === pagination.totalPages;

  const onLoadMore = (newPage) => {
    getTicketComments(newPage);
  };

  const getTicketComments = async (newPage) => {
    const params = { page: newPage, limit: 3 };
    const _comments = await getComments(ticketId, params);
    setPagination({
      page: _comments.data.data.page,
      totalPages: _comments.data.data.totalPages,
    });
    const newComments = [...comments, ..._comments.data.data.docs];
    newComments.filter(
      (comment, index) => index === newComments.indexOf(comment)
    );
    setComments(newComments);
  };

  useEffect(() => {
    getTicketComments();
  }, []);

  const removeComment = (commentId) => {
    const newComments = [...comments];
    const removeIndex = newComments
      .map((comment) => comment._id)
      .indexOf(commentId);
    newComments.splice(removeIndex, 1);
    setComments(newComments);
  };

  const addComment = (comment) => {
    const newComments = [comment,...comments, ];
    setComments(newComments);
  };

  return (
    <>
      <div className="ticket-comments">
        <h3>{t("comments")}</h3>
        {comments.map((comment) => (
          <CommentCard
            key={comment._id}
            removeCommentFromList={removeComment}
            comment={comment}
          />
        ))}
        {!isLastPage() ? (
          <LoadMore page={pagination.page} onLoadMore={onLoadMore} />
        ) : (
          ""
        )}
        {ticketState === "unresolved" ? (
          <AddComment addCommentToList={addComment} ticketId={ticketId} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
