import useTimeOfDay from "../hooks/useTimeOfDay";
import morningImg from "../assets/dynamic-bg-morning.png";
import afternoonImg from "../assets/dynamic-bg-afternoon.png";
import eveningImg from "../assets/dynamic-bg-evening.png";
import nightImg from "../assets/dynamic-bg-night.png";
import midnightImg from "../assets/dynamic-bg-midnight.png";
import styles from "./TimeBackground.module.css";

const IMAGES = {
  morning: morningImg,
  afternoon: afternoonImg,
  evening: eveningImg,
  night: nightImg,
  midnight: midnightImg,
};

// Apple Dynamic Desktop-style wallpaper: one fixed illustrated scene,
// re-rendered per time-of-day and crossfaded by local clock (see
// useTimeOfDay). A var(--bg)-tinted scrim sits on top so foreground
// text (which sits directly on this background in several sections)
// keeps its usual contrast regardless of which image or theme is active.
export default function TimeBackground() {
  const period = useTimeOfDay();

  return (
    <div className={styles.wrap} aria-hidden="true">
      {Object.entries(IMAGES).map(([p, src]) => (
        <img
          key={p}
          src={src}
          alt=""
          className={`${styles.layer} ${p === period ? styles.active : ""}`}
        />
      ))}
      <div className={styles.scrim} />
    </div>
  );
}
