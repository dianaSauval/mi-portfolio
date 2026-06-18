import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import "../styles/Home.css";

const homeImage =
  "https://res.cloudinary.com/dkdhdy9e5/image/upload/v1780653067/Portfolio/TGF_8295_u8vgah.jpg";

const ogImage =
  "https://res.cloudinary.com/dkdhdy9e5/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1773511403/Portfolio/og-cover_fq4xop.png";

function Home() {
  const { t, i18n } = useTranslation();

  const lang = i18n.language?.startsWith("es") ? "es" : "en";

  const titles = {
    es: "Diana Sauval Digital | Desarrollo Web Creativo y Full-Stack",
    en: "Diana Sauval Digital | Creative Full-Stack Web Developer",
  };

  const descriptions = {
    es: "Portfolio de Diana Sauval. Desarrollo sitios web modernos, creativos y optimizados con React, Node.js y MongoDB para artistas, profesionales y negocios.",
    en: "Portfolio of Diana Sauval. Creative websites with React, Node.js and MongoDB for artists, professionals and businesses.",
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

        <link
          rel="canonical"
          href="https://dianasauvaldigital.com.ar/"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={titles[lang]} />
        <meta property="og:description" content={descriptions[lang]} />
        <meta
          property="og:url"
          content="https://dianasauvaldigital.com.ar/"
        />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={titles[lang]} />
        <meta name="twitter:description" content={descriptions[lang]} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Diana Sauval",
            url: "https://dianasauvaldigital.com.ar/",
            image: homeImage,
            jobTitle: "Creative Full-Stack Developer",
            description:
              "Creative web developer specialized in React, Node.js and MongoDB.",
            sameAs: [
              "https://github.com/dianaSauval",
              "https://www.linkedin.com/in/diana-sauval/",
            ],
          })}
        </script>
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

          <h2 className="home-tech-title">
            React • Node.js • MongoDB • SEO • UI Design
          </h2>

          <Link to="/projects" className="cta-button glow-button">
            {t("home.cta")}
          </Link>

          {/* SEO */}
          <div className="seo-hidden">
            <h2>Desarrollo Web Creativo y Full Stack</h2>

            <p>
              Soy Diana Sauval, desarrolladora web full-stack especializada en
              React, Node.js y MongoDB. Diseño y desarrollo páginas web
              modernas, rápidas y optimizadas para artistas, profesionales y
              pequeños negocios.
            </p>

            <p>
              Desarrollo landing pages, portfolios profesionales, sitios web
              corporativos y aplicaciones completas con foco en SEO, rendimiento
              y experiencia de usuario.
            </p>

            <p>
              Trabajo con React, Vite, JavaScript, Node.js, Express, MongoDB,
              CSS, Cloudinary y diversas herramientas para crear experiencias
              digitales modernas.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;