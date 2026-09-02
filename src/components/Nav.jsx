import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <Link to="/" className={styles.brand}>
        {/* "K" for Kondaka, drawn as strokes meeting at a sparkle
            instead of a sharp vertex, the star hiding inside the K. */}
        <svg className={styles.mark} viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
          <path d="M8 5 L8 27" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M9.5 16.5 L24 5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M9.5 16.5 L24 27" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <g transform="translate(9.5,16.5) scale(0.42) translate(-12,-11.5)">
            <path
              d="M12 1 C12.5 6.5 13.5 10 17.5 11.5 C13.5 13 12.5 16.5 12 22 C11.5 16.5 10.5 13 6.5 11.5 C10.5 10 11.5 6.5 12 1 Z"
              fill="var(--accent)"
            />
          </g>
        </svg>
        Chiranjeevi Sai Charan
      </Link>
      <div className={styles.links}>
        <a href="/#work">Work</a>
        <a href="/#about">About</a>
        <a href="mailto:98charan@gmail.com" className={styles.cta}>Say hello</a>
      </div>
    </nav>
  );
}
