import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Setea el idioma del documento para accesibilidad/SEO
    const lng = i18n.language?.startsWith("es") ? "es" : "en";
    document.documentElement.lang = lng;
  }, [i18n.language]);

  return (
    <Router>
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
