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
          aria-label="Call me"
          data-cursor-label="Call"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.phoneIcon}>
            <path d="M17.92 7.02C17.45 6.18 16.84 5.46 16.07 4.91C15.3 4.36 14.41 3.97 13.46 3.75C12.51 3.53 11.51 3.49 10.55 3.62C9.59 3.75 8.68 4.06 7.86 4.53C7.04 5 6.32 5.6 5.77 6.31C5.22 7.02 4.84 7.81 4.64 8.65C4.44 9.49 4.43 10.36 4.59 11.2C4.75 12.04 5.08 12.83 5.55 13.54M10.07 13.02C10.9 13.85 11.97 14.44 13.15 14.72C14.33 15 15.54 14.97 16.7 14.62C17.86 14.27 18.88 13.62 19.62 12.73C20.36 11.84 20.78 10.75 20.84 9.63C20.9 8.51 20.6 7.4 19.96 6.44M7.86 4.53L4.59 1.26M19.62 12.73L22.89 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </a>
        <a
          href="mailto:98charan@gmail.com?subject=Let%27s%20talk&body=Hi%20Chiranjeevi%2C%0A%0A"
          className={styles.cta}
          data-cursor-label="Email"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.emailIcon}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 6l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
