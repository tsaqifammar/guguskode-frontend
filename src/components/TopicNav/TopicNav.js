import { Link } from 'react-router-dom';
import './TopicNav.css';

function TopicNav({ options, selected }) {
  return (
    <div className="topic">
      <ul className="topic__options">
        {options.map((option, idx) => (
          <li key={idx} className={option.val === selected ? 'topic__selected' : ''}>
            <Link to={option.to}>{option.display}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicNav;
