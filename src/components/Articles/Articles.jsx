import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { fetchArticles } from "../../api/api";
import { ArticleCard } from "../ArticleCard";
import { useFetchData } from "../../hooks";

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
    <>
      <h2>{topic ? topic : "The newest articles"}</h2>
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

      {!isLoading && data
        ? data.map((article) => (
            <ArticleCard article={article} key={article.article_id} />
          ))
        : null}

      {isLoading ? <div>Loading...</div> : null}

      {error ? <p>{error}</p> : null}
    </>
  );
};

export default Articles;
