import useTimeOfDay from "../hooks/useTimeOfDay";
// import FlyingSilhouettes from "./FlyingSilhouettes";
import morningImg from "../assets/dynamic-bg-morning.webp";
import afternoonImg from "../assets/dynamic-bg-afternoon.webp";
import eveningImg from "../assets/dynamic-bg-evening.webp";
import nightImg from "../assets/dynamic-bg-night.webp";
import midnightImg from "../assets/dynamic-bg-midnight.webp";
import styles from "./TimeBackground.module.css";

const IMAGES = {
  morning: morningImg,
  afternoon: afternoonImg,
  evening: eveningImg,
  night: nightImg,
  midnight: midnightImg,
};

// Apple Dynamic Desktop-style wallpaper: one illustrated scene,
// re-rendered per time-of-day and crossfaded by local clock (see
// useTimeOfDay). Lives only in Home's hero section, filling its
// positioned parent (absolute inset:0). A scrim sits on top so the
// hero's white text keeps consistent contrast across all 5 scenes.
export default function TimeBackground() {
  const period = useTimeOfDay();

  return (
    <div className={styles.wrap} aria-hidden="true">
      {Object.entries(IMAGES).map(([p, src]) => (
        <img decoding="async"
          key={p}
          src={src}
          alt=""
          className={`${styles.layer} ${p === period ? styles.active : ""}`}
        />
      ))}
      <div className={styles.scrim} />
      {/* <FlyingSilhouettes period={period} /> */}
    </div>
  );
}
