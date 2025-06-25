import { timeAgo } from "@/utils";

import styles from "./ArticleInfo.module.scss";

import { ArticleInfoProps } from "./ArticleInfo.types";

const ArticleInfo = ({ article }: ArticleInfoProps) => {
  const countTimeAgo = article ? timeAgo(article.created_at) : null;

  return (
    <>
      {article ? (
        <section className={styles.article}>
          <img src={article.article_img_url} alt={article.title} />
          <div className={styles.article_info}>
            <h2>{article.title}</h2>
            <div className={styles.article_info_row}>
              <p className={styles.article_info_author}>{article.author} · </p>
              <p className={styles.article_info_time}>{countTimeAgo}</p>
            </div>
            <p className={styles.article_info_text}>{article.body}</p>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default ArticleInfo;
