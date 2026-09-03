import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import AchievementCard from "../components/AchievementCard";
import Marquee from "../components/Marquee";
// DogWorld (interactive dog character) is built but disabled for now —
// see src/components/DogWorld/. Re-enable by uncommenting this import
// and its mount point below in the hero section.
// import DogWorld from "../components/DogWorld/DogWorld";
import profilePic from "../assets/Profile Pic.png";
import achievementPic from "../assets/Achievement.jpg";
import figmaLogo from "../assets/Figma Logo.png";
import chatgptLogo from "../assets/ChatGPT Logo.png";
import chatgptLogoWhite from "../assets/chatgpt-white-logo.png";
import framerLogo from "../assets/Framer.png";
import styles from "./Home.module.css";

// Custom glyphs for tools with no real brand icon available (a
// generic concept like "Design Systems", or a product whose logo
// isn't published on the icon registry we use for the others).
const GLYPHS = {
  grid: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" fill="currentColor" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" fill="currentColor" />
    </svg>
  ),
};

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

const POSITIONING = [
  {
    label: "Goal",
    text: "A senior product design role at an enterprise AI or B2B SaaS company, leading design systems and strategy, not just shipping screens.",
  },
  {
    label: "Voice",
    text: "Decisions backed by research and usability testing, not just visual polish, validated with real users before anything ships.",
  },
  {
    label: "Audience",
    text: "Enterprises and fast-growing SaaS companies building AI-native products, where design maturity and design-engineering collaboration matter.",
  },
];

const STACK = [
  { name: "Figma", icon: figmaLogo },
  { name: "Framer", icon: framerLogo },
  { name: "React", icon: "https://cdn.simpleicons.org/react" },
  { name: "HTML/CSS", icon: "https://cdn.simpleicons.org/html5" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript" },
  { name: "Design Systems", glyph: "grid" },
  { name: "Claude", icon: "https://cdn.simpleicons.org/claude" },
  { name: "ChatGPT", icon: chatgptLogo, iconDark: chatgptLogoWhite },
];

const TESTIMONIALS = [
  {
    quote: "It was great to work with Chiranjeevi as his Project Manager where he consistently demonstrated strong UX design skills, creativity and a user-friendly approach. He is a collaborative and dependable professional who would be a great asset to any team.",
    name: "Pragati Bhatia",
    role: "PMO | Project Management | Strategy | Lead Engineer, MTSL",
    context: "Managed Chiranjeevi directly",
  },
  {
    quote: "Chiranjeevi is a talented Product Designer who combines creativity with technical understanding. He works well with cross-functional teams and consistently delivers intuitive, high-quality user experiences. It was great working with him.",
    name: "Nitesh Kumar Sahu",
    role: "UI/UX Designer, Enterprise & AI Products",
    context: "Worked together on the same team",
  },
];

const CERTIFICATIONS = [
  {
    title: "Design for the 21st Century with Don Norman",
    issuer: "Interaction Design Foundation",
    url: "https://ixdf.org/members/kondaka-chiranjeevi-sai-charan/certificate/course/98a16628-d5f8-423e-8667-786e62971343",
    image: "https://ixdf.org/certificates/course/98a16628-d5f8-423e-8667-786e62971343/extraLarge",
  },
  {
    title: "Google UX Design",
    issuer: "Google, via Coursera",
    url: "https://www.coursera.org/account/accomplishments/specialization/01NQXL311TLS",
    image: "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~01NQXL311TLS/CERTIFICATE_LANDING_PAGE~01NQXL311TLS.jpeg",
  },
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
            I design the UX layer of{" "}
            <span className={styles.underlineWord}>
              enterprise
              <svg className={styles.underlineSvg} viewBox="0 0 220 20" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 12 C 60 2, 160 2, 218 12" stroke="var(--accent)" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>{" "}
            AI.
          </h1>
          <p className={styles.heroSub}>
            5+ years turning complex, ambiguous workflows into interfaces that enterprise
            teams actually trust, from conversational search to fraud detection dashboards.
          </p>
          <div className={styles.heroActions}>
            <a href="#work" className={styles.primaryBtn}>See the work</a>
          </div>
        </motion.div>
        {/* <DogWorld className={styles.dogWorldSlot} /> */}
      </section>

      <section className={`${styles.section} ${styles.positioningSection}`} id="positioning">
        <Reveal className={styles.sectionHead}>
          <div className={styles.kicker}>Strategic Positioning</div>
          <h2>Where I'm headed, and who it's for</h2>
        </Reveal>
        <div className={styles.positioningRow}>
          {POSITIONING.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08} className={styles.positioningItem}>
              <div className={styles.positioningIndex}>0{i + 1}</div>
              <div className={styles.positioningLabel}>{p.label}</div>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
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
              patterns that hold up across a whole product, not just one flow, including{" "}
              <span className={styles.highlight}>a design system I shipped across three teams</span>.
              That instinct is also what earned my team{" "}
              <span className={styles.highlight}>recognition at a recent AI hackathon</span>.
            </p>
            <p>
              I also stretch beyond familiar screens when the problem calls for it, including{" "}
              <span className={styles.highlight}>designing immersive XR interfaces for Apple
              Vision Pro</span> using Apple&apos;s official visionOS UI kit.
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
                data-cursor-label="View case study"
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

      <section className={styles.section} id="stack">
        <Reveal className={styles.sectionHead}>
          <div className={styles.kicker}>Toolkit</div>
          <h2>What I design and build with</h2>
        </Reveal>
        <Marquee speed={26}>
          {STACK.map((tool) => (
            <span key={tool.name} className={styles.chip}>
              <span className={styles.chipIcon}>
                {tool.icon ? (
                  tool.iconDark ? (
                    <>
                      <img src={tool.icon} alt="" className={styles.iconLight} />
                      <img src={tool.iconDark} alt="" className={styles.iconDark} />
                    </>
                  ) : (
                    <img src={tool.icon} alt="" />
                  )
                ) : (
                  GLYPHS[tool.glyph]
                )}
              </span>
              {tool.name}
            </span>
          ))}
        </Marquee>
      </section>

      <section className={styles.section} id="testimonials">
        <Reveal className={styles.sectionHead}>
          <div className={styles.kicker}>Recommendations</div>
          <h2>What it's like to work with me</h2>
        </Reveal>
        <div className={styles.testimonialGrid}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              as="a"
              href="https://www.linkedin.com/in/chiranjeevi-charan-k/"
              target="_blank"
              rel="noreferrer"
              delay={i * 0.08}
              className={styles.testimonialCard}
              data-cursor-label="View on LinkedIn"
            >
              <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>{t.name.charAt(0)}</div>
                <div>
                  <div className={styles.testimonialName}>{t.name}</div>
                  <div className={styles.testimonialRole}>{t.role}</div>
                  <div className={styles.testimonialContext}>{t.context}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.section} id="certifications">
        <Reveal className={styles.sectionHead}>
          <div className={styles.kicker}>Certifications</div>
          <h2>Courses I've completed</h2>
        </Reveal>
        <div className={styles.certGrid}>
          {CERTIFICATIONS.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.06}>
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className={styles.certCard}
                data-cursor-label="View certificate"
              >
                <div className={styles.certThumb}>
                  <img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" />
                </div>
                <div className={styles.certCardBody}>
                  <div>
                    <div className={styles.certTitle}>{cert.title}</div>
                    <div className={styles.certIssuer}>{cert.issuer}</div>
                  </div>
                  <span className={styles.certArrow} aria-hidden="true">→</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Chiranjeevi Sai Charan Kondaka</span>
        <div className={styles.footerLinks}>
          <a href="https://www.linkedin.com/in/chiranjeevi-charan-k/" target="_blank" rel="noreferrer" data-cursor-label="Open">LinkedIn</a>
          <a href="mailto:98charan@gmail.com" data-cursor-label="Say hi">Email</a>
        </div>
      </footer>
    </>
  );
}
