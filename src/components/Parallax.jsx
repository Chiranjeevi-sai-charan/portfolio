/* Scroll-linked parallax — the element's position is tied continuously
   to scroll progress through its own container, not to a one-time
   trigger. `speed` > 0 drifts slower than scroll (background feel);
   `speed` < 0 drifts faster (foreground pop). */

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export default function Parallax({ children, speed = 0.3, className }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = 120 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={prefersReduced ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}
