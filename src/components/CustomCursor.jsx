/* Custom cursor: a glossy, 3D-beveled cursor pair in the site's
   cyan accent, styled after classic "cursor pack" pointer sets, an
   arrow at rest that swaps to a pointing hand over interactive
   elements. A dynamic label pill (styled like the site's own CTA
   buttons) appears alongside with contextual text supplied per
   element via data-cursor-label, e.g. "View case study" on a
   project card, "Say hi" on the contact link. Disabled on touch
   devices and under prefers-reduced-motion, so nothing here is
   load-bearing for interaction, only decorative. */

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
        className={styles.glossy}
        style={{ left: dotX, top: dotY }}
        animate={{ scale: label ? 1.08 : 1 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 32 32" width="30" height="30">
          <defs>
            <linearGradient id="cursorGloss" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent-soft)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
          {label ? (
            /* pointing hand: three fused rounded shapes, no internal
               stroke seams, dimensionality from gradient + drop-shadow */
            <g fill="url(#cursorGloss)">
              <rect x="9" y="20" width="11" height="7" rx="3.2" transform="rotate(-18 14.5 23.5)" />
              <rect x="9.5" y="14" width="14" height="13" rx="6" />
              <rect x="12.5" y="1" width="7" height="18" rx="3.4" />
            </g>
          ) : (
            <path
              d="M4 2.5 L4 26.5 L10 21 L14 29 L18.5 27 L14.5 19 L23 18.5 Z"
              fill="url(#cursorGloss)"
              stroke="var(--accent-text)"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </motion.div>
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
