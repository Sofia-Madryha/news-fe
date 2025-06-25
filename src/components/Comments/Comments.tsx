import { useEffect, useState } from "react";

import { Comment } from "@/types";

import { CommentCard, CommentForm } from "@/components";

import { CommentsProps } from "./Comments.types";

import styles from "./Comments.module.scss";

const Comments = ({ commentsData, isLoading, articleId }: CommentsProps) => {
  // TODO: CommentForm is visible only for logged-in userf

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    setComments(commentsData);
  }, [commentsData]);

  return (
    <>
      {!isLoading && comments && comments.length > 0 ? (
        <section className={styles.comments} id="comments">
          <div className={styles.comments_wrapper}>
            <h4>Comments:</h4>
            {comments.map((comment) => (
              <CommentCard
                comment={comment}
                key={comment.comment_id}
                setComments={setComments}
              />
            ))}
            <CommentForm articleId={articleId} setComments={setComments} />
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Comments;
