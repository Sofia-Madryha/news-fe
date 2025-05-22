import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { fetchArticles } from "../../api/api";
import { ArticleCard } from "../ArticleCard";

const Articles = () => {
  const { topic } = useParams();

  const sortByOptions = {
    date: "created_at",
    comments: "comment_count",
    likes: "votes",
  };

  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState(sortByOptions.date);
  const [order, setOrder] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchParams = (query, direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(query, direction);
    setSearchParams(newParams);
  };

  useEffect(() => {
    fetchArticles(topic, sortBy, order).then((result) => setArticles(result));
  }, [topic, sortBy, order]);

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
      {articles.map((article) => (
        <ArticleCard article={article} key={article.article_id} />
      ))}
    </>
  );
};

export default Articles;
