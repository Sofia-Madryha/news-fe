import { useNavigate } from "react-router-dom";

import { timeAgo } from "@/utils";

import { ArticleLikes } from "@/components";
import { CommentIcon } from "@/assets";

import styles from "./ArticleCard.module.scss";

const ArticleCard = ({ article }: any) => {
  const navigate = useNavigate();

  const goToArticlePage = () => {
    navigate(`/article/${article.article_id}`);
  };

  const countTimeAgo = timeAgo(article.created_at);

  return (
    <div onClick={goToArticlePage} className={styles.article_card}>
      <div className={styles.article_card_wrapper}>
        <img src={article.article_img_url} />
        <div className={styles.article_card_info}>
          <h4>{article.title}</h4>
          <div className={styles.article_card_info_extra}>
            <p>{article.topic}</p>
            <p>{countTimeAgo}</p>
          </div>
        </div>
        <div className={styles.article_card_icons}>
          <ArticleLikes articleId={article.article_id} votes={article.votes} />
          <div>
            {article.comment_count}

            <CommentIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
