import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { fetchArticles } from "@/api";
import { ArticleCards, Loader } from "@/components";

import { useFetchData } from "@/hooks";

import { ArticlesProps } from "./Articles.types";

import styles from "./Articles.module.scss";
import { useUserStore } from "@/store";
import { Article } from "@/types";

const Articles = ({ isRecommended }: ArticlesProps) => {
  const sortByOptions = {
    date: "created_at",
    comments: "comment_count",
    likes: "votes",
  };

  const [sortBy, setSortBy] = useState<string>(sortByOptions.date);
  const [order, setOrder] = useState("desc");
  const [favouritesArticles, setFavouritesArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);

  const { user } = useUserStore();

  const location = useLocation();
  const { pathname } = location;

  const [searchParams, setSearchParams] = useSearchParams();

  const topic = searchParams.get("topic");

  const limit = pathname === "/favourites" ? 15 : 10;

  const { data, isLoading, error } = useFetchData(
    fetchArticles,
    "Oops! No articles match this topic",
    topic ? topic : "",
    sortBy,
    order,
    isRecommended ? 2 : page,
    limit
  );

  useEffect(() => {
    if (data && user?.liked_articles) {
      const initialLikedArticles = user?.liked_articles || [];
      const filtered = data.filter((article) =>
        initialLikedArticles.includes(article.article_id)
      );
      setFavouritesArticles(filtered);
    }
  }, [data, user]);

  useEffect(() => {
    setPage(1);
  }, [topic, sortBy, order]);

  const handleSearchParams = (query: string, direction: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(query, direction);
    setSearchParams(newParams);

    console.log(data?.length);
  };

  return (
    <section className={styles.articles}>
      {!isLoading && data ? (
        <div className={styles.articles_inner}>
          {isRecommended ? (
            <h2 className={styles.articles_title}>Just for you </h2>
          ) : null}

          {topic ? (
            <div className={styles.articles_sort}>
              <div className={styles.articles_sort_item}>
                <label htmlFor="sort_by">Sort by</label>
                <select
                  name="sort_by"
                  id="sort_by"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    handleSearchParams("sort_by", e.target.value);
                  }}
                >
                  {(
                    Object.keys(sortByOptions) as (keyof typeof sortByOptions)[]
                  ).map((option) => (
                    <option key={option} value={sortByOptions[option]}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.articles_sort_item}>
                <label htmlFor="order">Order</label>
                <select
                  name="order"
                  id="order"
                  value={order}
                  onChange={(e) => {
                    setOrder(e.target.value);
                    handleSearchParams("order", e.target.value);
                  }}
                >
                  <option value={"asc"}>asc</option>
                  <option value={"desc"}>desc</option>
                </select>
              </div>
            </div>
          ) : null}

          <ArticleCards
            articles={pathname === "/favourites" ? favouritesArticles : data}
          />

          {pathname.includes("/explore") ||
          (pathname.includes("/favourites") &&
            favouritesArticles.length > limit) ? (
            <div className={styles.pagination}>
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <span> {page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={
                  pathname === "/favourites"
                    ? favouritesArticles.length < limit
                    : data?.length < limit
                }
              >
                Next
              </button>
            </div>
          ) : null}

          {error ? <p>{error}</p> : null}
        </div>
      ) : null}
      {isLoading ? <Loader /> : null}
    </section>
  );
};

export default Articles;
