import { useParams } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

function Tulis() {
  const { status } = useParams();
  const { user } = useUserContext();

  return (
    <div>
      <h1>Tulis {status}</h1>
      <p>Untuk si user dengan nama {user.name}</p>
    </div>
  );
}

export default Tulis;
