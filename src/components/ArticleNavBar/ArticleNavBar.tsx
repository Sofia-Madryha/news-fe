import { useNavigate } from "react-router-dom";

import { CommentIcon, GoBackIcon } from "@/assets";
import { ArticleLikes } from "@/components";

import { ArticleNavBarProps } from "./ArticleNavBar.types";

import styles from "./ArticleNavBar.module.scss";

const ArticleNavBar = ({ id, votes, comments }: ArticleNavBarProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.article_nav}>
      <div className="container">
        <div className={styles.article_info}>
          <span className={styles.article_back}>
            <GoBackIcon onClick={() => navigate(-1)} />
          </span>
          <div className={styles.article_info_items}>
            <ArticleLikes articleId={id} votes={votes} />
            <a href="#comments" className={styles.article_info_items_comments}>
              {comments}

              <CommentIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleNavBar;
