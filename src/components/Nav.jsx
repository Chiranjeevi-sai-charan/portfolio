import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import signature from "../assets/Sign V3.png";
import linkedinLogo from "../assets/LinkedIn Logo.png";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <Link to="/" className={styles.brand} aria-label="Chiranjeevi Sai Charan, home" data-cursor-label="Home">
        <div className={styles.brandContent}>
          <img src={signature} alt="" className={styles.signature} />
          <span className={styles.brandName}>K. Chiranjeevi</span>
        </div>
      </Link>
      <div className={styles.links}>
        <a href="/#about" data-cursor-label="About">About</a>
        <a href="/#experience" className={styles.secondary} data-cursor-label="Experience">Experience</a>
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
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.downloadIcon}>
            <path d="M8 2v7.5M8 9.5 5 6.5M8 9.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 12v1.2A1.8 1.8 0 0 0 4.8 15h6.4A1.8 1.8 0 0 0 13 13.2V12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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

      <button
        className={styles.mobileMenuBtn}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Menu"
        aria-expanded={mobileMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <a href="/#about" onClick={closeMobileMenu}>About</a>
          <a href="/#experience" onClick={closeMobileMenu}>Experience</a>
          <a href="/#achievements" onClick={closeMobileMenu}>Recognition</a>
          <a href="/#work" onClick={closeMobileMenu}>Work</a>
          <a href="/#stack" onClick={closeMobileMenu}>Toolkit</a>
          <a href="/#testimonials" onClick={closeMobileMenu}>Recommendations</a>
          <a href="/#certifications" onClick={closeMobileMenu}>Certifications</a>
          <a href="https://flowcv.com/resume/avbobjk3o6" target="_blank" rel="noreferrer" onClick={closeMobileMenu} className={styles.mobileMenuResume}>
            Resume
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v7.5M8 9.5 5 6.5M8 9.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 12v1.2A1.8 1.8 0 0 0 4.8 15h6.4A1.8 1.8 0 0 0 13 13.2V12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/chiranjeevi-charan-k/" target="_blank" rel="noreferrer" onClick={closeMobileMenu} className={styles.mobileMenuLinkedin}>
            <img src={linkedinLogo} alt="LinkedIn" />
            LinkedIn
          </a>
        </div>
      )}
    </nav>
  );
}
