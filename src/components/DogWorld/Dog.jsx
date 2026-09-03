// An original, simplified side-profile dog inspired by the
// reference collage's cream/tan Shih-Tzu-style character and
// 8-color palette — not a trace or embed of that image. Default
// orientation (scaleX 1) faces right; parts are grouped so a pose
// can be expressed purely through data-pose CSS (see
// Dog.module.css) without touching this markup.

import { motion } from "motion/react";
import { DOG_PALETTE } from "./dogConfig";
import styles from "./Dog.module.css";

export default function Dog({ x, y, scaleX, pose }) {
  return (
    <motion.svg
      viewBox="0 0 128 140"
      className={styles.dog}
      style={{ x, y, scaleX }}
      data-pose={pose}
      aria-hidden="true"
    >
      {/* tail, drawn first so the body overlaps its base */}
      <ellipse className={styles.tail} data-part="tail" cx={16} cy={78} rx={9} ry={17}
        transform="rotate(24 16 78)" fill={DOG_PALETTE.furMid} />

      {/* back + front legs */}
      <g className={styles.legs} data-part="legs">
        <rect x={34} y={110} width={13} height={27} rx={6.5} fill={DOG_PALETTE.furDark} />
        <rect x={78} y={112} width={13} height={26} rx={6.5} fill={DOG_PALETTE.furMid} />
      </g>

      {/* body */}
      <ellipse className={styles.body} data-part="body" cx={58} cy={98} rx={35} ry={25} fill={DOG_PALETTE.furLight} />

      {/* collar */}
      <circle cx={90} cy={85} r={3} fill={DOG_PALETTE.accent} />

      {/* head group: skull, snout, ear, eye, nose */}
      <g className={styles.head} data-part="head">
        <circle cx={98} cy={68} r={23} fill={DOG_PALETTE.cream} />
        <ellipse cx={117} cy={76} rx={11} ry={8.5} fill={DOG_PALETTE.furLight} />
        <circle cx={126} cy={77} r={2.6} fill={DOG_PALETTE.ink} />
        <ellipse className={styles.ear} data-part="ear" cx={84} cy={76} rx={10} ry={19}
          transform="rotate(-12 84 76)" fill={DOG_PALETTE.furDark} />
        <ellipse className={styles.eye} data-part="eye" cx={101} cy={62} rx={3} ry={3.4} fill={DOG_PALETTE.ink} />
      </g>
    </motion.svg>
  );
}
