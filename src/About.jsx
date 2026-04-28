import React, { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=960&q=80",
  },
  {
    year: "1998",
    title: "Ruang Untuk Momen Besar",
    headline: "Ruang Untuk Momen Besar",
    highlight: "Alamat Utama Perayaan Kota.",
    copy: "Ribuan tamu dari berbagai kota merayakan momen penting di sini, menjadikannya alamat yang dipercaya lintas generasi.",
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=960&q=80",
  },
  {
    year: "Hari Ini",
    title: "Heritage Bertemu Modernitas",
    headline: "Heritage Bertemu Modernitas",
    highlight: "Ikonik, Relevan, Dan Selalu Hangat.",
    copy: "Keanggunan klasik tetap terjaga, berpadu dengan fasilitas modern dan akses terbaik ke kuliner serta situs sejarah Makassar.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=960&q=80",
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
        cardOffsetsRef.current = cards.map((card) => card.offsetTop - baseOffset);
      };

      if (!prefersReducedMotion) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          },
        );

        gsap.fromTo(
          visualRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
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
            scrub: 1.4,
          },
        });
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
        track.style.transform = `translate3d(0, ${-offset}px, 0)`;
      };

      setCardTrackPosition(0);

      if (!prefersReducedMotion) {
        ScrollTrigger.create({
          trigger: pinWrapRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (STORY_STEPS.length + 0.55)}`,
          pin: true,
          scrub: 1.05,
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
              const brightness = absDistance === 0 ? 1 : distance < 0 ? 0.9 : 0.98;
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
        .story-card {
          position: relative;
          overflow: hidden;
          border-radius: 0px;
          transform-origin: center top;
          box-shadow: 0 20px 36px rgba(36, 18, 8, 0.06);
          transition: background-color 300ms ease, border-color 300ms ease, transform 480ms cubic-bezier(0.22, 1, 0.36, 1), opacity 360ms ease, filter 420ms ease, box-shadow 420ms ease;
        }

        .story-track {
          width: 100%;
          will-change: transform;
          transition: transform 760ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        .story-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, rgba(244,124,89,0.18) 0%, rgba(244,124,89,0.86) 45%, rgba(244,124,89,0.28) 100%);
          transform: scaleY(0.34);
          transform-origin: center;
          opacity: 0;
          transition: opacity 300ms ease, transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .story-card.is-active::before {
          opacity: 1;
          transform: scaleY(1);
        }

        .story-card.is-active {
          box-shadow: 0 28px 60px rgba(36, 18, 8, 0.1);
        }

        .story-card:hover {
          background-color: rgba(244, 124, 89, 0.05);
          border-color: rgba(36, 18, 8, 0.3);
          transform: translateY(-1px);
        }

        .about-pin-wrap {
          position: relative;
        }

        .about-visual-sticky {
          position: sticky;
          top: 7rem;
          height: fit-content;
        }

        .about-desktop-frame {
          min-height: 100svh;
          display: flex;
          align-items: center;
        }

        .about-desktop-grid {
          align-items: center;
        }

        .about-copy-column {
          display: grid;
          grid-template-rows: auto auto auto minmax(0, 1fr) auto;
          align-content: start;
          row-gap: clamp(12px, 1.6vh, 18px);
        }

        .about-cards-viewport {
          min-height: 0;
          height: clamp(250px, 31vh, 320px);
          align-items: flex-start;
          margin-bottom: clamp(14px, 2.2vh, 24px);
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 84%, rgba(0, 0, 0, 0));
        }

        .about-headline {
          text-wrap: balance;
          margin-bottom: 0;
        }

        .about-divider {
          margin-bottom: 0;
        }

        @media (max-height: 860px) {
          .about-visual-sticky {
            position: static;
            top: auto;
            height: auto;
          }

          .about-desktop-frame {
            min-height: auto;
            display: block;
          }
        }

        .about-link {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          gap: 12px;
          border: 1px solid rgba(36,18,8,0.22);
          border-radius: 999px;
          padding: 12px 14px 12px 20px;
          background: linear-gradient(135deg, rgba(252,249,246,0.96) 0%, rgba(244,124,89,0.08) 100%);
          box-shadow: 0 18px 40px rgba(36, 18, 8, 0.08);
          backdrop-filter: blur(10px);
          text-decoration: none;
          transition: transform 560ms cubic-bezier(0.19, 1, 0.22, 1), color 420ms ease, border-color 420ms ease, background-color 420ms ease, box-shadow 420ms ease;
          will-change: transform;
        }

        .about-link::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: linear-gradient(112deg, rgba(244,124,89,0) 24%, rgba(244,124,89,0.2) 48%, rgba(244,124,89,0) 72%);
          transform: translateX(-148%) skewX(-22deg);
          transition: transform 820ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 0;
        }

        .about-link::after {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.46);
          opacity: 0.7;
          pointer-events: none;
          z-index: 0;
        }

        .about-link > * {
          position: relative;
          z-index: 1;
        }

        .about-link .about-link-label {
          transition: letter-spacing 420ms ease, transform 420ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        .about-link .about-link-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 999px;
          border: 1px solid rgba(36,18,8,0.1);
          background: rgba(36,18,8,0.04);
          transition: transform 420ms cubic-bezier(0.19, 1, 0.22, 1);
          transform-origin: center;
        }

        .about-link:hover {
          color: ${T.neutral};
          background-color: ${T.secondary};
          border-color: ${T.secondary};
          box-shadow: 0 22px 52px rgba(36, 18, 8, 0.16);
          transform: translateY(-2px) scale(1.014);
        }

        .about-link:hover::before {
          transform: translateX(148%) skewX(-22deg);
        }

        .about-link:hover .about-link-label {
          letter-spacing: 1.45px;
          transform: translateX(0.6px);
        }

        .about-link:hover .about-link-icon {
          background: rgba(252,249,246,0.12);
          border-color: rgba(252,249,246,0.18);
          transform: translateX(1.5px) translateY(-0.5px) rotate(8deg);
        }

        .about-link:active {
          transform: translateY(0) scale(0.99);
        }

        @media (min-width: 1280px) {
          .about-desktop-grid {
            grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
            gap: clamp(64px, 5.6vw, 92px);
          }

          .about-copy-column {
            min-height: clamp(560px, calc(100svh - 170px), 690px);
            row-gap: clamp(8px, 1.1vh, 12px);
          }

          .about-cards-viewport {
            min-height: 0;
            height: clamp(238px, 28vh, 300px);
          }

          .about-headline {
            font-size: clamp(34px, 3.55vw, 54px);
            line-height: 0.96;
          }

          .about-cta-wrap {
            padding-top: 4px;
          }

          .about-link {
            transition: transform 640ms cubic-bezier(0.19, 1, 0.22, 1), color 460ms ease, border-color 460ms ease, background-color 460ms ease;
          }

          .about-link:hover {
            transform: translateY(-2.5px) scale(1.018);
          }

          .about-link::before {
            transition-duration: 940ms;
          }
        }

        @media (max-width: 767px) {
          .about-desktop-frame {
            min-height: auto;
            display: block;
          }

          .about-cards-viewport {
            min-height: auto;
            height: auto;
            mask-image: none;
          }

          .about-cta-wrap {
            padding-top: 8px;
          }

          .about-copy-column {
            row-gap: 0;
          }

          .about-link {
            gap: 10px;
            padding: 11px 12px 11px 18px;
            transition: transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1), color 240ms ease, border-color 240ms ease, background-color 240ms ease;
          }

          .about-link:hover {
            transform: translateY(-1px) scale(1.008);
          }

          .about-link::before {
            transition-duration: 520ms;
          }

          .about-link:hover .about-link-label {
            letter-spacing: 1.3px;
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .story-card,
          .story-track,
          .story-card::before {
            transition: none;
          }

          .story-card:hover {
            transform: none;
          }

          .about-link,
          .about-link::before,
          .about-link .about-link-label,
          .about-link .about-link-icon {
            transition: none;
          }

          .about-link:hover,
          .about-link:active {
            transform: none;
          }
        }
      `}</style>

      <section ref={sectionRef} className="about-pin-wrap">
        <div
          ref={pinWrapRef}
          className="about-desktop-frame"
          style={{
            backgroundColor: T.neutral,
            backgroundImage:
              "radial-gradient(circle at 12% 18%, rgba(146,207,242,0.14) 0%, rgba(146,207,242,0) 44%)",
            padding: "clamp(52px, 4.8vw, 72px) 0",
            position: "relative",
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
          <div
            ref={lineRef}
            style={{
              height: "0.8px",
              backgroundColor: "rgba(36,18,8,0.14)",
              marginBottom: "64px",
            }}
          />

          <div className="about-desktop-grid grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="about-visual-sticky" ref={visualRef}>
              <div
                className="relative z-10"
                style={{
                  padding: "1px",
                  borderRadius: "2px",
                  background:
                    "linear-gradient(135deg, rgba(244,124,89,0.40) 0%, rgba(255,255,255,0.06) 50%, rgba(36,18,8,0.08) 100%)",
                  boxShadow: T.shadow,
                }}
              >
                <div style={{ borderRadius: "0px", overflow: "hidden" }}>
                  <img
                    ref={imageRef}
                    src={activeImage}
                    alt={activeStory.title}
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 5",
                      objectFit: "cover",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>

              <div
                ref={captionRef}
                style={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  fontFamily: T.body,
                  fontSize: "12px",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: "rgba(36,18,8,0.52)",
                }}
              >
                <div
                  ref={yearRef}
                  style={{
                    fontFamily: T.display,
                    fontSize: "44px",
                    fontWeight: 200,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    color: T.primary,
                  }}
                >
                  {activeStory.year}
                </div>
                <div>{activeStory.title}</div>
              </div>
            </div>

            <div className="about-copy-column" style={{ paddingTop: "8px" }}>
              <p
                style={{
                  fontFamily: T.body,
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "16px",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: T.primary,
                  marginBottom: "16px",
                }}
              >
                Warisan Kemewahan Makassar
              </p>

              <h2
                ref={headlineRef}
                className="about-headline"
                style={{
                  fontFamily: T.display,
                  fontWeight: 200,
                  fontSize: "clamp(38px, 4.5vw, 62px)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  color: T.secondary,
                }}
              >
                {activeStory.headline}
                <br />
                <em>{activeStory.highlight}</em>
              </h2>

              <div
                className="about-divider"
                style={{
                  height: "0.8px",
                  backgroundColor: "rgba(36,18,8,0.16)",
                }}
              />
              <div
                ref={cardsViewportRef}
                className="about-cards-viewport"
                style={{
                  display: "flex",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  ref={cardsTrackRef}
                  className="story-track"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {STORY_STEPS.map((step, index) => (
                    <div
                      key={step.year}
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      className={`story-card ${activeIndex === index ? "is-active" : ""}`}
                      style={{
                        border: "0.8px solid rgba(36,18,8,0.22)",
                        borderRadius: "0px",
                        padding: "clamp(20px, 2.6vw, 34px)",
                        backgroundColor:
                          activeIndex === index
                            ? "rgba(244,124,89,0.10)"
                            : "rgba(252,249,246,0.96)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: T.display,
                          fontWeight: 200,
                          fontSize: "clamp(32px, 3.2vw, 48px)",
                          lineHeight: 1,
                          letterSpacing: "-0.025em",
                          color: T.secondary,
                          marginBottom: "4px",
                        }}
                      >
                        {step.year}
                      </div>
                      <div
                        style={{
                          fontFamily: T.body,
                          fontSize: "12px",
                          fontWeight: 400,
                          lineHeight: "16px",
                          letterSpacing: "1.2px",
                          textTransform: "uppercase",
                          color: T.primary,
                          marginBottom: "8px",
                        }}
                      >
                        {step.title}
                      </div>
                      <div
                        style={{
                          fontFamily: T.body,
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20px",
                          letterSpacing: "-0.025em",
                          color: "rgba(36,18,8,0.72)",
                        }}
                      >
                        {step.copy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-cta-wrap">
                <a
                  href="#facilities"
                  className="about-link inline-flex items-center gap-2"
                  style={{
                    fontFamily: T.body,
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "16px",
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    color: T.secondary,
                  }}
                >
                  <span className="about-link-label">Jelajahi Fasilitas</span>
                  <span className="about-link-icon">
                    <ArrowUpRight style={{ width: "14px", height: "14px" }} />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              height: "0.8px",
              backgroundColor: "rgba(36,18,8,0.14)",
              marginTop: "80px",
            }}
          />
        </div>
        </div>
      </section>
    </>
  );
};

export default About;
