import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language;

    const lng = currentLang?.startsWith("fr")
      ? "fr"
      : currentLang?.startsWith("en")
      ? "en"
      : "es";

    document.documentElement.lang = lng;
  }, [i18n.language]);

  return (
    <Router>
      <ScrollToTop />

      <div className="app-container">
        <Navbar />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;