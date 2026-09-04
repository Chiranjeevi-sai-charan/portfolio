import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal from './Reveal';
import styles from './InteractiveTimeline.module.css';

export default function InteractiveTimeline({ experiences }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.timeline}>
        <div className={styles.line} />
        <div className={styles.dots}>
          {experiences.map((_, i) => (
            <motion.button
              key={i}
              className={`${styles.dot} ${activeIndex === i ? styles.active : ''}`}
              onClick={() => setActiveIndex(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <span className={styles.dotInner} />
            </motion.button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Reveal className={styles.experienceItem}>
              <div className={styles.experienceHead}>
                <div>
                  <div className={styles.experienceRole}>{experiences[activeIndex].role}</div>
                  <div className={styles.experienceCompany}>{experiences[activeIndex].company}</div>
                </div>
                <div className={styles.experiencePeriod}>{experiences[activeIndex].period}</div>
              </div>
              <ul className={styles.experienceHighlights}>
                {experiences[activeIndex].highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </Reveal>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.navigation}>
        <button
          onClick={() => setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length)}
          className={styles.navBtn}
        >
          ← Previous
        </button>
        <span className={styles.navCounter}>{activeIndex + 1} of {experiences.length}</span>
        <button
          onClick={() => setActiveIndex((prev) => (prev + 1) % experiences.length)}
          className={styles.navBtn}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
