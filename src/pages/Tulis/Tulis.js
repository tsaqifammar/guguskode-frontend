import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import TopicNav from '../../components/TopicNav/TopicNav';
import {
  createEmptyArticle,
  getUsersArticlesByStatus,
} from '../../api/articles';
import LoadingSpinner from '../../components/LoadingSpinner';
import ArticleCard from '../../components/Card/Card';
import './Tulis.css';

export function Tulis() {
  const { status } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const as = await getUsersArticlesByStatus(user.id, status);
        setArticles(as);
      } catch (error) {
        setError('Gagal mendapatkan artikel');
      }
      setIsLoading(false);
    }
    getData();
  }, [status, user]);

  const writingOptions = [
    { display: 'Draft', to: '/tulis/draft', val: 'draft' },
    { display: 'Submitted', to: '/tulis/submitted', val: 'submitted' },
    { display: 'Published', to: '/tulis/published', val: 'published' },
  ];

  const createArticle = async () => {
    try {
      const id = await createEmptyArticle(user.token, user.id);
      navigate(`/article-edit/${id}`);
    } catch (error) {
      console.log('Gagal memasuki halaman buat artikel');
    }
  };

  return (
    <div>
      <div className="container-80">
        <Navbar />
      </div>
      <TopicNav options={writingOptions} selected={status} />
      <div className="tulis">
        <div className="container-80">
          <div className="tulis__header">
            <h1>Tulis {status}</h1>
            <button className="btn-filled" onClick={createArticle}>
              Buat Artikel
            </button>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <div className="tulis__grid">
              {articles.map((a) => (
                <ArticleCard
                  key={a.id}
                  image={a.thumbnail}
                  author={a.author.name}
                  title={a.title}
                  description={a.description}
                  to={`/article-edit/${a.id}`}
                  buttonText="Edit"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Tulis;
