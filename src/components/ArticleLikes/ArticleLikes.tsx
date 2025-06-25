import { useLikeArticle } from "@/hooks";
import { HeartIcon } from "@/assets";

import { ArticleLikesProps } from "./ArticleLikes.types";

import styles from "./ArticleLikes.module.scss";

const ArticleLikes = ({ articleId, votes }: ArticleLikesProps) => {
  const { likes, isLike, error, handleLikeArticle } = useLikeArticle(
    articleId,
    votes
  );

  return (
    <div className={styles.likes}>
      <span className={styles.likes_count}>{likes}</span>
      <span
        onClick={handleLikeArticle}
        className={isLike ? styles.likes_icon_active : styles.likes_icon}
      >
        <HeartIcon />
      </span>
      {error ? <span>{error}</span> : null}
    </div>
  );
};

export default ArticleLikes;
