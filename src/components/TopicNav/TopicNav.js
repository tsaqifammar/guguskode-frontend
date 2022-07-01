import { Link } from 'react-router-dom';
import './TopicNav.css';

function TopicNav({ options }) {
  return (
    <div className="topic">
      <ul className="topic__options">
        {options.map((option, idx) => (
          <li key={idx}>
            <Link to={option.to}>{option.display}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicNav;
