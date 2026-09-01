/* Fade + rise reveal, triggered once when the element enters the
   viewport. The building block for scroll-triggered storytelling. */

import { motion, useReducedMotion } from "motion/react";

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 28,
  className,
  ...rest
}) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial={prefersReduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
