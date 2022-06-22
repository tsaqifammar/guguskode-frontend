import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";

function Home() {
  return (
    <>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Navbar />
        <Hero />
      </div>
      <Footer />
    </>
  );
}

export default Home;
