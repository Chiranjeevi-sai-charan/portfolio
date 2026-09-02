/* Custom cursor: a design-tool style selection reticle (corner
   brackets around a crosshair, like Figma's frame/selection tool),
   with a small live coordinate readout, plus a "+" that morphs into
   an AI sparkle on hover of interactive elements. Disabled on touch
   devices and under prefers-reduced-motion, so nothing here is
   load-bearing for interaction, only decorative. */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (prefersReduced) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
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
    <motion.div className={styles.cursor} style={{ left: x, top: y }}>
      <svg
        className={`${styles.reticle} ${hovering ? styles.reticleHover : ""}`}
        width="34"
        height="34"
        viewBox="0 0 34 34"
      >
        {/* corner brackets, design-tool selection style */}
        <path d="M1 9 L1 1 L9 1" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        <path d="M25 1 L33 1 L33 9" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        <path d="M33 25 L33 33 L25 33" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 33 L1 33 L1 25" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        {/* center mark: crosshair by default, sparkle on hover */}
        {hovering ? (
          <path
            d="M17 9 L18.6 15.4 L25 17 L18.6 18.6 L17 25 L15.4 18.6 L9 17 L15.4 15.4 Z"
            fill="var(--ink)"
          />
        ) : (
          <path d="M17 13 L17 21 M13 17 L21 17" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
      <span className={styles.coords}>{coords.x}, {coords.y}</span>
    </motion.div>
  );
}
