import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect } from "react";
import "./styles/sage/index.css";
import SmoothScroll from "./lib/SmoothScroll";
// import CustomCursor from "./components/CustomCursor";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import SageApp from "./pages/sage/SageApp";

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
        <Route path="/sage" element={<SageApp />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const location = useLocation();
  const isSageRoute = location.pathname === '/sage';

  // The Sage product is an app-like UI with its own internal scroll
  // regions, not a page-scroll storytelling experience — Lenis
  // (SmoothScroll) hijacks wheel events globally, which breaks internal
  // scrolling there (native scrollbar drag still works since that
  // bypasses wheel events, which is why only wheel/touchpad scroll
  // appeared broken). So it's excluded on this route entirely.
  if (isSageRoute) {
    return <AnimatedRoutes />;
  }

  return (
    <SmoothScroll>
      {/* <CustomCursor /> */}
      <Nav />
      <AnimatedRoutes />
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
