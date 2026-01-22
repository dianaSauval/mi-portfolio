import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import "../styles/Home.css";
import homeImage from "../assets/TGF_8285.webp";
import { Link } from "react-router-dom";

function Home() {
  const { t, i18n } = useTranslation();

  const lang = i18n.language?.startsWith("es") ? "es" : "en";

  const titles = {
    es: "Diana Sauval · Full-Stack Developer",
    en: "Diana Sauval · Full-Stack Developer",
  };

  const descriptions = {
    es: "Portfolio de Diana Sauval, Full-Stack Developer. Desarrollo webs modernas con React, Node y MongoDB. Proyectos y contacto.",
    en: "Portfolio of Diana Sauval, Full-Stack Developer. Modern web development with React, Node and MongoDB. Projects and contact.",
  };

  return (
    <>
      {/* 🔹 SEO */}
      <Helmet>
        <html lang={lang} />
        <title>{titles[lang]}</title>
        <meta name="description" content={descriptions[lang]} />
        <link rel="canonical" href="https://dianasauvaldigital.com.ar/" />
      </Helmet>

      {/* 🔹 CONTENIDO */}
      <div className="home-container">
        <div className="home-image-container">
          <img
            src={homeImage}
            alt={t("home.imageAlt")}
            className="home-image"
            width="1200"
            height="1680"
            decoding="async"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="home-content small-width">
          <h1 className="slide-in-title">
            <span className="title-line title-line--1">
              {t("home.titleLine1")}
            </span>
            <span className="title-line">{t("home.titleLine2")}</span>
          </h1>

          <h3>{t("home.subtitle")}</h3>

          <p className="fade-up-text">{t("home.text")}</p>

          <Link to="/projects" className="cta-button glow-button">
            {t("home.cta")}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
