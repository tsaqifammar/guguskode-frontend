import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { CommentSection } from 'react-comments-section';
import { getArticleById } from '../../api/articles';
import {
  deleteComment,
  editComment,
  getCommentsByArticleId,
  postComment,
  postSubcomment,
} from '../../api/comments';
import ArticleViewer from '../../components/ArticleViewer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Navbar from '../../components/Navbar';
import './Article.css';
import 'react-comments-section/dist/index.css';
import { DEFAULT_PROFILE_PICTURE } from '../../utilities/defaults';

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useUserContext();
  const currentUser = {
    currentUserId: user.id,
    currentUserImg: user.avatar || DEFAULT_PROFILE_PICTURE,
    currentUserFullName: user.name,
  };

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
          <div className="article__comments">
            {!isLoading && !error && (
              <CommentSection
                currentUser={currentUser}
                logIn={{
                  loginLink: '/login',
                  signupLink: '/register',
                }}
                commentData={comments}
                onSubmitAction={(data) => postComment(user.token, id, data)}
                onReplyAction={(data) => postSubcomment(user.token, data)}
                onEditAction={(data) => editComment(user.token, data)}
                onDeleteAction={(data) => deleteComment(user.token, data)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
