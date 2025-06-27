import { Link, useLocation } from "react-router-dom";

import { ArticleCard } from "@/components";
import { Article } from "@/types";

import { ArticleCardsProps } from "./ArticleCards.types";

import styles from "./ArticleCards.module.scss";
import { useUserStore } from "@/store";

const ArticleCards = ({ articles }: ArticleCardsProps) => {
  const location = useLocation();
  const { pathname } = location;

  const { user } = useUserStore();

  return (
    <>
      {pathname === "/favourites" && articles.length < 1 ? (
        !user ? (
          <h2 className={styles.no_favourites_message}>
            To see your favourite articles, you need to{" "}
            <Link to="/profile" className={styles.profile_link}>
              log in or register
            </Link>
            .
          </h2>
        ) : (
          <h2 className={styles.no_favourites_message}>
            You don’t have any favourite articles yet.
          </h2>
        )
      ) : (
        <div
          className={`${styles.articles_cards} ${
            pathname.includes("/explore") || pathname.includes("/favourites")
              ? styles.articles_cards_column
              : ""
          }`}
        >
          {articles
            ? articles.map((article: Article) => (
                <ArticleCard article={article} key={article.article_id} />
              ))
            : null}
        </div>
      )}
    </>
  );
};

export default ArticleCards;
