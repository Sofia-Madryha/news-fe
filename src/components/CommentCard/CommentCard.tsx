import { useState } from "react";
import { toast } from "react-toastify";

import { deleteComment } from "@/api";
import { DeleteIcon } from "@/assets";
import { Comment } from "@/types";
import { useUserStore } from "@/store";

import { CommentCardProps } from "./CommentCard.types";

import styles from "./CommentCard.module.scss";
import { useVoteComment } from "@/hooks";

const CommentCard = ({ comment, setComments }: CommentCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const commentId = comment.comment_id;

  const initialVotes = comment.votes;

  const { votes, voteUp, voteDown, canVote } = useVoteComment(
    commentId,
    initialVotes
  );

  const { user } = useUserStore();

  const handleDeleteComment = () => {
    if (isLoading) return;
    setIsLoading(true);

    deleteComment(commentId)
      .then(() => {
        setComments((currentComments: Comment[]) =>
          currentComments.filter(
            (currentComment) => currentComment.comment_id !== commentId
          )
        );
      })
      .catch(() => {
        toast.error("Something went wrong! Try again!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.comment_card}>
      {user && comment.author === user.username ? (
        <button
          onClick={handleDeleteComment}
          className={`${styles.comment_card_button} ${
            isLoading
              ? styles.comment_card_button_disabled
              : styles.comment_card_button
          }
         `}
          disabled={isLoading}
        >
          <DeleteIcon />
        </button>
      ) : null}

      <div className={styles.comment_card_author}>{comment.author}</div>
      <p className={styles.comment_card_body}>{comment.body}</p>
      <div className={styles.comment_card_votes}>
        {user ? (
          <button onClick={voteDown} disabled={!canVote}>
            -
          </button>
        ) : null}
        {votes}
        {user ? (
          <button onClick={voteUp} disabled={!canVote}>
            +
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default CommentCard;
