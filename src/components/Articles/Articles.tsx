import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { fetchArticles } from "@/api";
import { ArticleCards, Loader } from "@/components";

import { useFetchData } from "@/hooks";

import { ArticlesProps } from "./Articles.types";

import styles from "./Articles.module.scss";

const Articles = ({ isRecommended }: ArticlesProps) => {
  const { topic } = useParams();

  const sortByOptions = {
    date: "created_at",
    comments: "comment_count",
    likes: "votes",
  };

  const [sortBy, setSortBy] = useState<string>(sortByOptions.date);
  const [order, setOrder] = useState("desc");

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, error } = useFetchData(
    fetchArticles,
    "Oops! No articles match this topic",
    topic,
    sortBy,
    order,
    isRecommended ? 2 : 1,
    6
  );

  const handleSearchParams = (query: string, direction: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(query, direction);
    setSearchParams(newParams);
  };

  return (
    <section className={styles.articles}>
      {!isLoading && data ? (
        <div className={styles.articles_inner}>
          {topic ? <h2 className={styles.articles_title}>{topic} </h2> : null}

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

          <ArticleCards articles={data} />

          {error ? <p>{error}</p> : null}
        </div>
      ) : null}
      {isLoading ? <Loader /> : null}
    </section>
  );
};

export default Articles;
