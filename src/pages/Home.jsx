import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import Parallax from "../components/Parallax";
import AchievementCard from "../components/AchievementCard";
import profilePic from "../assets/Profile Pic.jpg";
import achievementPic from "../assets/Achievement.jpg";
import styles from "./Home.module.css";

const CASE_STUDIES = [
  {
    slug: "flowops",
    tag: "Enterprise AI · Workflow automation",
    title: "FlowOps",
    blurb: "A node-based canvas for building, testing, and deploying AI-powered enterprise workflows.",
  },
  {
    slug: "sentinel",
    tag: "Fintech · Fraud & risk",
    title: "Sentinel",
    blurb: "An explainable fraud-detection dashboard with role-based workflows for credit-union teams.",
  },
  {
    slug: "myghmc",
    tag: "Civic tech · Mobile",
    title: "MyGHMC App Redesign",
    blurb: "A redesigned civic services app for Hyderabad citizens, blending simplicity with AI assistance.",
  },
];

const STACK = [
  "Figma", "FigJam", "Framer", "React", "HTML/CSS", "JavaScript",
  "Design Systems", "Claude", "ChatGPT",
];

export default function Home() {
  return (
    <>
      <section className={styles.hero} id="top">
        <div className={styles.heroPhotoCol}>
          <motion.img
            src={profilePic}
            alt="Chiranjeevi Sai Charan Kondaka"
            className={styles.heroPortrait}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <motion.div
          className={styles.heroTextCol}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.kicker}>Product Designer, Enterprise AI & B2B SaaS</div>
          <h1 className={styles.heroTitle}>
            I design the UX layer of enterprise AI.
            <svg className={styles.underline} viewBox="0 0 300 20" aria-hidden="true">
              <path d="M2 14 C 80 4, 220 4, 298 14" stroke="var(--accent)" strokeWidth="5" fill="none" strokeLinecap="round" />
            </svg>
          </h1>
          <p className={styles.heroSub}>
            5+ years turning complex, ambiguous workflows into interfaces that enterprise
            teams actually trust, from conversational search to fraud detection dashboards.
          </p>
          <div className={styles.heroActions}>
            <a href="#work" className={styles.primaryBtn} data-cursor-hover>See the work</a>
            <a href="mailto:98charan@gmail.com" className={styles.textLink} data-cursor-hover>Say hello</a>
          </div>
        </motion.div>
      </section>

      <section className={styles.section} id="about">
        <Reveal className={styles.aboutGrid}>
          <div>
            <div className={styles.kicker}>About</div>
            <h2>I design for what&apos;s actually buildable.</h2>
          </div>
          <div className={styles.aboutBody}>
            <p>
              I am a product designer with a front-end development background, which means
              I design with what is actually <span className={styles.highlight}>buildable</span> in
              mind, not just what looks good in a mockup. Most of my recent work is enterprise
              AI: <span className={styles.highlight}>conversational search, document intelligence,
              RAG</span>, and multimodal interactions, simplified into interfaces people can
              actually use without a manual.
            </p>
            <p>
              I care about systems more than one-off screens.{" "}
              <span className={styles.highlight}>Reusable components, design tokens</span>, and
              patterns that hold up across a whole product, not just one flow. That instinct is
              also what earned my team <span className={styles.highlight}>recognition at a recent
              AI hackathon</span>.
            </p>
          </div>
        </Reveal>
      </section>

      <section className={styles.section} id="achievements">
        <Reveal className={styles.sectionHead}>
          <div className={styles.kicker}>Recognition</div>
          <h2>A recent win worth mentioning</h2>
        </Reveal>
        <Reveal>
          <AchievementCard
            image={achievementPic}
            imageAlt="Chiranjeevi holding the Best Concept Design certificate and trophy at Hackathon AI and ML 2025"
            eyebrow="1st Runner Up · Hackathon AI & ML 2025"
            title="Best Concept Design, Reusability Component"
            body="Recognized at Motherson Technology Services' Hackathon AI & ML 2025 for a reusable, scalable design approach to AI-led solutions, built with a small team under a tight timeline through fast iteration and shared ownership."
          />
        </Reveal>
      </section>

      <section className={styles.section} id="work">
        <Reveal className={styles.sectionHead}>
          <div className={styles.kicker}>Selected work</div>
          <h2>Case studies</h2>
          <p>Each one is a real, interactive build, open it to try it, not just look at it.</p>
        </Reveal>

        <div className={styles.grid}>
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <Link
                to={`/case-studies/${c.slug}`}
                className={styles.card}
                data-cursor-hover
              >
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
            <h2>I bridge design and engineering.</h2>
            <p>Five years of front-end development means I hand off designs developers can build without guesswork.</p>
          </Reveal>
        </div>
      </Parallax>

      <section className={styles.section} id="stack">
        <Reveal className={styles.sectionHead}>
          <div className={styles.kicker}>Toolkit</div>
          <h2>What I design and build with</h2>
        </Reveal>
        <div className={styles.chipRow}>
          {STACK.map((tool, i) => (
            <motion.span
              key={tool}
              className={styles.chip}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4, rotate: (i % 2 === 0 ? -3 : 3) }}
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Chiranjeevi Sai Charan Kondaka</span>
        <div className={styles.footerLinks}>
          <a href="https://www.linkedin.com/in/chiranjeevi-charan-k/" target="_blank" rel="noreferrer" data-cursor-hover>LinkedIn</a>
          <a href="mailto:98charan@gmail.com" data-cursor-hover>Email</a>
        </div>
      </footer>
    </>
  );
}
