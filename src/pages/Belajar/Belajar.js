import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticlesByTopicAndCategory, getTopics } from '../../api/articles';
import ArticleCard from '../../components/Card';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import Navbar from '../../components/Navbar';
import TopicNav from '../../components/TopicNav/TopicNav';
import './Belajar.css';

function Belajar() {
  const { topic, category } = useParams();

  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const topicOptions = topics.map((t) => ({
    id: t.id,
    to: `/belajar/${t.code}/${category}`,
    display: t.name,
    val: t.code,
  }));
  topicOptions.sort((a, b) => a.id - b.id);

  const categoryOptions = [
    { display: 'Pemula', path: `/belajar/${topic}/pemula`, val: 'pemula' },
    {
      display: 'Menengah',
      path: `/belajar/${topic}/menengah`,
      val: 'menengah',
    },
    {
      display: 'Tingkat Akhir',
      path: `/belajar/${topic}/tingkat-akhir`,
      val: 'tingkat-akhir',
    },
    { display: 'Project', path: `/belajar/${topic}/project`, val: 'project' },
  ];

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const ts = await getTopics();
        const as = await getArticlesByTopicAndCategory(topic, category);
        setTopics(ts);
        setArticles(as);
      } catch (error) {
        console.log('Gagal mendapat data');
      }
      setIsLoading(false);
    }
    getData();
  }, [topic, category]);

  return (
    <>
      <div>
        <div className="container-80">
          <Navbar />
        </div>
        <div className="belajar">
          <TopicNav options={topicOptions} selected={topic} />
          <div className="belajar__selectCategory">
            <h2>Kategori</h2>
            {categoryOptions.map((c, idx) => (
              <Link
                key={idx}
                style={{ fontWeight: c.val === category ? 'bold' : 'normal' }}
                to={c.path}
              >
                {c.display}
              </Link>
            ))}
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="container-80">
                <h1>Artikel terkait {topic}</h1>
                <div className="belajar__grid">
                  {articles.map((a) => (
                    <ArticleCard
                      key={a.id}
                      image={a.thumbnail}
                      author={a.author.name}
                      title={a.title}
                      description={a.description}
                      to={`/article/${a.id}`}
                      buttonText="Baca"
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Belajar;
