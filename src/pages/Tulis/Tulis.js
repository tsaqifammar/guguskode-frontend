import { useParams } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from '../../components/Card/Card';
import data from '../../data/dataCard'

export function Tulis() {
  const { status } = useParams();
  const { user } = useUserContext();

  return (
    <div>
      <Navbar />
      <h1>Tulis {status}</h1>
      {/* <p>Untuk si user dengan nama {user.name}</p> */}

      <div className="App">
       {data.map(d => (
        <Card 
            image={d.image}
            title={d.title}
            author={d.author}
            description={d.description}
        />
       ))
       }
      </div>
      <Footer />
    </div>
  );
}

export default Tulis;
