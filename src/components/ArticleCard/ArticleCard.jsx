import { useNavigate } from "react-router-dom";

import { timeAgo } from "../../utils";

import { ArticleLikes } from "../ArticleLikes";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const goToArticlePage = () => {
    navigate(`/article/${article.article_id}`);
  };

  const countTimeAgo = timeAgo(article.created_at);

  return (
    <div onClick={goToArticlePage}>
      <p>{article.topic}</p>
      <ArticleLikes articleId={article.article_id} votes={article.votes} />

      <h3>{article.title}</h3>
      <p>{countTimeAgo}</p>
      <img src={article.article_img_url} />
    </div>
  );
};

export default ArticleCard;
