import { useParams } from "react-router-dom";
import ArticleInfo from "../components/ArticleInfo/ArticleInfo";
import Comments from "../components/Comments/Comments";
import { useFetchData } from "../hooks";
import { fetchArticleById } from "../api/api";

const Article = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useFetchData(
    fetchArticleById,
    "Hmm, that article isn’t available",
    id
  );

  return (
    <>
     {!isLoading && data ?  <div className="container">
        <ArticleInfo article={data} />
        <Comments articleId={id} />
      </div>: null}
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}
    </>
  );
};

export default Article;
