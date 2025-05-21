import { useEffect, useState } from "react";
import { fetchComments } from "../../api/api";
import { CommentCard } from "../CommentCard";
import { CommentForm } from "../CommentForm";

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(articleId).then((result) => {
      setComments(result.reverse());
    });
  }, []);

  

  return (
    <div>
      <h4>Comments:</h4>
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment.comment_id} />
      ))}
      <CommentForm articleId={articleId} setComments={setComments} />
    </div>
  );
};

export default Comments;
