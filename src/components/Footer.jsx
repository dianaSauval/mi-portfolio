import "../styles/Footer.css";

import logoFooter from "../assets/img/logo-fondo-transparente.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-glow" />

      <div className="footer-content">
        <div className="footer-logo-wrap" aria-hidden="true">
          <span className="footer-spark spark-1" />
          <span className="footer-spark spark-2" />
          <span className="footer-spark spark-3" />
          <span className="footer-spark spark-4" />
          <span className="footer-spark spark-5" />

          <img
            src={logoFooter}
            alt=""
            className="footer-logo"
          />
        </div>

        <div className="footer-brand">
          <span className="footer-kicker">Portfolio digital</span>
          <strong>Diana Sauval</strong>
          <span className="footer-year">© {year}</span>
        </div>

        <p className="footer-made">
          Web development · UI design · Creative digital experiences
        </p>

        <nav className="footer-links" aria-label="Enlaces del pie">
          <a className="footer-link" href="mailto:dianasauval@hotmail.com">
            Email
          </a>

          <a
            className="footer-link"
            href="https://github.com/dianaSauval"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            className="footer-link"
            href="https://www.linkedin.com/in/diana-sauval"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}