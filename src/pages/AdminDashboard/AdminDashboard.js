import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './AdminDashboard.css';
import { deleteArticleById, getArticlesWithStatusPublishedOrSubmitted } from '../../api/articles';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  async function getData() {
    setIsLoading(true);
    try {
      const as = await getArticlesWithStatusPublishedOrSubmitted();
      setArticles(as);
    } catch (error) {
      setError('Gagal mendapatkan artikel');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
      setSuccessMsg('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [errorMsg, successMsg]);

  const viewArticle = (id) => navigate(`/admin/article/${id}`);
  const deleteArticle = async (id) => {
    try {
      await deleteArticleById(user.token, id);
      await getData();
      setSuccessMsg('Artikel berhasil dihapus');
    } catch (error) {
      setErrorMsg('Artikel gagal dihapus');
    }
  };

  return (
    <>
      <div className="container-80">
        <Navbar />
      </div>
      <div className="adminDashboard">
        <div className="container-80">
          <h1>Daftar Tulisan Artikel</h1>

          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <>
              {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
              {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
              <table className="adminDashboard__table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Tanggal</th>
                    <th>Judul</th>
                    <th>Author</th>
                    <th>Topik</th>
                    <th>Kategori</th>
                    <th>Status</th>
                    <th>Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((a, idx) => (
                    <tr key={a.id}>
                      <td>{idx + 1}</td>
                      <td>{a.createdAt}</td>
                      <td>{a.title}</td>
                      <td>{a.author}</td>
                      <td>{a.topic}</td>
                      <td>{a.category}</td>
                      <td>{a.status}</td>
                      <td
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '1rem',
                        }}
                      >
                        <button
                          className="btn-filled"
                          onClick={() => viewArticle(a.id)}
                        >
                          Lihat
                        </button>
                        <button
                          className="btn-filled-danger"
                          onClick={() => deleteArticle(a.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminDashboard;
