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
      <Link to="/" className={styles.brand}>Your Name</Link>
      <div className={styles.links}>
        <a href="/#work">Work</a>
        <a href="/#about">About</a>
        <a href="mailto:you@example.com" className={styles.cta}>Say hello</a>
      </div>
    </nav>
  );
}
