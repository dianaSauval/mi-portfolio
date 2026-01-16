import "../styles/Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-row">
        <span className="footer-brand">
          © {year} · <strong>Diana Sauval</strong>
        </span>

        <span className="footer-dot" aria-hidden="true">•</span>

        <span className="footer-made">
          Web development & UI design
        </span>

        <span className="footer-dot" aria-hidden="true">•</span>

        <nav className="footer-links" aria-label="Enlaces del pie">
          <a className="footer-link" href="mailto:dianasauval@hotmail.com">Email</a>
          <span className="footer-sep" aria-hidden="true">/</span>
          <a className="footer-link" href="https://github.com/dianaSauval" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span className="footer-sep" aria-hidden="true">/</span>
          <a className="footer-link" href="https://www.linkedin.com/in/diana-sauval" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
