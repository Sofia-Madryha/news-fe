import { useState } from "react";
import { toast } from "react-toastify";

import { deleteComment } from "../../api/api";
import { DeleteIcon } from "../../assets/icons";

import styles from "./CommentCard.module.css";

const CommentCard = ({ comment, setComments }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDeleteComment = () => {
    setIsLoading(true);
    deleteComment(comment.comment_id)
      .then(() => {
        setComments((currentComments) =>
          currentComments.filter(
            (currentComment) => currentComment.comment_id !== comment.comment_id
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

  // TODO: deleteIcon is visible only for logged-in user 

  return (
    <div className={styles.comment_card}>
      <button
        onClick={handleDeleteComment}
        className={
          isLoading ? styles.comment_card_button_disabled : styles.comment_card_button
        }
        disabled={isLoading}
      >
        <DeleteIcon />
      </button>

      <div className={styles.comment_card_author}>{comment.author}</div>
      <p className={styles.comment_card_body}>{comment.body}</p>
      <div className={styles.comment_card_votes}>{comment.votes}</div>
    </div>
  );
};
export default CommentCard;
