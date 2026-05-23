import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const T = {
  primary: "#F47C59",
  secondary: "#241208",
  tertiary: "#92CFF2",
  neutral: "#FCF9F6",
  display: '"Instrument Serif", serif',
  body: '"Inter", sans-serif',
  border: "0.8px solid rgba(36,18,8,0.22)",
  shadow:
    "rgba(0,0,0,0.035) 0px 2.8px 2.2px, rgba(0,0,0,0.047) 0px 6.7px 5.3px, rgba(0,0,0,0.06) 0px 12.5px 10px, rgba(0,0,0,0.07) 0px 22.3px 17.9px, rgba(0,0,0,0.086) 0px 41.8px 33.4px, rgba(0,0,0,0.12) 0px 100px 80px",
};

const STORY_STEPS = [
  {
    year: "1985",
    title: "Awal Sebuah Ikon",
    headline: "Awal Sebuah Ikon",
    highlight: "Pantai Losari Menjadi Panggung Pertama.",
    copy: "Makassar Golden Hotel berdiri sebagai pelopor keramahan bintang 4 di jantung kota, tepat di tepian Pantai Losari.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=75",
  },
  {
    year: "1998",
    title: "Ruang Untuk Momen Besar",
    headline: "Ruang Untuk Momen Besar",
    highlight: "Alamat Utama Perayaan Kota.",
    copy: "Ribuan tamu dari berbagai kota merayakan momen penting di sini, menjadikannya alamat yang dipercaya lintas generasi.",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=75",
  },
  {
    year: "Hari Ini",
    title: "Heritage Bertemu Modernitas",
    headline: "Heritage Bertemu Modernitas",
    highlight: "Relevan Dan Hangat.",
    copy: "Keanggunan klasik tetap terjaga, berpadu dengan fasilitas modern dan akses terbaik ke kuliner serta situs sejarah Makassar.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=75",
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const pinWrapRef = useRef(null);
  const lineRef = useRef(null);
  const visualRef = useRef(null);
  const imageRef = useRef(null);
  const yearRef = useRef(null);
  const captionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsViewportRef = useRef(null);
  const cardsTrackRef = useRef(null);
  const cardRefs = useRef([]);
  const cardOffsetsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const [activeImage, setActiveImage] = useState(STORY_STEPS[0].image);
  const [activeStory, setActiveStory] = useState(STORY_STEPS[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const storyStepProgress = 1 / STORY_STEPS.length;
    const cleanupCallbacks = [];

    const ctx = gsap.context(() => {
      const measureCardOffsets = () => {
        const cards = cardRefs.current.filter(Boolean);

        if (!cards.length) return;

        const baseOffset = cards[0].offsetTop;
        cardOffsetsRef.current = cards.map(
          (card) => card.offsetTop - baseOffset,
        );
      };

      if (!prefersReducedMotion) {
        // ── Image column entrance (left side) ──
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 1.0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          },
        );

        gsap.fromTo(
          visualRef.current,
          { x: -28, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
            },
          },
        );

        gsap.to(imageRef.current, {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: pinWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });

        // ── Content column entrance (right side) ──
        const contentCol =
          sectionRef.current?.querySelector(".abt-content-col");
        if (contentCol) {
          const eyebrow = contentCol.querySelector(".abt-eyebrow");
          const headline = contentCol.querySelector(".abt-headline");
          const divider = contentCol.querySelector(".abt-divider");
          const viewport = contentCol.querySelector(".abt-viewport");
          const steps = contentCol.querySelector(".abt-steps");

          gsap.fromTo(
            eyebrow,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              ease: "power3.out",
              delay: 0.08,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
              },
            },
          );

          gsap.fromTo(
            headline,
            { opacity: 0, y: 36, clipPath: "inset(0 0 100% 0)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.0,
              ease: "expo.out",
              delay: 0.18,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
              },
            },
          );

          gsap.fromTo(
            [divider, viewport, steps],
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.82,
              stagger: 0.1,
              ease: "power2.out",
              delay: 0.34,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
              },
            },
          );
        }
      }

      const swapActiveStory = (index) => {
        if (index === activeIndexRef.current) return;
        activeIndexRef.current = index;

        if (prefersReducedMotion) {
          setActiveImage(STORY_STEPS[index].image);
          setActiveStory(STORY_STEPS[index]);
          setActiveIndex(index);
          return;
        }

        gsap.killTweensOf([
          imageRef.current,
          captionRef.current,
          headlineRef.current,
        ]);

        gsap
          .timeline()
          .to(
            [imageRef.current, captionRef.current, headlineRef.current],
            {
              opacity: 0,
              y: 14,
              duration: 0.42,
              ease: "power3.inOut",
            },
            0,
          )
          .call(
            () => {
              setActiveImage(STORY_STEPS[index].image);
              setActiveStory(STORY_STEPS[index]);
              setActiveIndex(index);
            },
            null,
            0.42,
          )
          .to(
            [imageRef.current, captionRef.current, headlineRef.current],
            {
              opacity: 1,
              y: 0,
              duration: 0.62,
              ease: "power3.out",
            },
            0.52,
          );
      };

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        if (!prefersReducedMotion) {
          gsap.fromTo(
            card,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
                once: true,
              },
            },
          );
        }
      });

      measureCardOffsets();

      const setCardTrackPosition = (index) => {
        const track = cardsTrackRef.current;
        if (!track) return;

        const offset = cardOffsetsRef.current[index] ?? 0;
        if (prefersReducedMotion) {
          track.style.transform = `translate3d(0, ${-offset}px, 0)`;
        } else {
          gsap.to(track, {
            y: -offset,
            duration: 0.56,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      setCardTrackPosition(0);

      if (!prefersReducedMotion) {
        ScrollTrigger.create({
          trigger: pinWrapRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (STORY_STEPS.length + 0.55)}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          onUpdate: (self) => {
            const steppedProgress = Math.min(self.progress * 0.9999, 0.9999);
            const nextIndex = Math.min(
              STORY_STEPS.length - 1,
              Math.floor(steppedProgress / storyStepProgress),
            );

            swapActiveStory(nextIndex);

            cardRefs.current.forEach((card, index) => {
              if (!card) return;
              const distance = index - nextIndex;
              const absDistance = Math.abs(distance);
              const opacity =
                absDistance === 0
                  ? 1
                  : distance < 0
                    ? absDistance === 1
                      ? 0.02
                      : 0
                    : absDistance === 1
                      ? 0.34
                      : 0.12;
              const shiftY =
                absDistance === 0
                  ? 0
                  : distance < 0
                    ? -44 - (absDistance - 1) * 18
                    : 28 + (absDistance - 1) * 14;
              const scale = absDistance === 0 ? 1 : distance < 0 ? 0.93 : 0.978;
              const blur = absDistance === 0 ? 0 : distance < 0 ? 6 : 1.2;
              const brightness =
                absDistance === 0 ? 1 : distance < 0 ? 0.9 : 0.98;
              const pointerEvents = absDistance === 0 ? "auto" : "none";

              card.style.opacity = `${opacity}`;
              card.style.transform = `translateY(${shiftY}px) scale(${scale})`;
              card.style.filter = `blur(${blur}px) brightness(${brightness})`;
              card.style.pointerEvents = pointerEvents;
              card.style.zIndex = `${STORY_STEPS.length - absDistance}`;
            });

            setCardTrackPosition(nextIndex);
          },
        });

        const handleRefreshInit = () => {
          measureCardOffsets();
          setCardTrackPosition(activeIndexRef.current);
        };

        ScrollTrigger.addEventListener("refreshInit", handleRefreshInit);
        cleanupCallbacks.push(() => {
          ScrollTrigger.removeEventListener("refreshInit", handleRefreshInit);
        });
        ScrollTrigger.refresh();
      } else {
        setCardTrackPosition(activeIndexRef.current);
      }
    }, sectionRef);

    return () => {
      cleanupCallbacks.forEach((callback) => callback());
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        /* ─── Story card — dark minimal ─────────────────── */
        .story-card {
          position: relative;
          padding: clamp(14px, 1.8vh, 22px) 0;
          border-top: 0.8px solid rgba(252,249,246,0.08);
          transform-origin: center top;
          transition:
            opacity 300ms ease,
            transform 300ms cubic-bezier(0.4,0,0.2,1),
            filter 300ms ease,
            border-color 300ms ease;
        }
        .story-card::before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: #F47C59;
          transform: scaleY(0);
          transform-origin: top center;
          transition: transform 0.44s cubic-bezier(0.22,1,0.36,1);
        }
        .story-card.is-active::before {
          transform: scaleY(1);
        }
        .story-card.is-active {
          border-top-color: rgba(244,124,89,0.32);
        }
        .story-track {
          width: 100%;
          will-change: transform;
          /* transform animated by GSAP */
        }

        /* ─── Split frame ───────────────────────────────── */
        .abt-frame {
          display: grid;
          grid-template-columns: 54fr 46fr;
          height: 100svh;
          min-height: 600px;
          overflow: hidden;
          position: relative;
        }

        /* ─── Image column ──────────────────────────────── */
        .abt-img-col {
          position: relative;
          overflow: hidden;
          height: 100%;
        }
        .abt-img-col img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          will-change: transform;
        }
        .abt-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,6,3,0.92) 0%,
            rgba(10,6,3,0.40) 38%,
            rgba(10,6,3,0.10) 65%,
            transparent 100%
          );
          pointer-events: none;
        }
        .abt-img-caption {
          position: absolute;
          bottom: clamp(40px, 5.5vh, 64px);
          left: clamp(36px, 4.5vw, 60px);
          right: clamp(36px, 4.5vw, 60px);
        }
        .abt-year {
          font-family: "Instrument Serif", serif;
          font-weight: 200;
          font-size: clamp(72px, 8.4vw, 128px);
          line-height: 0.86;
          letter-spacing: -0.045em;
          color: rgba(252,249,246,0.92);
          display: block;
          margin-bottom: 14px;
        }
        .abt-img-title {
          font-family: "Inter", sans-serif;
          font-size: 10px;
          letter-spacing: 2.0px;
          text-transform: uppercase;
          color: rgba(252,249,246,0.44);
          margin: 0;
        }
        /* Top orange accent line */
        .abt-top-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          overflow: hidden;
          z-index: 4;
        }
        .abt-line-fill {
          height: 100%;
          background: linear-gradient(
            to right,
            #F47C59 0%,
            rgba(244,124,89,0.36) 100%
          );
          transform-origin: left center;
        }

        /* ─── Content column ────────────────────────────── */
        .abt-content-col {
          background: #170e08;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 clamp(36px, 5.5vw, 80px);
          position: relative;
          overflow: hidden;
        }
        /* Subtle texture glow */
        .abt-content-col::before {
          content: "";
          position: absolute;
          top: -30%;
          right: -20%;
          width: 70%;
          height: 70%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(244,124,89,0.07) 0%,
            transparent 70%
          );
          pointer-events: none;
        }
        .abt-eyebrow {
          font-family: "Inter", sans-serif;
          font-size: 10px;
          letter-spacing: 2.4px;
          text-transform: uppercase;
          color: #F47C59;
          margin: 0 0 clamp(18px, 2.4vh, 28px);
        }
        .abt-headline {
          font-family: "Instrument Serif", serif;
          font-weight: 200;
          font-size: clamp(38px, 4.4vw, 66px);
          line-height: 0.96;
          letter-spacing: -0.028em;
          color: #fcf9f6;
          margin: 0 0 clamp(20px, 2.6vh, 30px);
        }
        .abt-divider {
          height: 0.8px;
          background: rgba(252,249,246,0.10);
          margin-bottom: clamp(20px, 2.6vh, 30px);
        }
        .abt-viewport {
          overflow: hidden;
          height: clamp(130px, 18vh, 200px);
          -webkit-mask-image: linear-gradient(to bottom, black 78%, transparent 100%);
          mask-image: linear-gradient(to bottom, black 78%, transparent 100%);
          flex-shrink: 0;
        }
        .abt-card-body {
          font-family: "Inter", sans-serif;
          font-size: 14px;
          line-height: 1.72;
          letter-spacing: -0.016em;
          color: rgba(252,249,246,0.68);
          margin: 0;
          padding-left: 16px;
        }
        /* Step indicators */
        .abt-steps {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: clamp(24px, 3.2vh, 40px);
        }
        .abt-step-pip {
          height: 2px;
          border-radius: 1px;
          background: rgba(252,249,246,0.20);
          transition: width 0.36s cubic-bezier(0.22,1,0.36,1), background 0.36s ease;
          flex-shrink: 0;
        }
        .abt-step-pip.active {
          background: #F47C59;
        }
        .abt-step-count {
          font-family: "Inter", sans-serif;
          font-size: 10px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: rgba(252,249,246,0.26);
        }

        /* ─── Mobile / tablet ───────────────────────────── */
        @media (max-width: 1023px) {
          .abt-frame {
            grid-template-columns: 1fr;
            height: auto;
          }
          .abt-img-col {
            height: clamp(320px, 48vw, 520px);
          }
          .abt-content-col {
            padding: clamp(48px, 8vw, 80px) clamp(24px, 6vw, 48px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .story-card,
          .story-track,
          .story-card::before,
          .abt-step-pip {
            transition: none;
          }
        }
      `}</style>

      <section ref={sectionRef} id="about">
        <div ref={pinWrapRef} className="abt-frame">
          {/* ── LEFT: full-bleed image column ── */}
          <div ref={visualRef} className="abt-img-col">
            <img
              ref={imageRef}
              src={activeImage}
              alt={activeStory.title}
              loading="lazy"
              decoding="async"
            />
            <div className="abt-img-overlay" />

            {/* Top accent line (lineRef) */}
            <div className="abt-top-line">
              <div ref={lineRef} className="abt-line-fill" />
            </div>

            {/* Year + title caption */}
            <div className="abt-img-caption">
              <div ref={captionRef}>
                <span ref={yearRef} className="abt-year">
                  {activeStory.year}
                </span>
                <p className="abt-img-title">{activeStory.title}</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: editorial content column ── */}
          <div className="abt-content-col">
            <p className="abt-eyebrow">Warisan Kemewahan Makassar</p>

            <h2 ref={headlineRef} className="abt-headline">
              {activeStory.headline}
              <br />
              <em>{activeStory.highlight}</em>
            </h2>

            <div className="abt-divider" />

            {/* Cards viewport */}
            <div ref={cardsViewportRef} className="abt-viewport">
              <div
                ref={cardsTrackRef}
                className="story-track"
                style={{ display: "flex", flexDirection: "column", gap: 0 }}
              >
                {STORY_STEPS.map((step, index) => (
                  <div
                    key={step.year}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={`story-card${activeIndex === index ? " is-active" : ""}`}
                  >
                    <p className="abt-card-body">{step.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step indicators */}
            <div className="abt-steps">
              {STORY_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`abt-step-pip${activeIndex === i ? " active" : ""}`}
                  style={{ width: activeIndex === i ? "24px" : "6px" }}
                />
              ))}
              <span className="abt-step-count">
                0{activeIndex + 1} · 0{STORY_STEPS.length}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
