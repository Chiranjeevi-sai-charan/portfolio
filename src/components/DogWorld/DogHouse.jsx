// A restrained, static dog house — the dog's destination, not a
// focal illustration. Kept fully static (no animation at all) in
// Phase 1, which trivially satisfies reduced-motion for this part
// of the scene. React 19 passes `ref` as a plain prop, no
// forwardRef needed.

import { DOG_PALETTE } from "./dogConfig";
import styles from "./DogHouse.module.css";

export default function DogHouse({ ref }) {
  return (
    <svg ref={ref} viewBox="0 0 84 76" className={styles.house} aria-hidden="true">
      <rect x={8} y={34} width={68} height={38} rx={4} fill={DOG_PALETTE.furLight} />
      <path d="M2 38 L42 6 L82 38 Z" fill={DOG_PALETTE.furDark} />
      <path d="M30 72 L30 46 Q30 40 36 40 L48 40 Q54 40 54 46 L54 72 Z" fill={DOG_PALETTE.ink} />
      <circle cx={16} cy={20} r={2.2} fill={DOG_PALETTE.accent} opacity={0.85} />
      <circle cx={12} cy={26} r={1.6} fill={DOG_PALETTE.accent} opacity={0.7} />
      <circle cx={20} cy={27} r={1.6} fill={DOG_PALETTE.accent} opacity={0.7} />
    </svg>
  );
}
