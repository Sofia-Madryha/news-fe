import { useLocation, useNavigate } from "react-router-dom";

import { timeAgo } from "@/utils";

import { ArticleLikes } from "@/components";
import { CommentIcon } from "@/assets";

import styles from "./ArticleCard.module.scss";

const ArticleCard = ({ article }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const goToArticlePage = () => {
    navigate(`/article/${article.article_id}`);
  };

  const countTimeAgo = timeAgo(article.created_at);

  const isNotHome = pathname.includes("/explore") || pathname.includes("/favourites");

  return (
    <div
      onClick={goToArticlePage}
      className={`${styles.article_card} ${
        isNotHome ? styles.article_card_row : styles.article_card
      }`}
    >
      <div
        className={`${styles.article_card_wrapper} ${
          isNotHome
            ? styles.article_card_wrapper_row
            : styles.article_card_wrapper
        }`}
      >
        <img
          src={article.article_img_url}
          className={`${styles.article_card_img} ${
            isNotHome
              ? styles.article_card_img_row
              : styles.article_card_img
          }`}
        />
        <div
          className={`${styles.article_card_info} ${
            isNotHome
              ? styles.article_card_info_row
              : styles.article_card_info
          } `}
        >
          <h4>{article.title}</h4>
          <div
            className={`${styles.article_card_info_extra} ${
              isNotHome
                ? styles.article_card_info_extra_row
                : styles.article_card_info_extra
            }`}
          >
            <p>{isNotHome ? article.author : article.topic}</p>
            <p>{countTimeAgo}</p>
          </div>
        </div>
        <div
          className={`${styles.article_card_icons} ${
            isNotHome
              ? styles.article_card_icons_row
              : styles.article_card_icons
          }`}
        >
          <ArticleLikes articleId={article.article_id} votes={article.votes} />
          <span>
            {article.comment_count}

            <CommentIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
