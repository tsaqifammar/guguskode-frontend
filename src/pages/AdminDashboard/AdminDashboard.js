import AppFeatures from "../../components/AppFeatures/AppFeatures";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";


function AdminDashboard() {
  return   (
    <>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Navbar />
        <Hero />
      </div>
      <AppFeatures />
      <Footer />
    </>
  );
}

export default AdminDashboard;
