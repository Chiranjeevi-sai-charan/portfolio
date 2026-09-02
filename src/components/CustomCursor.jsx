/* Custom cursor: a stylized 3D-looking pointing hand that follows the
   mouse, tilts slightly with movement direction, and "points" harder
   on hover of interactive elements. Disabled on touch devices and
   under prefers-reduced-motion, so nothing here is load-bearing for
   interaction, only decorative. */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 400, damping: 32, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 400, damping: 32, mass: 0.5 });

  const velocityX = useSpring(x, { stiffness: 200, damping: 40 });
  const tilt = useTransform(velocityX, (v) => {
    const dx = x.get() - v;
    return Math.max(-18, Math.min(18, dx * 1.2));
  });

  useEffect(() => {
    if (prefersReduced) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      setHovering(Boolean(e.target.closest("a, button, [data-cursor-hover]")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("custom-cursor");
    };
  }, [prefersReduced, x, y, velocityX]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`${styles.hand} ${hovering ? styles.pointing : ""}`}
      style={{ left: smoothX, top: smoothY, rotate: tilt }}
    >
      <svg viewBox="0 0 64 64" width="44" height="44">
        <defs>
          <linearGradient id="handBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--tag-2-fg)" />
            <stop offset="100%" stopColor="var(--tag-3-fg)" />
          </linearGradient>
        </defs>
        {/* palm */}
        <path
          d="M20 34 Q18 50 28 56 Q40 60 48 50 Q54 42 50 32 L50 22 Q50 18 46 18 Q42 18 42 22 L42 30 L40 30 L40 16 Q40 12 36 12 Q32 12 32 16 L32 30 L30 30 L30 14 Q30 10 26 10 Q22 10 22 14 L22 30 L20 30 Z"
          fill="url(#handBody)"
        />
        {/* pointing index finger, extends further when hovering */}
        <rect
          x="26"
          y="4"
          width="8"
          height="28"
          rx="4"
          fill="url(#handBody)"
          className={styles.finger}
        />
      </svg>
    </motion.div>
  );
}
