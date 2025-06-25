import { ArticleCard } from "@/components";
import { Article } from "@/types";

import styles from "./ArticleCards.module.scss";

import { ArticleCardsProps } from "./ArticleCards.types";

const ArticleCards = ({ articles }: ArticleCardsProps) => {
  return (
    <div className={styles.articles_cards}>
      {articles
        ? articles.map((article: Article) => (
            <ArticleCard article={article} key={article.article_id} />
          ))
        : null}
    </div>
  );
};

export default ArticleCards;
