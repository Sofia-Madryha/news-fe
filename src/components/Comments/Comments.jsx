import { useEffect, useState } from "react";
import { fetchComments } from "../../api/api";
import { CommentCard } from "../CommentCard";
import { CommentForm } from "../CommentForm";
import { useFetchData } from "../../hooks";

import styles from "./Comments.module.css"

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);

  const { data, isLoading } = useFetchData(fetchComments, null, articleId);

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data]);

// TODO: CommentForm is visible only for logged-in user 

  return (
    <>
      {!isLoading && comments && comments.length > 0 ? (

          <section className={styles.comments}>
            <h4>Comments:</h4>
            {comments.map((comment) => (
              <CommentCard
                comment={comment}
                key={comment.comment_id}
                setComments={setComments}
              />
            ))}
            <CommentForm articleId={articleId} setComments={setComments} />
          </section>
      ) : null}
    </>
  );
};

export default Comments;
