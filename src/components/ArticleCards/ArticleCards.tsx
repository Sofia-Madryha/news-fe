import { ArticleCard } from "@/components";
import { Article } from "@/types";

import styles from "./ArticleCards.module.scss";

import { ArticleCardsProps } from "./ArticleCards.types";
import { useLocation } from "react-router-dom";

const ArticleCards = ({ articles }: ArticleCardsProps) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div
      className={`${styles.articles_cards} ${
        pathname.includes("/explore") ? styles.articles_cards_explore : ""
      }`}
    >
      {articles
        ? articles.map((article: Article) => (
            <ArticleCard article={article} key={article.article_id} />
          ))
        : null}
    </div>
  );
};

export default ArticleCards;
