import { useParams } from "react-router-dom";

import { useFetchData } from "@/hooks";
import { fetchArticleById, fetchComments } from "@/api";
import { ArticleInfo, ArticleNavBar, Comments, Loader } from "@/components";

const ArticleContent = () => {
  const { id } = useParams();

  const {
    data: article,
    isLoading: articleIsLoading,
    error,
  } = useFetchData(
    fetchArticleById,
    "Hmm, that article isn’t available",
    Number(id)
  );

  const { data: comments, isLoading: commentsIsLoading } = useFetchData(
    fetchComments,
    null,
    Number(id)
  );

  return (
    <>
      {!articleIsLoading && article ? (
        <>
          <ArticleNavBar
            id={Number(id)}
            votes={article.votes}
            comments={article.comments}
          />
          <ArticleInfo article={article} />
        </>
      ) : null}
      <Comments
        articleId={Number(id)}
        commentsData={comments}
        isLoading={commentsIsLoading}
      />

      {articleIsLoading ? <Loader /> : null}
      {error ? <p>{error}</p> : null}
    </>
  );
};

export default ArticleContent;
