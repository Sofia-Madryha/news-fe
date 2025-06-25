import { useEffect, useState } from "react";

import { patchArticleVotes } from "@/api";

// TODO: replace with React Context after user logic is implemented

export const useLikeArticle = (articleId: number, votes: number) => {
  const [likes, setLikes] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLikes(votes);
  }, [votes]);

  const handleLikeArticle = (e: React.MouseEvent<HTMLSpanElement>) => {
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
