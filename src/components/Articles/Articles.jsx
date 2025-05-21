import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchArticles } from "../../api/api";
import { ArticleCard } from "../ArticleCard";

const Articles = () => {
  const { topic } = useParams();

  const sortByOptions = {
    date: "created_at",
    title: "title",
    user: "author",
  };

  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState(sortByOptions.date);

  useEffect(() => {
    fetchArticles(topic, sortBy).then((result) => setArticles(result));
  }, [topic, sortBy]);

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
        }}
      >
        {Object.keys(sortByOptions).map((option) => (
          <option key={option} value={sortByOptions[option]}>
            {option}
          </option>
        ))}
      </select>
      {articles.map((article) => (
        <ArticleCard article={article} key={article.article_id} />
      ))}
    </>
  );
};

export default Articles;
