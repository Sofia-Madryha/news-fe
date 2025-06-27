import { useState } from "react";
import { postComment } from "../../api/api";
import { toast } from "react-toastify";

import { CommentFormProps } from "./CommentForm.types";

import styles from "./CommentForm.module.scss";

import { useUserStore } from "@/store";
import { Loader } from "../Loader";

const CommentForm = ({ articleId, setComments }: CommentFormProps) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUserStore();

  const handlePostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      username: user?.username || "",
      body: comment,
    };

    setIsLoading(true);
    postComment(articleId, formData)
      .then((result) => {
        setComments((currentComments) => {
          return [result, ...currentComments];
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
        <div className={styles.comment_form}>Loading...</div>
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
