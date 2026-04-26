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
  const lineRef = useRef(null);
  const visualRef = useRef(null);
  const imageRef = useRef(null);
  const yearRef = useRef(null);
  const captionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const [activeImage, setActiveImage] = useState(STORY_STEPS[0].image);
  const [activeStory, setActiveStory] = useState(STORY_STEPS[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      const swapActiveStory = (index) => {
        if (index === activeIndexRef.current) return;
        activeIndexRef.current = index;

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
              y: 8,
              duration: 0.28,
              ease: "power2.inOut",
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
            0.28,
          )
          .to(
            [imageRef.current, captionRef.current, headlineRef.current],
            {
              opacity: 1,
              y: 0,
              duration: 0.42,
              ease: "power2.out",
            },
            0.28,
          );
      };

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 74%",
              end: "bottom 38%",
              onEnter: () => swapActiveStory(index),
              onEnterBack: () => swapActiveStory(index),
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .story-card {
          transition: background-color 300ms ease, border-color 300ms ease;
        }

        .story-card:hover {
          background-color: rgba(244, 124, 89, 0.06);
          border-color: rgba(36, 18, 8, 0.35);
        }

        .about-link {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          border: 0.8px solid rgba(36,18,8,0.28);
          border-radius: 999px;
          padding: 10px 18px;
          background-color: rgba(252,249,246,0.78);
          text-decoration: none;
          transition: transform 560ms cubic-bezier(0.19, 1, 0.22, 1), color 420ms ease, border-color 420ms ease, background-color 420ms ease;
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

        .about-link > * {
          position: relative;
          z-index: 1;
        }

        .about-link .about-link-label {
          transition: letter-spacing 420ms ease, transform 420ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        .about-link .about-link-icon {
          transition: transform 420ms cubic-bezier(0.19, 1, 0.22, 1);
          transform-origin: center;
        }

        .about-link:hover {
          color: ${T.neutral};
          background-color: ${T.secondary};
          border-color: ${T.secondary};
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
          transform: translateX(1.5px) translateY(-0.5px) rotate(8deg);
        }

        .about-link:active {
          transform: translateY(0) scale(0.99);
        }

        @media (min-width: 1280px) {
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
          .about-link {
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

      <section
        ref={sectionRef}
        style={{
          backgroundColor: T.neutral,
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(146,207,242,0.14) 0%, rgba(146,207,242,0) 44%)",
          padding: "96px 0",
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

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:h-fit" ref={visualRef}>
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

            <div className="flex flex-col" style={{ paddingTop: "8px" }}>
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
                style={{
                  fontFamily: T.display,
                  fontWeight: 200,
                  fontSize: "clamp(38px, 4.5vw, 62px)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  color: T.secondary,
                  marginBottom: "32px",
                }}
              >
                {activeStory.headline}
                <br />
                <em>{activeStory.highlight}</em>
              </h2>

              <div
                style={{
                  height: "0.8px",
                  backgroundColor: "rgba(36,18,8,0.16)",
                  marginBottom: "28px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom: "48px",
                }}
              >
                {STORY_STEPS.map((step, index) => (
                  <div
                    key={step.year}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="story-card"
                    style={{
                      border: T.border,
                      borderRadius: "2px",
                      padding: "16px",
                      backgroundColor:
                        activeIndex === index
                          ? "rgba(244,124,89,0.08)"
                          : "rgba(252,249,246,0.7)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: T.display,
                        fontWeight: 200,
                        fontSize: "30px",
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
                        color: "rgba(36,18,8,0.68)",
                      }}
                    >
                      {step.copy}
                    </div>
                  </div>
                ))}
              </div>

              <div>
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
      </section>
    </>
  );
};

export default About;
