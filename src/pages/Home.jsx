import "../styles/Home.css";
import homeImage from "../assets/TGF_8285.jpg";

function Home() {
  return (
    <div className="home-container">
      <div className="home-image-container">
        <img src={homeImage} alt="Diana Sauval" className="home-image" />
      </div>
      <div className="home-content small-width">
        <h1 className="slide-in-title">Diana Sauval – Creatividad en Movimiento</h1>
        <p className="fade-up-text">
          Fusionando arte y tecnología, llevo la creatividad del circo y la precisión del código
          a cada proyecto. Desarrolladora frontend con experiencia en React y diseño web,
          apasionada por crear experiencias interactivas y dinámicas.
        </p>
        <a href="/projects" className="cta-button glow-button">Ver Proyectos</a>
      </div>
    </div>
  );
}

export default Home;
