import { useParams } from 'react-router-dom';
import Footer from "../../Component/Footer";
import Hero from "../../Component/Hero";
import Navbar from "../../Component/Navbar";
import TopicNav from "../../Component/TopicNav";

function Belajar() {
  const { topic, category } = useParams();

  return (
    <>
      <div>
        <Navbar />
        <TopicNav />
        <Hero />
        <Card />
        <Footer />
      </div>
    </>
  );
}

export default Belajar;
