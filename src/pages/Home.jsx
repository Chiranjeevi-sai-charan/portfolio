import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Parallax from "../components/Parallax";
import StickyShowcase from "../components/StickyShowcase";
import styles from "./Home.module.css";

const CASE_STUDIES = [
  {
    slug: "sentinel",
    tag: "Fintech · Fraud & risk",
    title: "Sentinel",
    blurb: "An explainable AI fraud-review dashboard with role-based workflows.",
  },
  {
    slug: "case-study-two",
    tag: "Coming soon",
    title: "Your next case study",
    blurb: "Slot in the next project here — same card shape, same animations.",
  },
];

const STEPS = [
  { title: "Research", body: "Understand the problem, the users, and what “good” looks like before touching a screen." },
  { title: "Design", body: "Explore structure and flow first, visual polish second." },
  { title: "Build", body: "Ship a real, interactive prototype — not just static frames." },
];

export default function Home() {
  return (
    <>
      <section className={styles.hero} id="top">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.kicker}>Product / UX Designer</div>
          <h1 className={styles.heroTitle}>Design that ships, not just decks. (synced ✓)</h1>
          <p className={styles.heroSub}>
            I design and build working product prototypes — case studies you can
            actually click through, not just scroll past.
          </p>
          <div className={styles.scrollHint}>↓ Scroll to see the work</div>
        </motion.div>
      </section>

      <section className={styles.section} id="work">
        <Reveal className={styles.sectionHead}>
          <div className={styles.kicker}>Selected work</div>
          <h2>Case studies</h2>
          <p>Each one is a real, interactive build — open it to try it, not just look at it.</p>
        </Reveal>

        <div className={styles.grid}>
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <Link to={`/case-studies/${c.slug}`} className={styles.card}>
                <div className={styles.cardMedia}>{c.title}</div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTag}>{c.tag}</div>
                  <h3>{c.title}</h3>
                  <p>{c.blurb}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Parallax speed={0.25}>
        <div className={styles.parallaxBand}>
          <Reveal>
            <h2>Scroll-linked motion, not just fade-ins.</h2>
            <p>This band drifts with your scroll position — the same technique behind Framer's parallax sections.</p>
          </Reveal>
        </div>
      </Parallax>

      <section className={styles.section} id="about">
        <Reveal className={styles.sectionHead}>
          <div className={styles.kicker}>How I work</div>
          <h2>Sticky-pinned process walkthrough</h2>
        </Reveal>
        <StickyShowcase steps={STEPS} pinnedLabel="Preview pins here" />
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Your Name</span>
        <span>Built with React, Motion &amp; Lenis</span>
      </footer>
    </>
  );
}
