// Tracks pointer/touch position into a ref (never React state, so
// it never triggers a re-render) — mirrors the mount-once
// listener + cleanup pattern already used by CustomCursor.jsx.
// The simulation reads this ref itself each animation frame; it
// does not push updates.

import { useEffect, useRef } from "react";
import { DOG_CONFIG } from "./dogConfig";

export default function usePointerTracker() {
  const pointerRef = useRef({ x: null, y: null, active: false, isTouch: false, lastMoveAt: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const p = pointerRef.current;
      p.x = e.clientX;
      p.y = e.clientY;
      p.active = true;
      p.isTouch = false;
      p.lastMoveAt = performance.now();
    };
    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      const p = pointerRef.current;
      p.x = t.clientX;
      p.y = t.clientY;
      p.active = true;
      p.isTouch = true;
      p.lastMoveAt = performance.now();
    };
    const onTouchEnd = () => {
      pointerRef.current.active = false;
    };
    // Cursor leaving the viewport entirely (not just moving between
    // elements) has relatedTarget === null on the outgoing mouseout.
    const onDocMouseOut = (e) => {
      if (!e.relatedTarget && !e.toElement) pointerRef.current.active = false;
    };
    const onBlur = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("mouseout", onDocMouseOut);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("mouseout", onDocMouseOut);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return pointerRef;
}

// Whether the pointer should currently be treated as "present" for
// curiosity purposes — touches auto-expire since mobile has no
// hover-and-rest, unlike a stationary mouse.
export function isPointerRecentlyActive(pointer, now) {
  if (pointer.x == null) return false;
  if (!pointer.isTouch) return pointer.active;
  return now - pointer.lastMoveAt < DOG_CONFIG.touchAttentionMs;
}
