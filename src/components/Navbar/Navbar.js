import { Link } from 'react-router-dom';
import options from './navbar_options';
import './Navbar.css';

function Navbar() {
  // TODO: ambil info berdasarkan yang sedang log in (kalau belum, pakai 'user' aja)
  const currentLoggedIn = 'user';

  return (
    <div className="navbar">
      <h1 className="navbar__logo logo">GugusKode</h1>
      <div className="navbar__right">
        <ul className="navbar__options">
          {options[currentLoggedIn].map((option) => (
            <li>
              <Link to={option.to}>{option.display}</Link>
            </li>
          ))}
        </ul>
        <Link className="btn-filled navbar__login" to="/login">Masuk</Link>
      </div>
    </div>
  );
}

export default Navbar;
