import { Link } from 'react-router-dom';
import { DEFAULT_ARTICLE_THUMBNAIL } from '../../utilities/defaults';
import './Card.css';

function ArticleCard({ image, title, author, description, to, buttonText }) {

  return (
    <div className="articleCard">
      <img src={image || DEFAULT_ARTICLE_THUMBNAIL} alt="article thumbnail" />
      <div className="articleCard__info">
        <p className="articleCard__author">{author}</p>
        <h3 className="articleCard__title">{title}</h3>
        <p className="articleCard__description">{description}</p>
        <div className="articleCard__baca">
          <Link className="btn-filled" to={to}>{buttonText}</Link>
        </div>
      </div>
    </div>
  );
}
export default ArticleCard;
