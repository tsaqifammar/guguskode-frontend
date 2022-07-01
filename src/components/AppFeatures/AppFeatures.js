import './AppFeatures.css';
import html from '../../assets/html.png';
import css from '../../assets/css.png';
import js from '../../assets/js.png';
import react from '../../assets/react.png';
import git from '../../assets/git.png';
import nodejs from '../../assets/nodejs.png';
import fitur1 from '../../assets/undraw_studying_re_deca.svg';
import fitur2 from '../../assets/undraw_book_lover_re_rwjy.svg';

function AppFeatures() {
  return (
    <div className="features">
      <section className="features__coding">
        <h1>Bisa belajar berbagai topik coding!</h1>
        <p>dan masih banyak lagi...</p>
        <div className="features__languages">
          <img src={html} alt="html logo" />
          <img src={css} alt="css logo" />
          <img src={js} alt="js logo" />
          <img src={react} alt="react logo" />
          <img src={git} alt="git logo" />
          <img src={nodejs} alt="nodejs logo" />
        </div>
      </section>
      <section
        className="features__general"
        style={{ width: '80%', margin: '2rem auto 4rem auto' }}
      >
        <h1>Fitur Kami</h1>
        <div className="features__list">
          <div className="features__item">
            <img src={fitur1} alt="feature 1" />
            <div className="features__itemDesc">
              <h2>Belajar gratis menyesuaikan dengan level mu.</h2>
              <p>
                Disini setiap konten pembelajaran akan kami kategorikan menjadi
                level pemula, menengah, dan mahir. Kamu bisa membangun skill
                coding mu dari bawah hingga mahir nantinya.
              </p>
            </div>
          </div>
          <div className="features__item">
            <img src={fitur2} alt="feature 2" />
            <div className="features__itemDesc">
              <h2>Kontribusi menulis untuk berbagi ilmu.</h2>
              <p>
                Mari kita kontribusi dengan dan untuk komunitas pemrograman
                Indonesia demi masa depan Indonesia yang lebih semangat belajar,
                cerdas dan cerah.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AppFeatures;
