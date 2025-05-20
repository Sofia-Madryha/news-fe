import { Link } from "react-router-dom";

const ArticleCard = ({article}) => {
    return <Link to={`/article/${article.article_id}`}> <p>{article.topic}</p>
    <h3>{article.title}</h3>
    <p>{article.created_at}</p>
    <img src={article.article_img_url} /></Link>
}

export default ArticleCard;