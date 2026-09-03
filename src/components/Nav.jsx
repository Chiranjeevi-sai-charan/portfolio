import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import signature from "../assets/Sign V3.png";
import linkedinLogo from "../assets/LinkedIn Logo.png";
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
      <Link to="/" className={styles.brand} aria-label="Chiranjeevi Sai Charan, home" data-cursor-label="Home">
        <img src={signature} alt="" className={styles.signature} />
      </Link>
      <div className={styles.links}>
        <a href="/#about" data-cursor-label="About">About</a>
        <a href="/#achievements" data-cursor-label="Recognition">Recognition</a>
        <a href="/#work" data-cursor-label="Work">Work</a>
        <a href="/#stack" data-cursor-label="Toolkit">Toolkit</a>
        <a href="/#testimonials" className={styles.secondary} data-cursor-label="Recommendations">Recommendations</a>
        <a href="/#certifications" className={styles.secondary} data-cursor-label="Certifications">Certifications</a>
        <a
          href="https://flowcv.com/resume/avbobjk3o6"
          target="_blank"
          rel="noreferrer"
          className={styles.resumeCta}
          data-cursor-label="Resume"
        >
          Resume
        </a>
        <a
          href="https://www.linkedin.com/in/chiranjeevi-charan-k/"
          target="_blank"
          rel="noreferrer"
          className={styles.iconLink}
          aria-label="Message on LinkedIn"
          data-cursor-label="LinkedIn"
        >
          <img src={linkedinLogo} alt="" className={styles.linkedinIcon} />
        </a>
        <a
          href="mailto:98charan@gmail.com?subject=Let%27s%20talk&body=Hi%20Chiranjeevi%2C%0A%0A"
          className={styles.cta}
        >
          Say hello
        </a>
      </div>
    </nav>
  );
}
