/* Custom cursor: the user's robot-hand artwork, cartoon-glove
   style. Arrow by default, matching the OS convention for a neutral
   pointer, swapping to the pointing-finger hand over interactive
   elements, matching the OS convention for "this is clickable"
   (the same semantic as native cursor: pointer). No tooltip label,
   just the two cursor images. Buttons that already have their own
   strong hover treatment (data-cursor-hide, e.g. the filled CTA
   pills) suppress this cursor entirely and fall back to the native
   pointer, since the button's own hover state is enough feedback.
   Disabled on touch devices and under prefers-reduced-motion, so
   nothing here is load-bearing for interaction, only decorative. */

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import cursorRegular from "../assets/Regular Cursor.png";
import cursorPointer from "../assets/Cursor Pointer.png";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 500, damping: 34, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 500, damping: 34, mass: 0.4 });

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
      if (e.target.closest("[data-cursor-hide]")) {
        setHidden(true);
        setHovering(false);
        return;
      }
      setHidden(false);
      setHovering(Boolean(e.target.closest("[data-cursor-label], a, button")));
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
    <motion.div
      className={styles.glossy}
      style={{ left: dotX, top: dotY }}
      animate={{ scale: hidden ? 0 : hovering ? 1.08 : 1 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      <img src={hovering ? cursorPointer : cursorRegular} alt="" />
    </motion.div>
  );
}
