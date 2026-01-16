import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const KEY_PREFIX = "scroll-pos:";

function getKey(pathname) {
  return `${KEY_PREFIX}${pathname}`;
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}

function scrollToY(y, behavior = "smooth") {
  const finalBehavior = prefersReducedMotion() ? "auto" : behavior;
  window.scrollTo({ top: y, left: 0, behavior: finalBehavior });
}

export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType(); // "PUSH" | "POP" | "REPLACE"
  const { pathname } = location;

  // Guardar scroll mientras scrolleás (para poder restaurar)
  useEffect(() => {
    const onScroll = () => {
      // guardamos por ruta
      sessionStorage.setItem(getKey(pathname), String(window.scrollY));
    };

    // guardamos a cada scroll (suficiente para portfolio)
    window.addEventListener("scroll", onScroll, { passive: true });

    // guardamos también al desmontar/irnos, por las dudas
    return () => {
      window.removeEventListener("scroll", onScroll);
      sessionStorage.setItem(getKey(pathname), String(window.scrollY));
    };
  }, [pathname]);

  // Al cambiar de ruta:
  // - si es POP (volver/adelantar) => restaurar
  // - si es PUSH/REPLACE => ir arriba
  useEffect(() => {
    const saved = sessionStorage.getItem(getKey(pathname));
    const savedY = saved ? Number(saved) : 0;

    if (navType === "POP") {
      // Volver/adelantar: restaurar la posición
      // requestAnimationFrame para asegurar que el DOM ya renderizó
      requestAnimationFrame(() => scrollToY(savedY, "auto"));
    } else {
      // Navegación normal: arriba suave
      requestAnimationFrame(() => scrollToY(0, "smooth"));
    }
  }, [pathname, navType]);

  return null;
}
