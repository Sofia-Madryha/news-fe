import { useState } from "react";
import { postComment } from "../../api/api";
import { toast } from "react-toastify";

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
        <form onSubmit={handlePostComment}>
          <input
            placeholder="add a comment..."
            name="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            required
          />
          <button type="submit">post</button>
        </form>
      )}
    </>
  );
};

export default CommentForm;
