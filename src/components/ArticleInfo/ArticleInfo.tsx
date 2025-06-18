import { ArticleLikes } from "../ArticleLikes";
import { timeAgo } from "../../utils";

import styles from "./ArticleInfo.module.css";

const ArticleInfo = ({ article }) => {
  const countTimeAgo = article ? timeAgo(article.created_at) : null;

  return (
    <>
      {article ? (

    
    <section className={styles.article_info}>
      <p className={styles.article_info_topic}>{article.topic}</p>
      <h2>{article.title}</h2>
      <p className={styles.article_info_author}>Автор: {article.author}</p>
      <img src={article.article_img_url} alt={article.title} />
      <div className={styles.article_info_row}>
        <p className={styles.article_info_time}>{countTimeAgo}</p>
          <ArticleLikes articleId={article.article_id} votes={article.votes} />
      </div>
      <p className={styles.article_info_text}>{article.body}</p>
    </section>

      ) : null}
    </>
  );
};

export default ArticleInfo;
