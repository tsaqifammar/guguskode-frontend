import { Link } from 'react-router-dom';
import heroIllustration from '../../assets/hero_illustration.png';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero__left">
        <p className="hero__welcome">Halo, selamat datang!</p>
        <p className="hero__slogan">Temukan tempat belajar ngoding yang nyaman.</p>
        <Link className="btn-filled" to="/belajar/html/pemula">Mulai Belajar</Link>
      </div>
      <img src={heroIllustration} className="hero__illustration" alt="hero" />
    </section>
  );
}

export default Hero;
