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

  const isExplore = pathname.includes("/explore");

  return (
    <div
      onClick={goToArticlePage}
      className={`${styles.article_card} ${
        isExplore ? styles.article_card_explore : styles.article_card
      }`}
    >
      <div
        className={`${styles.article_card_wrapper} ${
          isExplore
            ? styles.article_card_wrapper_explore
            : styles.article_card_wrapper
        }`}
      >
        <img
          src={article.article_img_url}
          className={`${styles.article_card_img} ${
            isExplore
              ? styles.article_card_img_explore
              : styles.article_card_img
          }`}
        />
        <div
          className={`${styles.article_card_info} ${
            isExplore
              ? styles.article_card_info_explore
              : styles.article_card_info
          } `}
        >
          <h4>{article.title}</h4>
          <div
            className={`${styles.article_card_info_extra} ${
              isExplore
                ? styles.article_card_info_extra_explore
                : styles.article_card_info_extra
            }`}
          >
            <p>{isExplore ? article.author : article.topic}</p>
            <p>{countTimeAgo}</p>
          </div>
        </div>
        <div
          className={`${styles.article_card_icons} ${
            isExplore
              ? styles.article_card_icons_explore
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
