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

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <Link to="/" className={styles.brand} data-cursor-label="Home">
        <div className={styles.brandContent}>
          <img src={signature} alt="" className={styles.signature} />
          <span className={styles.brandName}>K. Chiranjeevi</span>
        </div>
      </Link>
      <div className={styles.links}>
        <Link to="/" data-cursor-label="Home">Home</Link>
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
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.externalLinkIcon}>
            <path d="M10 2h4v4M14 2L8 8M6 2H2v12h12V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
          href="tel:+8500518015"
          className={styles.iconLink}
          title="+8500518015"
          aria-label="Call me"
          data-cursor-label="Call"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.callIcon}>
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
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
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
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
              <path d="M10 2h4v4M14 2L8 8M6 2H2v12h12V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
