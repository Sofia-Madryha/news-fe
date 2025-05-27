import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { fetchArticles } from "../../api/api";
import { ArticleCard } from "../ArticleCard";
import { useFetchData } from "../../hooks";

import styles from "./Articles.module.css";

const Articles = () => {
  const { topic } = useParams();

  const sortByOptions = {
    date: "created_at",
    comments: "comment_count",
    likes: "votes",
  };

  const [sortBy, setSortBy] = useState(sortByOptions.date);
  const [order, setOrder] = useState("desc");

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, error } = useFetchData(
    fetchArticles,
    "Oops! No articles match this topic",
    topic,
    sortBy,
    order
  );

  const handleSearchParams = (query, direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(query, direction);
    setSearchParams(newParams);
  };

  return (
    <section className={`container ${styles.articles}`}>
      <div className={styles.articles_inner}>
        <h2 className={styles.articles_title}>
          {topic ? topic : "The newest articles"}
        </h2>

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
              {Object.keys(sortByOptions).map((option) => (
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

        <div className={styles.articles_cards}>
          {!isLoading && data
            ? data.map((article) => (
                <ArticleCard article={article} key={article.article_id} />
              ))
            : null}
        </div>

        {isLoading ? <div>Loading...</div> : null}

        {error ? <p>{error}</p> : null}
      </div>
    </section>
  );
};

export default Articles;
