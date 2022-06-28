import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import AdminDashboard from './pages/AdminDashboard';
import Article from './pages/Article';
import ArticleEdit from './pages/ArticleEdit/ArticleEdit';
import Belajar from './pages/Belajar';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register';
import Tulis from './pages/Tulis';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/belajar/:topic/:category" element={<Belajar />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/article-edit/:id" element={<ArticleEdit />} />
          <Route path="/tulis/:status" element={<Tulis />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
