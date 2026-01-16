import { Link } from "react-router-dom";
import "../styles/About.css";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <section className="about-container">
      <div className="about-content">
        <h1 className="fade-in-title-about">{t("about.title")}</h1>

        {/* Bloque humano (entendible para cualquiera) */}
        <p className="fade-up-text-about">{t("about.p1")}</p>
        <p className="fade-up-text-about delay-1">{t("about.p2")}</p>
        <p className="fade-up-text-about delay-2">{t("about.p3")}</p>

        {/* Separador / subtítulo técnico */}
        <h2 className="about-subtitle fade-up-subtitle delay-3">
          {t("about.techTitle")}
        </h2>

        {/* Bloque técnico */}
        <p className="fade-up-text-about delay-4">{t("about.tech1")}</p>
        <p className="fade-up-text-about delay-5">{t("about.tech2")}</p>
        <p className="fade-up-text-about delay-6">{t("about.tech3")}</p>
        <p className="fade-up-text-about delay-7">{t("about.tech4")}</p>

        <div className="about-chips">
          <span className="chip">React</span>
          <span className="chip">Vite</span>
          <span className="chip">Node.js</span>
          <span className="chip">Express</span>
          <span className="chip">MongoDB</span>
          <span className="chip">Cloudinary</span>
          <span className="chip">Vimeo</span>
          <span className="chip">{t("about.chips.payments")}</span>
          <span className="chip">{t("about.chips.cybersecurity")}</span>
        </div>

        <Link to="/contact" className="cta-button glow-button">
          {t("about.cta")}
        </Link>
      </div>
    </section>
  );
}

export default About;
