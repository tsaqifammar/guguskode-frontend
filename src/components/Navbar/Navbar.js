import { Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import options from './navbar_options';
import './Navbar.css';
import { DEFAULT_PROFILE_PICTURE } from '../../utilities/defaults';

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
          <Link to="/profile" className="navbar__profile">
            <img src={user.avatar || DEFAULT_PROFILE_PICTURE} alt="" style={{ width: "25px", height: "25px", borderRadius: "25px" }} />
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
