import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const topBladeRef = useRef(null);
  const bottomBladeRef = useRef(null);
  const contentRef = useRef(null);
  const kickerRef = useRef(null);
  const decorRef = useRef(null);
  const titleRef = useRef(null);
  const meterRef = useRef(null);
  const fillRef = useRef(null);
  const labelRef = useRef(null);
  const locationRef = useRef(null);
  const timelineRef = useRef(null);
  const didDoneRef = useRef(false);
  /* Stable ref for onComplete — prevents useLayoutEffect re-runs */
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const [mounted, setMounted] = useState(true);

  /* ── Lock scroll while preloader is active ── */
  useEffect(() => {
    if (!mounted) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  /* ── Run only once on mount (empty deps) ── */
  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const finish = () => {
      if (didDoneRef.current) return;
      didDoneRef.current = true;
      setMounted(false);
      if (onCompleteRef.current) onCompleteRef.current();
    };

    if (reduced) {
      const t = setTimeout(finish, 480);
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      /*
       * Blades start CLOSED (yPercent 0) — the preloader is visible
       * from the very first frame. We skip the "blade sweep-in" and
       * go straight to content reveal → counter → blades fly apart.
       */
      gsap.set(topBladeRef.current, { yPercent: 0 });
      gsap.set(bottomBladeRef.current, { yPercent: 0 });
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set(kickerRef.current, { opacity: 0, y: 14 });
      gsap.set(decorRef.current, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "center",
      });
      gsap.set(titleRef.current, { opacity: 0, y: 22 });
      gsap.set(meterRef.current, { opacity: 0, y: 10 });
      gsap.set(locationRef.current, { opacity: 0 });
      gsap.set(fillRef.current, { scaleX: 0, transformOrigin: "left center" });

      const meter = { v: 0 };

      const tl = gsap.timeline({ onComplete: finish });

      /* 1 — Content staggered reveal */
      tl.to(
        contentRef.current,
        { opacity: 1, duration: 0.18, ease: "none" },
        0.12,
      )
        .to(
          kickerRef.current,
          { opacity: 1, y: 0, duration: 0.48, ease: "power3.out" },
          0.18,
        )
        .to(
          decorRef.current,
          { opacity: 1, scaleX: 1, duration: 0.6, ease: "expo.out" },
          0.28,
        )
        .to(
          titleRef.current,
          { opacity: 1, y: 0, duration: 0.64, ease: "power3.out" },
          0.36,
        )
        .to(
          meterRef.current,
          { opacity: 1, y: 0, duration: 0.48, ease: "power3.out" },
          0.5,
        )
        .to(
          locationRef.current,
          { opacity: 1, duration: 0.52, ease: "power2.out" },
          0.58,
        )

        /* 2 — Counter 0 → 100 */
        .to(
          meter,
          {
            v: 100,
            duration: 2.4,
            ease: "power1.inOut",
            onUpdate() {
              const n = Math.round(meter.v);
              if (labelRef.current)
                labelRef.current.textContent = String(n).padStart(3, "0");
              if (fillRef.current)
                gsap.set(fillRef.current, { scaleX: n / 100 });
            },
          },
          0.62,
        )

        /* 3 — Hold briefly */
        .to({}, { duration: 0.2 })

        /* 4 — Content fades out */
        .to(
          contentRef.current,
          { opacity: 0, y: -14, duration: 0.4, ease: "power2.in" },
          ">",
        )
        .to(
          locationRef.current,
          { opacity: 0, duration: 0.26, ease: "power2.in" },
          "<0.06",
        )

        /* 5 — Blades fly apart: dramatic curtain-reveal */
        .to(
          topBladeRef.current,
          { yPercent: -100, duration: 0.96, ease: "expo.inOut" },
          ">0.10",
        )
        .to(
          bottomBladeRef.current,
          { yPercent: 100, duration: 0.96, ease: "expo.inOut" },
          "<",
        )

        /* 6 — Root disappears */
        .to(
          rootRef.current,
          { opacity: 0, duration: 0.18, ease: "none" },
          ">-0.12",
        );

      timelineRef.current = tl;
    }, rootRef);

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return (
    <div ref={rootRef} aria-hidden="true" className="pl-root">
      <style>{`
        /* ─── Root ─────────────────────────────────────────── */
        .pl-root {
          position: fixed;
          inset: 0;
          z-index: 10040;
          pointer-events: none;
          overflow: hidden;
          background: #17100a;
        }
        /* Warm ambient glow */
        .pl-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 56% at 50% 50%,
              rgba(244,124,89,0.12) 0%,
              rgba(244,124,89,0.04) 48%,
              transparent 72%);
          z-index: 1;
          pointer-events: none;
        }

        /* ─── Blades ────────────────────────────────────────── */
        .pl-blade {
          position: absolute;
          left: 0;
          right: 0;
          /* 51% prevents sub-pixel gap between blades */
          height: 51%;
          background: #1d1109;
          will-change: transform;
          z-index: 3;
        }
        .pl-blade.top    { top: 0; }
        .pl-blade.bottom { bottom: 0; }

        /* Hairline at the seam */
        .pl-blade.top::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(244,124,89,0.48) 20%,
            rgba(252,249,246,0.68) 50%,
            rgba(244,124,89,0.48) 80%,
            transparent 100%
          );
        }

        /* ─── Content ───────────────────────────────────────── */
        .pl-content {
          position: absolute;
          inset: 0;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 clamp(24px, 6vw, 96px);
          will-change: opacity, transform;
        }

        .pl-kicker {
          font-family: "Inter", sans-serif;
          font-size: 10px;
          letter-spacing: 2.8px;
          text-transform: uppercase;
          color: rgba(244,124,89,0.86);
          margin: 0 0 20px;
          will-change: opacity, transform;
        }

        .pl-decor {
          display: block;
          width: clamp(52px, 9vw, 88px);
          height: 1px;
          margin: 0 auto 28px;
          transform-origin: center;
          background: linear-gradient(
            to right,
            transparent,
            rgba(244,124,89,0.62) 28%,
            rgba(252,230,160,0.78) 50%,
            rgba(244,124,89,0.62) 72%,
            transparent
          );
          will-change: opacity, transform;
        }

        .pl-title {
          margin: 0 0 36px;
          font-family: "Instrument Serif", serif;
          font-weight: 200;
          font-size: clamp(42px, 6.2vw, 84px);
          line-height: 0.94;
          letter-spacing: -0.028em;
          color: #fcf9f6;
          max-width: 13ch;
          will-change: opacity, transform;
        }

        /* ─── Meter ─────────────────────────────────────────── */
        .pl-meter {
          display: flex;
          align-items: center;
          gap: 16px;
          width: min(400px, 70vw);
          will-change: opacity, transform;
        }

        .pl-track {
          flex: 1;
          position: relative;
          height: 1px;
          background: rgba(252,249,246,0.14);
        }
        /* Full-width dim underlay */
        .pl-track::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(244,124,89,0.18);
        }

        .pl-fill {
          position: absolute;
          inset: 0;
          transform: scaleX(0);
          transform-origin: left center;
          background: linear-gradient(
            to right,
            rgba(244,124,89,0.88),
            rgba(252,225,140,0.96)
          );
          will-change: transform;
        }

        /* Glowing dot at the leading edge */
        .pl-fill::after {
          content: "";
          position: absolute;
          right: -2px;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(252,235,170,0.98);
          box-shadow:
            0 0 6px rgba(252,225,140,0.82),
            0 0 14px rgba(244,124,89,0.56);
        }

        .pl-number {
          font-family: "Instrument Serif", serif;
          font-weight: 200;
          font-size: 15px;
          letter-spacing: 0.06em;
          color: rgba(252,249,246,0.56);
          min-width: 36px;
          text-align: right;
          line-height: 1;
        }

        /* ─── Location footer ───────────────────────────────── */
        .pl-location {
          position: absolute;
          bottom: clamp(24px, 4.5vh, 52px);
          left: 0; right: 0;
          text-align: center;
          font-family: "Inter", sans-serif;
          font-size: 9px;
          letter-spacing: 2.6px;
          text-transform: uppercase;
          color: rgba(252,249,246,0.22);
          z-index: 4;
          pointer-events: none;
          will-change: opacity;
        }
      `}</style>

      {/* Blades */}
      <div ref={topBladeRef} className="pl-blade top" />
      <div ref={bottomBladeRef} className="pl-blade bottom" />

      {/* Centre content */}
      <div ref={contentRef} className="pl-content">
        <p ref={kickerRef} className="pl-kicker">
          Makassar Golden Hotel
        </p>
        <span ref={decorRef} className="pl-decor" />
        <h2 ref={titleRef} className="pl-title">
          A Timeless Stay
          <br />
          By The Sea.
        </h2>

        <div ref={meterRef} className="pl-meter">
          <div className="pl-track">
            <span ref={fillRef} className="pl-fill" />
          </div>
          <span ref={labelRef} className="pl-number">
            000
          </span>
        </div>
      </div>

      {/* Location line */}
      <p ref={locationRef} className="pl-location">
        Pantai Losari · Sulawesi Selatan
      </p>
    </div>
  );
}

export default Preloader;
