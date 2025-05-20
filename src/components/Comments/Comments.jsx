import { useEffect, useState } from "react";
import { fetchComments } from "../../api/fetchData";
import CommentCard from "../CommentCard/CommentCard";

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(articleId).then((result) => {
      setComments(result);
    });
  }, []);

  return (
    <div>
      <h4>Comments:</h4>
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment.comment_id} />
      ))}
    </div>
  );
};

export default Comments;
