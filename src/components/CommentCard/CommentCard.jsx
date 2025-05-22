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

  return (
    <div>
      <button
        onClick={handleDeleteComment}
        className={
          isLoading ? styles.comment_button_disabled : styles.comment_button
        }
        disabled={isLoading}
      >
        <DeleteIcon />
      </button>

      <div>{comment.author}</div>
      <p>{comment.body}</p>
      <div>{comment.votes}</div>
    </div>
  );
};
export default CommentCard;
