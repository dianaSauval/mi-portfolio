import "../styles/About.css";

function About() {
  return (
    <div className="about-container full-width home-container">
      
      <div className="about-content">
      <h1 className="fade-in-title">Sobre Mí</h1>
        <p className="fade-up-text">
          Soy Diana Sauval, desarrolladora frontend con experiencia en React, JavaScript, CSS y Next.js.
          Mi enfoque está en la creación de experiencias digitales interactivas y dinámicas, fusionando creatividad y precisión.
        </p>
        <p className="fade-up-text">
          Mis proyectos más destacados incluyen la página del Dúo Serendipia y la página de La Troupe, donde combiné
          diseño y tecnología para reflejar la esencia artística y profesional de cada compañía.
        </p>
        <p className="fade-up-text">
          Además de mi trabajo en desarrollo web, tengo una formación en artes escénicas, lo que me permite abordar
          el diseño con una perspectiva creativa única. Hablo español nativo, francés intermedio e inglés básico.
        </p>
        <a href="/contact" className="cta-button glow-button">Contáctame</a>
      </div>
    </div>
  );
}

export default About;
