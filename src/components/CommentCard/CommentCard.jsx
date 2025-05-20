const CommentCard = ({ comment }) => {
  return (
    <div>
      <div>{comment.author}</div>
      <p>{comment.body}</p>
      <div>{comment.votes}</div>
    </div>
  );
};
export default CommentCard;
