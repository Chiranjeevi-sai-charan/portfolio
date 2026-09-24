import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import linkedinLogo from "../assets/LinkedIn Logo.png";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // On Home, stay in hero mode until the hero section has fully
    // scrolled behind the nav — not just a few px, the whole fold —
    // so the transition doesn't fire the instant you nudge the wheel.
    const onScroll = () => {
      const hero = document.getElementById("top");
      if (hero) {
        setScrolled(hero.getBoundingClientRect().bottom <= 0);
      } else {
        setScrolled(window.scrollY > 8);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  // Escape and click-outside are standard expected behavior for
  // dropdown menus, even though the menu is already fully reachable
  // and closeable without them (re-click the button, or tab through).
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    const onClickOutside = (e) => {
      if (!e.target.closest(`.${styles.menu}`) && !e.target.closest(`.${styles.menuBtn}`)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [menuOpen]);

  // The wallpaper only exists behind the nav on Home's hero, before
  // scrolling past it — everywhere else (other routes, or scrolled
  // past the hero) there's just the plain page body underneath, so
  // forcing white text there would make it unreadable. The hero photo
  // always sits under a scrim (see TimeBackground), so text stays
  // white regardless of which time-of-day scene is showing — once
  // scrolled past, text falls back to the theme's own ink tokens.
  const heroMode = location.pathname === "/" && !scrolled;

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""} ${heroMode ? styles.heroMode : ""}`}>
      <Link to="/" className={styles.brand} data-cursor-label="Home">
        <span className={styles.brandName}>K. Chiranjeevi</span>
      </Link>

      <div className={styles.actions}>
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
          className={styles.iconBtn}
          aria-label="Message on LinkedIn"
          data-cursor-label="LinkedIn"
        >
          <img src={linkedinLogo} alt="" className={styles.linkedinIcon} />
        </a>
        <a
          href="tel:+8500518015"
          className={styles.iconBtn}
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

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {menuOpen && (
        <div id="nav-menu" className={styles.menu}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <a href="/#about" onClick={closeMenu}>About</a>
          <a href="/#experience" onClick={closeMenu}>Experience</a>
          <a href="/#achievements" onClick={closeMenu}>Recognition</a>
          <a href="/#work" onClick={closeMenu}>Work</a>
          <a href="/#stack" onClick={closeMenu}>Toolkit</a>
          <a href="/#testimonials" onClick={closeMenu}>Recommendations</a>
          <a href="/#certifications" onClick={closeMenu}>Certifications</a>
          <a
            href="https://flowcv.com/resume/avbobjk3o6"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className={styles.menuExtra}
          >
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/chiranjeevi-charan-k/"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className={styles.menuExtra}
          >
            LinkedIn
          </a>
          <a href="tel:+8500518015" onClick={closeMenu} className={styles.menuExtra}>
            Call
          </a>
        </div>
      )}
    </nav>
  );
}
