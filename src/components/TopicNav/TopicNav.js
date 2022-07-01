import { Link } from 'react-router-dom';
import options from './topic_options';
import './TopicNav.css';

function TopicNav() {
  // TODO: ambil info berdasarkan yang sedang log in (kalau belum, pakai 'user' aja)
  const currentLoggedIn = 'user';

  return (
    <div className="topic">
      <div className="topic__center">
        <ul className="topic__options">
          {options[currentLoggedIn].map((option) => (
            <li>
              <Link to={option.to}>{option.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopicNav;
