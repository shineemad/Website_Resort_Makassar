import React, { useEffect, useRef } from "react";

/**
 * Custom magnetic cursor — desktop (pointer: fine) only.
 * - Inner dot: exact position, #F47C59
 * - Outer ring: lerp-smoothed, 1.5px border ring
 * - Hover states: links (ring expands), images/cards (ring shows "View")
 * - Respects prefers-reduced-motion (skips mounting entirely)
 */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // Only on fine-pointer (mouse) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // Skip for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    // Hide system cursor
    document.body.style.cursor = "none";

    let dotX = -200;
    let dotY = -200;
    let ringX = -200;
    let ringY = -200;
    let rafId = null;
    let visible = false;
    let currentState = "default"; // "default" | "hover" | "view"

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, dotX, 0.11);
      ringY = lerp(ringY, dotY, 0.11);

      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(animate);
    };

    const show = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const hide = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const applyState = (state) => {
      if (state === currentState) return;
      currentState = state;

      if (state === "hover") {
        ring.style.width = "50px";
        ring.style.height = "50px";
        ring.style.borderColor = "rgba(244,124,89,0.85)";
        ring.style.backgroundColor = "rgba(244,124,89,0.10)";
        dot.style.opacity = "0.4";
        dot.style.transform += " scale(0.5)";
        if (label) label.style.opacity = "0";
      } else if (state === "view") {
        ring.style.width = "68px";
        ring.style.height = "68px";
        ring.style.borderColor = "transparent";
        ring.style.backgroundColor = "rgba(244,124,89,0.90)";
        dot.style.opacity = "0";
        if (label) label.style.opacity = "1";
      } else {
        // default
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.borderColor = "rgba(244,124,89,0.60)";
        ring.style.backgroundColor = "transparent";
        dot.style.opacity = visible ? "1" : "0";
        if (label) label.style.opacity = "0";
      }
    };

    const onMouseMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;

      if (!visible) {
        visible = true;
        // Teleport ring to avoid initial slide from off-screen
        ringX = dotX;
        ringY = dotY;
        show();
        if (!rafId) rafId = requestAnimationFrame(animate);
      }
    };

    const onMouseLeave = () => {
      visible = false;
      hide();
    };
    const onMouseEnter = () => {
      if (visible) show();
    };

    // Delegated hover detection
    const INTERACTIVE =
      "a, button, [role='button'], input, label, [data-cursor]";

    const onMouseOver = (e) => {
      const target = e.target.closest(INTERACTIVE);
      if (!target) return;

      const cursorType = target.dataset?.cursor;
      if (cursorType === "view") {
        applyState("view");
      } else {
        applyState("hover");
      }
    };

    const onMouseOut = (e) => {
      // Only reset if we're leaving the matched element (not going to a child)
      const target = e.target.closest(INTERACTIVE);
      if (!target) return;
      const relatedTarget = e.relatedTarget;
      if (target.contains(relatedTarget)) return;
      applyState("default");
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Inner dot — exact position */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#F47C59",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          willChange: "transform",
          transition: "opacity 180ms ease",
        }}
      />

      {/* Outer ring — lerp smoothed */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1.5px solid rgba(244,124,89,0.60)",
          backgroundColor: "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          willChange: "transform",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition:
            "width 300ms cubic-bezier(0.22,1,0.36,1), height 300ms cubic-bezier(0.22,1,0.36,1), border-color 280ms ease, background-color 280ms ease, opacity 180ms ease",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "8px",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            color: "#FCF9F6",
            opacity: 0,
            userSelect: "none",
            transition: "opacity 200ms ease",
            pointerEvents: "none",
          }}
        >
          View
        </span>
      </div>
    </>
  );
}

export default Cursor;
