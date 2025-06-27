import { useParams } from "react-router-dom";
import { useState } from "react";

import { useFetchData } from "@/hooks";
import { fetchArticleById, fetchComments } from "@/api";
import { ArticleInfo, ArticleNavBar, Comments, Loader } from "@/components";

import styles from "./ArticleContent.module.scss";

const ArticleContent = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);

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
    Number(id),
    page,
    5
  );

  console.log(comments);

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
      <div className={styles.comments}>
        <Comments
          articleId={Number(id)}
          commentsData={comments}
          isLoading={commentsIsLoading}
        />{" "}
        {comments ? (
          <div className={styles.pagination}>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span> {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={comments?.length < 5}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>

      {articleIsLoading ? <Loader /> : null}
      {error ? <p>{error}</p> : null}
    </>
  );
};

export default ArticleContent;
