import styles from "./FlyingSilhouettes.module.css";

const NOCTURNAL = new Set(["night", "midnight"]);

// Minimal flat-vector silhouette, matching the illustration style of
// the time-of-day scenes: a simple gull-wing "M" for daytime birds,
// a jagged-wing shape for nocturnal bats.
function Bird() {
  return (
    <svg viewBox="0 0 24 12" className={styles.silhouette} aria-hidden="true">
      <path
        d="M1 8 Q6 1 12 8 Q18 1 23 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function Bat() {
  return (
    <svg viewBox="0 0 24 12" className={styles.silhouette} aria-hidden="true">
      <path
        d="M0 6 L4 2 L6 6 L9 1 L12 7 L15 1 L18 6 L20 2 L24 6 L20 8 L12 6 L4 8 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Each entry: vertical position, animation duration/delay, and size —
// staggered so the flock doesn't move in obvious lockstep.
const FLOCK = [
  { top: "18%", duration: 22, delay: 0, scale: 1 },
  { top: "32%", duration: 26, delay: 4, scale: 0.75 },
  { top: "12%", duration: 30, delay: 9, scale: 0.6 },
];

export default function FlyingSilhouettes({ period }) {
  const Shape = NOCTURNAL.has(period) ? Bat : Bird;

  return (
    <div className={styles.wrap} aria-hidden="true">
      {FLOCK.map((f, i) => (
        <div
          key={i}
          className={styles.flyer}
          style={{
            top: f.top,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            transform: `scale(${f.scale})`,
          }}
        >
          <Shape />
        </div>
      ))}
    </div>
  );
}
