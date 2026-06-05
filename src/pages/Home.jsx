import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "../styles/Home.css";

const homeImage =
  "https://res.cloudinary.com/dkdhdy9e5/image/upload/v1780653067/Portfolio/TGF_8295_u8vgah.jpg";

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

 const handleImageMove = (e) => {
  const card = e.currentTarget;

  card.classList.remove("returning");

  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = ((x / rect.width) - 0.5) * 14;
  const rotateX = ((y / rect.height) - 0.5) * -14;

  card.style.setProperty("--rotate-x", `${rotateX}deg`);
  card.style.setProperty("--rotate-y", `${rotateY}deg`);
  card.style.setProperty("--mouse-x", `${x}px`);
  card.style.setProperty("--mouse-y", `${y}px`);
};

  const resetImageMove = (e) => {
    const card = e.currentTarget;

    card.classList.add("returning");

    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");

    setTimeout(() => {
      card.classList.remove("returning");
    }, 900);
  };

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{titles[lang]}</title>
        <meta name="description" content={descriptions[lang]} />
        <link rel="canonical" href="https://dianasauvaldigital.com.ar/" />
      </Helmet>

      <main className="home-container">
        <section className="home-visual">
          <div
            className="home-image-frame"
            onMouseMove={handleImageMove}
            onMouseLeave={resetImageMove}
          >
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="spark spark-one" />
            <span className="spark spark-two" />
            <span className="spark spark-three" />

            <div className="image-glow" />

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
        </section>

        <section className="home-content small-width">
          <p className="home-kicker">Creative Web Developer</p>

          <h1 className="slide-in-title">
            <span className="title-line title-line--1">
              {t("home.titleLine1")}
            </span>
            <span className="title-line text-gradient">
              {t("home.titleLine2")}
            </span>
          </h1>

          <h3>{t("home.subtitle")}</h3>

          <p className="fade-up-text">{t("home.text")}</p>

          <Link to="/projects" className="cta-button glow-button">
            {t("home.cta")}
          </Link>
        </section>
      </main>
    </>
  );
}

export default Home;
