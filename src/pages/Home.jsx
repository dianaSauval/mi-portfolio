import "../styles/Home.css";
import homeImage from "../assets/TGF_8285.webp";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
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

        <a href="/projects" className="cta-button glow-button">
          {t("home.cta")}
        </a>
      </div>
    </div>
  );
}

export default Home;
