import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramDetail from "./pages/ProgramDetail";

import { scrollToSection, useLenisScroll } from "./lib/lenis";

function Layout() {
  const location = useLocation();
  useLenisScroll();

  useEffect(() => {
    const sectionId = location.hash.slice(1);
    if (!sectionId) return;

    const frameId = requestAnimationFrame(() => scrollToSection(sectionId));
    return () => cancelAnimationFrame(frameId);
  }, [location.hash]);

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/checkout/:planId" element={<Checkout />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:programId" element={<ProgramDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
