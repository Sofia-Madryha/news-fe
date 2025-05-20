import { useParams } from "react-router-dom";
import ArticleInfo from "../components/ArticleInfo/ArticleInfo";
import Comments from "../components/Comments/Comments";

const Article = () => {
  const { id } = useParams();

  return (
    <div>
      <ArticleInfo articleId={id} />
      <Comments articleId={id} />
    </div>
  );
};

export default Article;
