import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop"; // 👈 nuevo
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Idioma del documento (SEO + accesibilidad)
    const lng = i18n.language?.startsWith("es") ? "es" : "en";
    document.documentElement.lang = lng;
  }, [i18n.language]);

  return (
    <Router>
      <ScrollToTop /> {/* 👈 clave */}
      <div className="app-container">
        <Navbar />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
