import { useNavigate } from "react-router-dom";

import { timeAgo } from "../../utils";

import { ArticleLikes } from "../ArticleLikes";
import { CommentIcon } from "../../assets/icons";

import styles from "./ArticleCard.module.css";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const goToArticlePage = () => {
    navigate(`/article/${article.article_id}`);
  };

  const countTimeAgo = timeAgo(article.created_at);

  return (
    <div onClick={goToArticlePage} className={styles.article_card}>
      <div className={styles.article_card_wrapper}>
        <div className={styles.article_card_topic}>{article.topic}</div>
        <div className={styles.article_card_icons}>
          <ArticleLikes articleId={article.article_id} votes={article.votes} />
          <div>
            {article.comment_count}

            <CommentIcon />
          </div>
        </div>

          <div className={styles.article_card_info}>
            <h3>{article.title}</h3>
            <p>{countTimeAgo}</p>
        </div>
        
          <img src={article.article_img_url} />

      </div>
    </div>
  );
};

export default ArticleCard;
