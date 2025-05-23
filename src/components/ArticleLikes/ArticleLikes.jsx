import { useLikeArticle } from "../../hooks";
import { HeartIcon } from "../../assets/icons";

import styles from "./ArticleLikes.module.css";

const ArticleLikes = ({ articleId, votes }) => {
  
  const { likes, isLike, error, handleLikeArticle } = useLikeArticle(articleId, votes);

  return (
    <div className={styles.likes}>
      {likes}
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
