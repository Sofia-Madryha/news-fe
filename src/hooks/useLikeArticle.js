import { useEffect, useState } from "react";
import { fetchArticleById, patchArticleVotes } from "../api/api";

// TODO: replace with React Context  after user logic is implemented

export const useLikeArticle = (articleId) => {
  let [likes, setLikes] = useState();
  const [isLike, setIsLike] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticleById(articleId).then(({ votes }) => {
      setLikes(votes);
    });
  }, [articleId]);

  const handleLikeArticle = (e) => {
    e.stopPropagation();
    if (!isLike) {
      setLikes((currentLikesCount) => currentLikesCount + 1);
      setIsLike(true);

      patchArticleVotes(articleId, { inc_votes: 1 }).catch(() => {
        setLikes((currentLikesCount) => currentLikesCount - 1);
        setIsLike(false);
        setError("Your like was not successful. Please try again!");
      });
    } else {
      setLikes((currentLikesCount) => currentLikesCount - 1);
      setIsLike(false);

      patchArticleVotes(articleId, { inc_votes: -1 }).catch(() => {
        setLikes((currentLikesCount) => currentLikesCount + 1);
        setIsLike(true);
        setError("Your dislike was not successful. Please try again!");
      });
    }
  };

  return { likes, isLike, error, handleLikeArticle };
};
