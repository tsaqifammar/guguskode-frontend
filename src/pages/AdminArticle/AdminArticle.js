import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById, updateArticleStatus } from '../../api/articles';
import ArticleViewer from '../../components/ArticleViewer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Navbar from '../../components/Navbar';
import { useUserContext } from '../../contexts/UserContext';
import './AdminArticle.css';

function AdminArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useUserContext();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(id)
      .then((res) => {
        setArticle(res);
        setIsLoading(false);
      })
      .catch((_) => {
        setIsLoading(false);
        setError('Gagal mendapatkan artikel.');
      });
  }, [id]);

  async function returnArticle() {
    try {
      await updateArticleStatus(user.token, id, 'draft');
      navigate('/admin');
    } catch (error) {
      setError('Artikel gagal dikembalikan');
    }
  }

  async function publishArticle() {
    try {
      await updateArticleStatus(user.token, id, 'published');
      navigate('/admin');
    } catch (error) {
      setError('Artikel gagal di-publish');
    }
  }

  return (
    <>
      <div className="container-80">
        <Navbar />
      </div>
      <div className="adminArticle">
        <div className="container-80">
          <div className="adminArticle__actions">
            <button
              type="button"
              className="btn-outline"
              onClick={returnArticle}
            >
              Kembalikan
            </button>
            <button
              type="button"
              className="btn-filled"
              onClick={publishArticle}
            >
              Publish
            </button>
          </div>
          <div className="adminArticle__card" data-color-mode="light">
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <h3>{error}</h3>
            ) : (
              <>
                <div className="adminArticle__meta">
                  <img src={article.author.profile_picture} alt="author" />
                  <p className="adminArticle__author">{article.author.name}</p>
                  <p className="adminArticle__date">{article.createdAt}</p>
                </div>
                <h1>{article.title}</h1>
                <img
                  className="adminArticle__thumbnail"
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

export default AdminArticle;
