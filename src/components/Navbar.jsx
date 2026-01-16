import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import flagEs from "../assets/icons/flags/flag-es.svg";
import flagEn from "../assets/icons/flags/flag-en.svg";
import "../styles/Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
    setLangOpen(false);
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!langRef.current) return;
      if (!langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const currentLng = i18n.language?.startsWith("es") ? "es" : "en";

  const setLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    setLangOpen(false);
    setOpen(false);
  };

  const currentLabel = t(`lang.${currentLng}`);
  const currentFlagSrc = currentLng === "es" ? flagEs : flagEn;
  const currentFlagAlt = currentLng === "es" ? t("lang.es") : t("lang.en");

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            Diana Sauval
          </Link>
        </div>

        <button
          className="nav-toggle"
          aria-label={t("nav.openMenu")}
          aria-expanded={open}
          onClick={() => {
            setOpen(!open);
            setLangOpen(false);
          }}
        >
          <svg className="hamburger-icon" width="28" height="28" viewBox="0 0 100 100">
            <path className="line line1" d="M 20,30 H 80" />
            <path className="line line2" d="M 20,50 H 80" />
            <path className="line line3" d="M 20,70 H 80" />
          </svg>
        </button>

        <ul className="nav-links">
          <li>
            <Link to="/" onClick={handleLinkClick}>
              {t("nav.home")}
            </Link>
          </li>

          <li>
            <Link to="/about" onClick={handleLinkClick}>
              {t("nav.about")}
            </Link>
          </li>

          <li>
            <Link to="/projects" onClick={handleLinkClick}>
              {t("nav.projects")}
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={handleLinkClick}>
              {t("nav.contact")}
            </Link>
          </li>

          <li className="nav-lang" ref={langRef}>
            <button
              type="button"
              className={`lang-trigger ${langOpen ? "active" : ""}`}
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              aria-label={t("nav.language")}
            >
              {/* ✅ ahora también SVG en el botón */}
              <img src={currentFlagSrc} alt={currentFlagAlt} className="lang-flag" />
              <span className="lang-text">{currentLabel}</span>
              <span className="lang-caret" aria-hidden="true">▾</span>
            </button>

            {langOpen && (
              <div className="lang-menu" role="menu">
                <button
                  type="button"
                  className={`lang-option ${currentLng === "es" ? "selected" : ""}`}
                  onClick={() => setLanguage("es")}
                  role="menuitem"
                >
                  <img src={flagEs} alt={t("lang.es")} className="lang-flag" />
                  <span>{t("lang.es")}</span>
                </button>

                <button
                  type="button"
                  className={`lang-option ${currentLng === "en" ? "selected" : ""}`}
                  onClick={() => setLanguage("en")}
                  role="menuitem"
                >
                  <img src={flagEn} alt={t("lang.en")} className="lang-flag" />
                  <span>{t("lang.en")}</span>
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
