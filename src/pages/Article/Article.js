import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../../api/articles';
import { getCommentsByArticleId } from '../../api/comments';
import ArticleViewer from '../../components/ArticleViewer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Navbar from '../../components/Navbar';
import './Article.css';

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const as = await getArticleById(id);
        const cs = await getCommentsByArticleId(id);
        setArticle(as);
        setComments(cs);
      } catch (error) {
        setError('Gagal mendapatkan artikel');
      }
      setIsLoading(false);
    }
    getData();
  }, [id]);

  return (
    <>
      <div className="container-80">
        <Navbar />
      </div>
      <div className="article">
        <div className="container-80">
          <div className="article__card" data-color-mode="light">
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <h3>{error}</h3>
            ) : (
              <>
                <pre>{JSON.stringify(comments, '\t', 2)}</pre>
                <div className="article__meta">
                  <img src={article.author.profile_picture} alt="author" />
                  <p className="article__author">{article.author.name}</p>
                  <p className="article__date">{article.createdAt}</p>
                </div>
                <h1>{article.title}</h1>
                <img
                  className="article__thumbnail"
                  src={article.thumbnail}
                  alt="thumbnail"
                />
                <ArticleViewer content={article.content} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
