import { useEffect, useState } from "react";

import { patchArticleVotes } from "@/api";
import { useUserStore } from "@/store";

export const useLikeArticle = (articleId: number, votes: number) => {
  const [likes, setLikes] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user, addToFavourites, removeLikedArticle } = useUserStore();

  useEffect(() => {
    const userLiked = user?.liked_articles?.includes(articleId) || false;
    setIsLike(userLiked);
    setLikes(votes + (userLiked ? 1 : 0));
  }, [votes, user, articleId]);

  const handleLikeArticle = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (!isLike) {
      setLikes((currentLikesCount) => currentLikesCount + 1);
      setIsLike(true);

      addToFavourites(articleId);

      user &&
        patchArticleVotes(articleId, { inc_votes: 1 }).catch(() => {
          setLikes((currentLikesCount) => currentLikesCount - 1);
          setIsLike(false);
          setError("Your like was not successful. Please try again!");
        });
    } else {
      setLikes((currentLikesCount) => currentLikesCount - 1);
      setIsLike(false);

      removeLikedArticle(articleId);

      user &&
        patchArticleVotes(articleId, { inc_votes: -1 }).catch(() => {
          setLikes((currentLikesCount) => currentLikesCount + 1);
          setIsLike(true);
          setError("Your dislike was not successful. Please try again!");
        });
    }
  };

  return { likes, isLike, error, handleLikeArticle };
};
