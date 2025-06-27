import { useEffect, useState } from "react";

import { Comment } from "@/types";
import { CommentCard, CommentForm } from "@/components";
import { useUserStore } from "@/store";

import { CommentsProps } from "./Comments.types";

import styles from "./Comments.module.scss";

const Comments = ({ commentsData, isLoading, articleId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const { user } = useUserStore();

  useEffect(() => {
    setComments(commentsData);
  }, [commentsData]);

  return (
    <>
      {!isLoading && comments && comments.length > 0 ? (
        <section className={styles.comments} id="comments">
          <div className={styles.comments_wrapper}>
            <h4>Comments:</h4>
            {user ? (
              <CommentForm articleId={articleId} setComments={setComments} />
            ) : null}
            {comments.map((comment) => (
              <CommentCard
                comment={comment}
                key={comment.comment_id}
                setComments={setComments}
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Comments;
