import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, getTopics, saveArticle, updateArticleStatus } from '../../api/articles';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Navbar from '../../components/Navbar';
import './ArticleEdit.css';
import { useUserContext } from '../../contexts/UserContext';

function ArticleEdit() {
  const { id } = useParams();
  const { user } = useUserContext();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [topics, setTopics] = useState([]);
  const [article, setArticle] = useState(null);
  const [thumbnail, setThumbnail] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const ts = await getTopics();
        const a = await getArticleById(id);
        setTopics(ts);
        setArticle(a);
      } catch (error) {
        setError('Gagal mendapatkan artikel');
      }
      setIsLoading(false);
    }
    getData();
  }, [id]);

  const updateTitle = (title) => {
    setFormError('');
    setFormSuccessMessage('');
    setArticle(prev => ({ ...prev, title }));
  }
  const updateTopic = (topic) => {
    setFormError('');
    setFormSuccessMessage('');
    setArticle(prev => ({ ...prev, topic }));
  }
  const updateCategory = (category) => {
    setFormError('');
    setFormSuccessMessage('');
    setArticle(prev => ({ ...prev, category }));
  }
  const updateContent = (content) => {
    setFormError('');
    setFormSuccessMessage('');
    setArticle(prev => ({ ...prev, content }));
  }

  function validate() {
    // memastikan form tidak kosong
    const fieldToBeChecked = [
      'title',
      'content',
      'topic',
      'category',
    ];
    for (let i = 0; i < fieldToBeChecked.length; i++) {
      const value = article[fieldToBeChecked[i]]?.trim();
      if (!value) {
        setFormError(`${fieldToBeChecked[i]} tidak boleh kosong`);
        return false;
      }
    }

    // memastikan user mengupload thumbnail, jika thumbnail masih kosong
    if (!article.thumbnail && !thumbnail) {
      setFormError('Thumbnail tidak boleh kosong');
      return false;
    }

    return true;
  }

  async function save() {
    const isGood = validate();
    if (isGood) {
      try {
        await saveArticle(user.token, { ...article, thumbnail });
        setFormSuccessMessage('Artikel berhasil disimpan');
      } catch (error) {
        setFormError('Artikel gagal disimpan');
      }
    }
  }

  async function submit() {
    save();
    try {
      await updateArticleStatus(user.token, article.id, 'submitted');
      setFormSuccessMessage('Artikel berhasil di-submit')
    } catch (error) {
      setFormSuccessMessage('');
      setFormError('Artikel gagal disubmit');
    }
  }

  return (
    <>
      <div className="container-80">
        <Navbar />
      </div>
      <div className="articleEdit">
        <div className="container-80">
          <div className="articleEdit__card" data-color-mode="light">
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <h3>{error}</h3>
            ) : (
              <>
                <div className="articleEdit__title">
                  <label>Judul</label>
                  <input
                    type="text"
                    value={article.title}
                    onChange={(e) => updateTitle(e.target.value)}
                  />
                </div>
                <div className="articleEdit__meta">
                  <div className="articleEdit__info">
                    <label>
                      Topik
                    </label>
                      <select
                        value={article.topic}
                        onChange={(e) => updateTopic(e.target.value)}
                      >
                        <option value="">Pilih topic</option>
                        {topics.map(({ id, name }) => (
                          <option key={id} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    <label>
                      Kategori
                    </label>
                      <select
                        value={article.category}
                        onChange={(e) => updateCategory(e.target.value)}
                      >
                        <option value="">Pilih category</option>
                        <option value="Pemula">Pemula</option>
                        <option value="Menengah">Menengah</option>
                        <option value="Tingkat Akhir">Tingkat Akhir</option>
                        <option value="Project">Project</option>
                      </select>
                    <label>
                      Thumbnail
                    </label>
                      <input
                        type="file"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                      />
                  </div>
                  <div className="articleEdit__actions">
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={save}
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      className="btn-filled"
                      onClick={submit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                {formError && (
                  <p style={{ color: 'red', margin: '0 0 0.5rem 0' }}>
                    Error: {formError}
                  </p>
                )}
                {formSuccessMessage && (
                  <p style={{ color: 'green', margin: '0 0 0.5rem 0' }}>
                    Success: {formSuccessMessage}
                  </p>
                )}
                <MDEditor
                  height="1000"
                  value={article.content}
                  onChange={updateContent}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleEdit;
