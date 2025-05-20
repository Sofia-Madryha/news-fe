import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api/fetchData";

const Article = () => {
  const { id } = useParams();
  const [articleInfo, setArticleInfo] = useState({});

  useEffect(() => {
    fetchArticleById(id).then((result) => {
      setArticleInfo(result);
    });
  }, []);

  return (
    <div>
      <p>{articleInfo.topic}</p>
      <p>Likes: {articleInfo.votes}</p>
      <h2>{articleInfo.title}</h2>
      <p>{articleInfo.author}</p>
      <img src={articleInfo.article_img_url} />
      <p>{articleInfo.created_at}</p>
      <p>{articleInfo.body}</p>
    </div>
  );
};

export default Article;
