import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { useUserContext } from '../../contexts/UserContext';
import options from './navbar_options';
import './Navbar.css';

function Navbar() {
  const { user } = useUserContext();
  const role = user ? user.role : 'User';

  return (
    <div className="navbar">
      <h1 className="navbar__logo logo">GugusKode</h1>
      <div className="navbar__right">
        <ul className="navbar__options">
          {options[role].map((option, idx) => (
            <li key={idx}>
              <Link to={option.to}>{option.display}</Link>
            </li>
          ))}
        </ul>
        {user ? (
          <Link to="/profile">
            <FaRegUserCircle style={{verticalAlign: 'middle'}} size={25} />
          </Link>
        ) : (
          <Link className="btn-filled navbar__login" to="/login">
            Masuk
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
