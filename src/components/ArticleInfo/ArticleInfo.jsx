
import { ArticleLikes } from "../ArticleLikes";
import { timeAgo } from "../../utils";


const ArticleInfo = ({ article }) => {


  


  const countTimeAgo = article ? timeAgo(article.created_at) : null;



  return (
    <>
      {article ? (
        <div>
          <p>{article.topic}</p>
          <ArticleLikes articleId={article.article_id} votes={article.votes} />
          <h2>{article.title}</h2>
          <p>{article.author}</p>
          <img src={article.article_img_url} />
          <p>{countTimeAgo && countTimeAgo}</p>
          <p>{article.body}</p>
        </div>
      ) : null}
 
    </>
  );
};

export default ArticleInfo;
