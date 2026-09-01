import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import SmoothScroll from "./lib/SmoothScroll";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  // Jump to top on route change (Lenis-aware).
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/case-studies/:slug" element={<PageTransition><CaseStudy /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <BrowserRouter>
        <Nav />
        <AnimatedRoutes />
      </BrowserRouter>
    </SmoothScroll>
  );
}
