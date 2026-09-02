/* Custom cursor: a clean vector arrow (the classic "design tool"
   pointer look) plus a soft trailing ring that expands on hover of
   interactive elements. Disabled on touch devices and under
   prefers-reduced-motion, so nothing here is load-bearing for
   interaction, only decorative. */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 250, damping: 26, mass: 0.5 });

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
  }, [prefersReduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className={styles.ring}
        style={{ left: ringX, top: ringY }}
        animate={{
          width: hovering ? 48 : 28,
          height: hovering ? 48 : 28,
          opacity: hovering ? 1 : 0.5,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.svg
        className={styles.arrow}
        style={{ left: x, top: y }}
        animate={{ scale: hovering ? 0.85 : 1 }}
        transition={{ duration: 0.15 }}
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          d="M2 1.5 L2 16.5 L6.2 12.6 L8.7 18.2 L11 17.1 L8.6 11.7 L14.5 11.3 Z"
          fill="var(--ink)"
          stroke="var(--bg)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </motion.svg>
    </>
  );
}
