import { NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollTopSmooth = () => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const handleNavClick = (to) => {
    setOpen(false);
    setLangOpen(false);

    if (location.pathname === to && window.scrollY > 0) {
      scrollTopSmooth();
    }
  };

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/" onClick={() => handleNavClick("/")}>
            <span className="brand-name">Diana Sauval</span>
            
          </NavLink>
        </div>

        <button
          className="nav-toggle"
          aria-label={t("nav.openMenu")}
          aria-expanded={open}
          onClick={() => {
            setOpen((v) => !v);
            setLangOpen(false);
          }}
        >
          <svg className="hamburger-icon" width="30" height="30" viewBox="0 0 100 100">
            <path className="line line1" d="M 22,32 H 78" />
            <path className="line line2" d="M 22,50 H 78" />
            <path className="line line3" d="M 22,68 H 78" />
          </svg>
        </button>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => handleNavClick(item.to)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          <li className="nav-lang" ref={langRef}>
            <button
              type="button"
              className={`lang-trigger ${langOpen ? "active" : ""}`}
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              aria-label={t("nav.language")}
            >
              <img src={currentFlagSrc} alt={currentFlagAlt} className="lang-flag" />
              <span className="lang-text">{currentLabel}</span>
              <span className="lang-caret" aria-hidden="true">
                ▾
              </span>
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