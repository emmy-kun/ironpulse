import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramDetail from "./pages/ProgramDetail";

import { useLenisScroll } from "./lib/lenis";

function Layout() {
  useLenisScroll();
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
