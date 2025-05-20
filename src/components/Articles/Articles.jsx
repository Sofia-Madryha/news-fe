import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../../api/fetchData";

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
          <option value={sortByOptions[option]}>{option}</option>
        ))}
      </select>
      {articles.map((article) => (
        <Link to={`/article/${article.article_id}`} >
          <p>{article.topic}</p>
          <h3>{article.title}</h3>
          <p>{article.created_at}</p>
          <img src={article.article_img_url} />
        </Link>
      ))}
    </>
  );
};

export default Articles;
