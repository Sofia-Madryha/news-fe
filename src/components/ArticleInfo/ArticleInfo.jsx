import { useEffect, useState } from "react";
import { fetchArticleById } from "../../api/api";
import { ArticleLikes } from "../ArticleLikes";

const ArticleInfo = ({ articleId }) => {
  const [articleInfo, setArticleInfo] = useState({});

  useEffect(() => {
    fetchArticleById(articleId).then((result) => {
      setArticleInfo(result);
    });
  }, []);

  return (
    <div>
      <p>{articleInfo.topic}</p>
      <ArticleLikes articleId={articleId} />
      <h2>{articleInfo.title}</h2>
      <p>{articleInfo.author}</p>
      <img src={articleInfo.article_img_url} />
      <p>{articleInfo.created_at}</p>
      <p>{articleInfo.body}</p>
    </div>
  );
};

export default ArticleInfo;
