import { useLayoutEffect, useRef, useState, useMemo } from "react";
import "../styles/Projects.css";
import { useTranslation } from "react-i18next";

import projectsES from "../assets/data/projects.es.json";
import projectsEN from "../assets/data/projects.en.json";

function Projects() {
  const { t, i18n } = useTranslation();

  const projectsData = useMemo(() => {
    const lng = i18n.language?.startsWith("es") ? "es" : "en";
    return lng === "es" ? projectsES : projectsEN;
  }, [i18n.language]);

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [phase, setPhase] = useState("idle"); // "idle" | "moving" | "revealing"

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
      }
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

  // ✅ Cuando cambia el idioma, cerramos cualquier card abierta para evitar desfasajes del FLIP
  useLayoutEffect(() => {
    setExpandedIndex(null);
    setPhase("idle");
    lastActiveIndexRef.current = null;
  }, [i18n.language]);

  // ESC para cerrar con animación
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

  // FLIP expand + collapse
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
    <div className="projects-container">
      <h1 className="fade-in-title-projects">{t("projects.title")}</h1>

      <div className={`projects-grid ${hasExpanded ? "has-expanded" : ""}`}>
        {projectsData.map((project, index) => {
          const isExpanded = expandedIndex === index;

          const isMoving = isExpanded && phase === "moving";
          const isRevealing = isExpanded && phase === "revealing";

          const hasTools = (project.tools?.length ?? 0) > 0;
          const hasHighlights = (project.highlights?.length ?? 0) > 0;

          const repoFront = project.repoFrontend || project.frontendRepo || null;
          const repoBack = project.repoBackend || project.backendRepo || null;
          const repoSingle = project.repo || null;

          return (
            <article
              key={index}
              ref={setCardRef(index)}
              className={[
                "project-card",
                "fade-up-text",
                isExpanded ? "is-expanded" : "",
                hasExpanded && !isExpanded ? "is-dimmed" : "",
                isExpanded && isMoving ? "phase-moving" : "",
                isExpanded && isRevealing ? "phase-revealing" : "",
              ].join(" ")}
            >
              <div className="project-media">
                <img
                  ref={setImgRef(index)}
                  src={project.image}
                  alt={project.title}
                  className={`project-image ${isExpanded ? "is-expanded" : ""}`}
                  loading="lazy"
                />
              </div>

              <div ref={setBodyRef(index)} className="project-body">
                <h2>{project.title}</h2>

                <p className="project-short">{project.description}</p>

                <div className={`project-details ${isRevealing ? "open" : ""}`}>
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
                        <h3 className="project-subtitle">{t("projects.tools")}</h3>
                        <div className="tools-chips">
                          {project.tools.map((tool, i) => (
                            <span className="tool-chip" key={i}>
                              {tool}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    {hasHighlights && (
                      <>
                        <h3 className="project-subtitle">{t("projects.highlights")}</h3>
                        <ul className="project-list">
                          {project.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
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
                >
                  <span className="expand-icon" aria-hidden="true">
                    {isExpanded ? "⤡" : "⤢"}
                  </span>
                  <span className="expand-text">
                    {isExpanded ? t("projects.collapse") : t("projects.expand")}
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
