import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const labelRef = useRef(null);
  const progressFillRef = useRef(null);
  const topBladeRef = useRef(null);
  const bottomBladeRef = useRef(null);
  const seamRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);
  const didCompleteRef = useRef(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!mounted) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted]);

  useLayoutEffect(() => {
    if (!mounted) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const finish = () => {
      if (didCompleteRef.current) return;
      didCompleteRef.current = true;
      setMounted(false);
      if (onComplete) onComplete();
    };

    if (reducedMotion) {
      const quickExit = window.setTimeout(finish, 720);
      return () => window.clearTimeout(quickExit);
    }

    const ctx = gsap.context(() => {
      gsap.set(progressFillRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(topBladeRef.current, {
        yPercent: 0,
        clipPath: "inset(50% 0 50% 0)",
      });
      gsap.set(bottomBladeRef.current, {
        yPercent: 0,
        clipPath: "inset(50% 0 50% 0)",
      });
      gsap.set(seamRef.current, { opacity: 0, scaleX: 0.34 });

      const meter = { value: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      tl.to(
        topBladeRef.current,
        { clipPath: "inset(0% 0 0% 0)", duration: 0.68, ease: "power2.out" },
        0,
      )
        .to(
          bottomBladeRef.current,
          { clipPath: "inset(0% 0 0% 0)", duration: 0.68, ease: "power2.out" },
          0,
        )
        .fromTo(
          seamRef.current,
          { opacity: 0, scaleX: 0.34 },
          { opacity: 1, scaleX: 1, duration: 0.54, ease: "power2.out" },
          0.08,
        )
        .fromTo(
          headingRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.86 },
          0.14,
        )
        .to(
          meter,
          {
            value: 100,
            duration: 2.85,
            ease: "power2.inOut",
            onUpdate: () => {
              const current = Math.round(meter.value);
              if (labelRef.current) labelRef.current.textContent = `${current}`;
              if (progressFillRef.current) {
                gsap.set(progressFillRef.current, { scaleX: current / 100 });
              }
            },
          },
          "<0.1",
        )
        .to({}, { duration: 0.24 })
        .to(headingRef.current, { y: -18, opacity: 0, duration: 0.58 }, ">")
        .to(
          topBladeRef.current,
          { yPercent: -102, duration: 0.98, ease: "power3.inOut" },
          ">-0.06",
        )
        .to(
          bottomBladeRef.current,
          { yPercent: 102, duration: 0.98, ease: "power3.inOut" },
          "<",
        )
        .to(
          seamRef.current,
          { opacity: 0, scaleX: 0.6, duration: 0.42, ease: "power2.out" },
          ">-0.5",
        )
        .to(
          rootRef.current,
          { opacity: 0, duration: 0.32, ease: "power2.out" },
          ">-0.04",
        );

      timelineRef.current = tl;
    }, rootRef);

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      ctx.revert();
    };
  }, [mounted, onComplete]);

  if (!mounted) return null;

  return (
    <div ref={rootRef} aria-hidden="true" className="preloader-root">
      <style>{`
        .preloader-root {
          position: fixed;
          inset: 0;
          z-index: 10040;
          pointer-events: none;
          background:
            radial-gradient(56% 46% at 74% 22%, rgba(244,124,89,0.24), transparent 72%),
            linear-gradient(160deg, rgba(36,18,8,0.99) 0%, #241208 56%, rgba(20,10,5,0.99) 100%);
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        .preloader-blade {
          position: absolute;
          left: 0;
          right: 0;
          height: 50%;
          background:
            linear-gradient(180deg, rgba(36,18,8,0.98) 0%, rgba(20,10,5,0.98) 100%);
          z-index: 3;
          will-change: transform, clip-path;
        }

        .preloader-blade.top {
          top: 0;
          border-bottom: 0.8px solid rgba(252,249,246,0.14);
        }

        .preloader-blade.bottom {
          bottom: 0;
          border-top: 0.8px solid rgba(252,249,246,0.14);
        }

        .preloader-seam {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(68vw, 760px);
          height: 1px;
          transform: translate(-50%, -50%);
          background: linear-gradient(
            to right,
            transparent,
            rgba(244,124,89,0.88) 22%,
            rgba(252,249,246,0.92) 50%,
            rgba(244,124,89,0.88) 78%,
            transparent
          );
          z-index: 5;
          pointer-events: none;
          will-change: opacity, transform;
        }

        .preloader-center {
          position: relative;
          z-index: 4;
          width: min(86vw, 680px);
          display: grid;
          gap: 14px;
        }

        .preloader-kicker {
          margin: 0;
          color: rgba(252,249,246,0.62);
          font-family: "Inter", sans-serif;
          font-size: 11px;
          line-height: 16px;
          letter-spacing: 1.3px;
          text-transform: uppercase;
        }

        .preloader-title {
          margin: 0;
          color: #fcf9f6;
          font-family: "Instrument Serif", serif;
          font-weight: 200;
          letter-spacing: -0.025em;
          line-height: 0.95;
          font-size: clamp(44px, 6.6vw, 88px);
          max-width: 12ch;
        }

        .preloader-meter {
          margin-top: 4px;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 12px;
        }

        .preloader-track {
          position: relative;
          height: 1px;
          background: rgba(252,249,246,0.24);
          overflow: hidden;
        }

        .preloader-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(244,124,89,0.95), rgba(252,249,246,0.94));
          transform: scaleX(0);
          transform-origin: left center;
          will-change: transform;
        }

        .preloader-number {
          min-width: 40px;
          color: rgba(252,249,246,0.78);
          font-family: "Inter", sans-serif;
          font-size: 11px;
          line-height: 16px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          text-align: right;
        }

        .preloader-number::after {
          content: "%";
          margin-left: 2px;
          color: rgba(252,249,246,0.48);
        }
      `}</style>

      <div ref={topBladeRef} className="preloader-blade top" />
      <div ref={bottomBladeRef} className="preloader-blade bottom" />
      <span ref={seamRef} className="preloader-seam" />

      <div ref={headingRef} className="preloader-center">
        <p className="preloader-kicker">Makassar Golden Hotel</p>
        <h2 className="preloader-title">A Timeless Stay By The Sea.</h2>

        <div className="preloader-meter">
          <div className="preloader-track">
            <span ref={progressFillRef} className="preloader-fill" />
          </div>
          <span ref={labelRef} className="preloader-number">
            0
          </span>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
