import { useParams } from 'react-router-dom';

function Belajar() {
  const { topic, category } = useParams();

  return (
    <div>
      <h1>Belajar {topic} dengan kategori {category}</h1>
    </div>
  );
}

export default Belajar;
