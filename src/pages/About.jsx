import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import "../styles/About.css";

function About() {
  const { t, i18n } = useTranslation();

  const lang = i18n.language?.startsWith("es") ? "es" : "en";

  const seoTitle = {
    es: "Sobre mí · Diana Sauval",
    en: "About · Diana Sauval",
  }[lang];

  const seoDescription = {
    es: "Desarrolladora Full-Stack: creo sitios y plataformas completas con React, Node, Express y MongoDB. Admin panels, autenticación, pagos online, Cloudinary, Vimeo y buenas prácticas de seguridad.",
    en: "Full-Stack Developer building complete web products with React, Node, Express and MongoDB. Admin panels, auth, online payments, Cloudinary, Vimeo and security best practices.",
  }[lang];

  const canonicalUrl = "https://dianasauvaldigital.com.ar/about";

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dkdhdy9e5/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1773511403/Portfolio/og-cover_fq4xop.png"
        />

        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dkdhdy9e5/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1773511403/Portfolio/og-cover_fq4xop.png"
        />
      </Helmet>

      <section className="about-container">
        <div className="about-planetarium" aria-hidden="true">
          <span className="planet-orbit orbit-main" />
          <span className="planet-orbit orbit-second" />
          <span className="planet-orbit orbit-third" />

          <span className="planet-core" />
          <span className="planet-spark spark-a" />
          <span className="planet-spark spark-b" />
          <span className="planet-spark spark-c" />
          <span className="planet-spark spark-d" />
        </div>

        <div className="about-content">
          <div className="about-header">
            <p className="about-kicker">Creative Full-Stack Developer</p>
            <h1 className="fade-in-title-about">{t("about.title")}</h1>
          </div>

          <div className="about-card about-card-human">
            <span className="about-card-orbit" aria-hidden="true" />

            <p className="fade-up-text-about">{t("about.p1")}</p>
            <p className="fade-up-text-about delay-1">{t("about.p2")}</p>
            <p className="fade-up-text-about delay-2">{t("about.p3")}</p>
          </div>

          <div className="about-tech-panel">
            <h2 className="about-subtitle fade-up-subtitle delay-3">
              {t("about.techTitle")}
            </h2>

            <div className="about-card about-card-tech">
              <span className="about-card-orbit" aria-hidden="true" />

              <p className="fade-up-text-about delay-4">{t("about.tech1")}</p>
              <p className="fade-up-text-about delay-5">{t("about.tech2")}</p>
              <p className="fade-up-text-about delay-6">{t("about.tech3")}</p>
              <p className="fade-up-text-about delay-7">{t("about.tech4")}</p>
            </div>

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
          </div>

          <Link to="/contact" className="cta-button glow-button about-cta">
            {t("about.cta")}
          </Link>
        </div>
      </section>
    </>
  );
}

export default About;
