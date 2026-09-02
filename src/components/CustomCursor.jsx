/* Custom cursor: a small dot that follows the mouse, and a
   dynamic label pill (styled like the site's own CTA buttons) that
   appears next to it with contextual text supplied per-element via
   data-cursor-label, e.g. "View case study" on a project card,
   "Say hi" on the contact link. Disabled on touch devices and under
   prefers-reduced-motion, so nothing here is load-bearing for
   interaction, only decorative. */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 500, damping: 34, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 500, damping: 34, mass: 0.4 });
  const pillX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const pillY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });

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
      const target = e.target.closest("[data-cursor-label]");
      setLabel(target ? target.getAttribute("data-cursor-label") : null);
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
        className={styles.dot}
        style={{ left: dotX, top: dotY }}
        animate={{ scale: label ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className={styles.pill}
        style={{ left: pillX, top: pillY }}
        initial={false}
        animate={{
          opacity: label ? 1 : 0,
          scale: label ? 1 : 0.7,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.div>
    </>
  );
}
