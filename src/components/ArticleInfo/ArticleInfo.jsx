import { useEffect, useState } from "react";
import { fetchArticleById } from "../../api/api";
import { ArticleLikes } from "../ArticleLikes";
import { timeAgo } from "../../utils";

const ArticleInfo = ({ articleId }) => {
  const [articleInfo, setArticleInfo] = useState({});

    const countTimeAgo = timeAgo(articleInfo.created_at);

  useEffect(() => {
    fetchArticleById(articleId).then((result) => {
      setArticleInfo(result);
    });
  }, []);

  return (
    <div>
      <p>{articleInfo.topic}</p>
      <ArticleLikes articleId={articleId} votes={articleInfo.votes}/>
      <h2>{articleInfo.title}</h2>
      <p>{articleInfo.author}</p>
      <img src={articleInfo.article_img_url} />
      <p>{countTimeAgo}</p>
      <p>{articleInfo.body}</p>
    </div>
  );
};

export default ArticleInfo;
