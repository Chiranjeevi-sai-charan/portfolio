import { useEffect, useState } from "react";

// Buckets local clock time into 5 named periods so the ambient background
// can shift through a day, mirroring macOS's Dynamic Desktop concept.
function getPeriod(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";
  if (hour >= 20 && hour < 24) return "night";
  return "midnight"; // 0–5
}

export default function useTimeOfDay() {
  const [period, setPeriod] = useState(getPeriod);

  useEffect(() => {
    // Checking every minute is more than enough since periods only
    // change on hour boundaries — a live clock, not a live timer.
    const id = setInterval(() => setPeriod(getPeriod()), 60_000);
    return () => clearInterval(id);
  }, []);

  return period;
}
