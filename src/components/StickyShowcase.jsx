/* Sticky-pin scroll storytelling — a visual pins in the viewport while
   steps of text scroll past it, common in Framer case-study templates.
   Pure CSS `position: sticky`, no scroll-jacking. */

import Reveal from "./Reveal";
import styles from "./StickyShowcase.module.css";

export default function StickyShowcase({ steps, pinnedLabel = "Preview" }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.stickyCol}>
        <div className={styles.card}>{pinnedLabel}</div>
      </div>
      <div className={styles.scrollCol}>
        {steps.map((s, i) => (
          <Reveal key={i} className={styles.step}>
            <div className={styles.num}>{String(i + 1).padStart(2, "0")}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
