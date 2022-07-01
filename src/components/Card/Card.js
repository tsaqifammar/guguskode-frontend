import { Link } from 'react-router-dom';
import './Card.css';

function ArticleCard({ id, image, title, author, description }) {

  return (
    <div className="articleCard">
      <img src={image} alt="article thumbnail" />
      <div className="articleCard__info">
        <p className="articleCard__author">{author}</p>
        <h3 className="articleCard__title">{title}</h3>
        <p className="articleCard__description">{description}</p>
        <div className="articleCard__baca">
          <Link className="btn-filled" to={`/article/${id}`}>Baca</Link>
        </div>
      </div>
    </div>
  );
}
export default ArticleCard;
