import { useLayoutEffect, useRef, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import "../styles/Projects.css";

import projectsES from "../assets/data/projects.es.json";
import projectsEN from "../assets/data/projects.en.json";
import projectsFR from "../assets/data/projects.fr.json";

const siteUrl = "https://dianasauvaldigital.com.ar";
const canonicalUrl = `${siteUrl}/projects`;

const ogImage =
  "https://res.cloudinary.com/dkdhdy9e5/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1773511403/Portfolio/og-cover_fq4xop.png";

function Projects() {
  const { t, i18n } = useTranslation();

  const lang = i18n.language?.startsWith("fr")
    ? "fr"
    : i18n.language?.startsWith("es")
      ? "es"
      : "en";

  const seoTitle = {
    es: "Proyectos Web · React, Node.js y MongoDB | Diana Sauval Digital",
    en: "Web Projects · React, Node.js and MongoDB | Diana Sauval Digital",
    fr: "Projets Web · React, Node.js et MongoDB | Diana Sauval Digital",
  }[lang];

  const seoDescription = {
    es: "Proyectos web desarrollados por Diana Sauval: sitios modernos, portfolios, landing pages y aplicaciones full-stack con React, Node.js, MongoDB, SEO y diseño responsive.",
    en: "Web projects by Diana Sauval: modern websites, portfolios, landing pages and full-stack applications built with React, Node.js, MongoDB, SEO and responsive design.",
    fr: "Projets web développés par Diana Sauval : sites modernes, portfolios, landing pages et applications full-stack avec React, Node.js, MongoDB, SEO et design responsive.",
  }[lang];

  const projectsData = useMemo(() => {
    if (lang === "fr") return projectsFR;
    if (lang === "es") return projectsES;
    return projectsEN;
  }, [lang]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seoTitle,
    description: seoDescription,
    url: canonicalUrl,
    inLanguage: lang,
    creator: {
      "@type": "Person",
      name: "Diana Sauval",
      url: siteUrl,
      jobTitle: "Creative Full-Stack Developer",
      sameAs: [
        "https://github.com/dianaSauval",
        "https://www.linkedin.com/in/diana-sauval/",
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projectsData.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.longDescription || project.description,
          image: project.image,
          url: project.link,
          keywords: project.tools?.join(", "),
        },
      })),
    },
  };

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [phase, setPhase] = useState("idle");

  const cardRefs = useRef([]);
  const imgRefs = useRef([]);
  const bodyRefs = useRef([]);
  const lastActiveIndexRef = useRef(null);

  const setCardRef = (i) => (el) => (cardRefs.current[i] = el);
  const setImgRef = (i) => (el) => (imgRefs.current[i] = el);
  const setBodyRef = (i) => (el) => (bodyRefs.current[i] = el);

  const flipAnimate = (el, firstRect, lastRect, opts = {}) => {
    if (!el || !firstRect || !lastRect) return;

    const dx = firstRect.left - lastRect.left;
    const dy = firstRect.top - lastRect.top;
    const sx = firstRect.width / lastRect.width;
    const sy = firstRect.height / lastRect.height;

    el.getAnimations?.().forEach((a) => a.cancel());

    el.animate(
      [
        {
          transformOrigin: "top left",
          transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`,
        },
        {
          transformOrigin: "top left",
          transform: "translate(0px, 0px) scale(1, 1)",
        },
      ],
      {
        duration: opts.duration ?? 820,
        easing: opts.easing ?? "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
      },
    );
  };

  const snapshotRects = (index) => {
    const imgEl = imgRefs.current[index];
    const bodyEl = bodyRefs.current[index];
    const cardEl = cardRefs.current[index];
    if (!imgEl || !bodyEl || !cardEl) return;

    cardEl.__prevRects = {
      img: imgEl.getBoundingClientRect(),
      body: bodyEl.getBoundingClientRect(),
    };
  };

  const toggleExpand = (index) => {
    lastActiveIndexRef.current = index;
    snapshotRects(index);

    setPhase("moving");
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  useLayoutEffect(() => {
    setExpandedIndex(null);
    setPhase("idle");
    lastActiveIndexRef.current = null;
  }, [i18n.language]);

  useLayoutEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && expandedIndex !== null) {
        const idx = expandedIndex;
        lastActiveIndexRef.current = idx;
        snapshotRects(idx);
        setPhase("moving");
        setExpandedIndex(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [expandedIndex]);

  useLayoutEffect(() => {
    const indexToAnimate =
      expandedIndex !== null ? expandedIndex : lastActiveIndexRef.current;

    if (indexToAnimate === null || indexToAnimate === undefined) {
      setPhase("idle");
      return;
    }

    const cardEl = cardRefs.current[indexToAnimate];
    const imgEl = imgRefs.current[indexToAnimate];
    const bodyEl = bodyRefs.current[indexToAnimate];

    if (!cardEl || !imgEl || !bodyEl) {
      setPhase("idle");
      return;
    }

    const firstImg = cardEl.__prevRects?.img;
    const firstBody = cardEl.__prevRects?.body;

    if (!firstImg || !firstBody) {
      setPhase(expandedIndex !== null ? "revealing" : "idle");
      return;
    }

    requestAnimationFrame(() => {
      const lastImg = imgEl.getBoundingClientRect();
      const lastBody = bodyEl.getBoundingClientRect();

      flipAnimate(imgEl, firstImg, lastImg, { duration: 820 });
      flipAnimate(bodyEl, firstBody, lastBody, { duration: 820 });

      window.clearTimeout(cardEl.__phaseTimer);
      cardEl.__phaseTimer = window.setTimeout(() => {
        setPhase(expandedIndex !== null ? "revealing" : "idle");
      }, 860);
    });

    return () => window.clearTimeout(cardEl.__phaseTimer);
  }, [expandedIndex]);

  const hasExpanded = expandedIndex !== null;

  return (
    <>
      <Helmet>
        <html lang={lang} />

        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content={lang === "es" ? "es_ES" : lang === "fr" ? "fr_FR" : "en_US"} />
        <meta property="og:site_name" content="Diana Sauval Digital" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Proyectos web de Diana Sauval Digital" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Proyectos web de Diana Sauval Digital" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="projects-container">
        <div className="projects-ambient" aria-hidden="true">
          <span className="projects-orbit orbit-one" />
          <span className="projects-orbit orbit-two" />
          <span className="projects-glow glow-one" />
          <span className="projects-glow glow-two" />
        </div>

        <h1 className="fade-in-title-projects">{t("projects.title")}</h1>

        <p className="seo-hidden">
          Diana Sauval Digital presenta proyectos de desarrollo web creativo,
          diseño web responsive, aplicaciones full-stack, portfolios
          profesionales, landing pages, sitios para artistas, sitios para
          profesionales y soluciones digitales desarrolladas con React, Vite,
          Node.js, Express, MongoDB, Cloudinary, SEO técnico y diseño de
          experiencia de usuario.
        </p>

        <div className={`projects-grid ${hasExpanded ? "has-expanded" : ""}`}>
          {projectsData.map((project, index) => {
            const isExpanded = expandedIndex === index;
            const isMoving = isExpanded && phase === "moving";
            const isRevealing = isExpanded && phase === "revealing";

            const hasTools = (project.tools?.length ?? 0) > 0;
            const hasHighlights = (project.highlights?.length ?? 0) > 0;

            const repoFront =
              project.repoFrontend || project.frontendRepo || null;
            const repoBack = project.repoBackend || project.backendRepo || null;
            const repoSingle = project.repo || null;

            return (
              <article
                key={`${project.title}-${index}`}
                ref={setCardRef(index)}
                className={[
                  "project-card",
                  "fade-up-text",
                  isExpanded ? "is-expanded" : "",
                  hasExpanded && !isExpanded ? "is-dimmed" : "",
                  isExpanded && isMoving ? "phase-moving" : "",
                  isExpanded && isRevealing ? "phase-revealing" : "",
                ].join(" ")}
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                <div className="project-media">
                  <img
                    ref={setImgRef(index)}
                    src={project.image}
                    alt={`${project.title} · proyecto web desarrollado por Diana Sauval`}
                    className={`project-image ${isExpanded ? "is-expanded" : ""}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    itemProp="image"
                  />
                </div>

                <div ref={setBodyRef(index)} className="project-body">
                  <h2 itemProp="name">{project.title}</h2>

                  <p className="project-short" itemProp="description">
                    {project.description}
                  </p>

                  <div
                    className={`project-details ${isRevealing ? "open" : ""}`}
                  >
                    <p className="project-long">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  <div className="project-actions">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-button glow-button"
                      itemProp="url"
                    >
                      {t("projects.viewProject")}
                    </a>

                    {isRevealing && (
                      <>
                        {repoFront && (
                          <a
                            href={repoFront}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="secondary-button"
                          >
                            {t("projects.codeFrontend")}
                          </a>
                        )}

                        {repoBack && (
                          <a
                            href={repoBack}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="secondary-button"
                          >
                            {t("projects.codeBackend")}
                          </a>
                        )}

                        {!repoFront && !repoBack && repoSingle && (
                          <a
                            href={repoSingle}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="secondary-button"
                          >
                            {t("projects.code")}
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div
                  className={[
                    "project-extra",
                    isRevealing ? "open" : "",
                    !hasTools && !hasHighlights ? "is-empty" : "",
                  ].join(" ")}
                  aria-hidden={!isRevealing}
                >
                  {(hasTools || hasHighlights) && (
                    <div className="project-extra-inner">
                      {hasTools && (
                        <>
                          <h3 className="project-subtitle">
                            {t("projects.tools")}
                          </h3>

                          <div className="tools-chips">
                            {project.tools.map((tool, i) => (
                              <span
                                className="tool-chip"
                                key={`${tool}-${i}`}
                                itemProp="keywords"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </>
                      )}

                      {hasHighlights && (
                        <>
                          <h3 className="project-subtitle">
                            {t("projects.highlights")}
                          </h3>

                          <ul className="project-list">
                            {project.highlights.map((h, i) => (
                              <li key={`${h}-${i}`}>{h}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="project-footer">
                  <button
                    type="button"
                    className={`expand-button ${isExpanded ? "open" : ""}`}
                    onClick={() => toggleExpand(index)}
                    aria-expanded={isExpanded}
                    aria-label={
                      isExpanded
                        ? `Cerrar detalles de ${project.title}`
                        : `Ver más detalles de ${project.title}`
                    }
                  >
                    <span className="expand-icon" aria-hidden="true">
                      {isExpanded ? "⤡" : "⤢"}
                    </span>

                    <span className="expand-text">
                      {isExpanded
                        ? t("projects.collapse")
                        : t("projects.expand")}
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Projects;