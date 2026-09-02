/* Hover-tilt card: rotates slightly toward the cursor on hover,
   settles back to flat on leave. Purely a hover affordance, so it
   degrades to a static card with no listeners under reduced motion. */

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import styles from "./AchievementCard.module.css";

export default function AchievementCard({ image, imageAlt, eyebrow, eyebrowStyle, title, body }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      style={prefersReduced ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor-hover
    >
      {image && (
        <div className={styles.media}>
          <img src={image} alt={imageAlt} />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.eyebrow} style={eyebrowStyle}>{eyebrow}</div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </motion.div>
  );
}
