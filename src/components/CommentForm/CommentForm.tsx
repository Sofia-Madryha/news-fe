import { useState } from "react";
import { postComment } from "../../api/api";
import { toast } from "react-toastify";

import styles from "./CommentForm.module.css";

const CommentForm = ({ articleId, setComments }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePostComment = (e) => {
    e.preventDefault();

    // TODO: change to user context

    const formData = {
      username: "grumpy19",
      body: comment,
    };

    setIsLoading(true);
    postComment(articleId, formData)
      .then((result) => {
        setComments((currentComments) => {
          return [...currentComments, result];
        });

        setComment("");
      })
      .catch(() => {
        toast.error("Something went wrong! Try again!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form className={styles.comment_form} onSubmit={handlePostComment}>
          <input
            placeholder="add a comment..."
            name="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            required
            className={styles.comment_input}
          />
          <button type="submit" className={styles.comment_button}>
            post
          </button>
        </form>
      )}
    </>
  );
};

export default CommentForm;
