/* Infinite horizontal scroller: content is duplicated once and the
   whole track slides by exactly -50%, so the loop point is invisible.
   Pauses on hover, and falls back to a static wrapped row entirely
   under prefers-reduced-motion (no half-measure, since a paused
   marquee is still a marquee). */

import { useReducedMotion } from "motion/react";
import styles from "./Marquee.module.css";

export default function Marquee({ children, speed = 28, className }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={`${styles.staticRow} ${className || ""}`}>{children}</div>;
  }

  return (
    <div className={`${styles.marquee} ${className || ""}`}>
      <div className={styles.track} style={{ animationDuration: `${speed}s` }}>
        <div className={styles.group}>{children}</div>
        <div className={styles.group} aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
