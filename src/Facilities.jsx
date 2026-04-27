import React, { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Coffee,
  Presentation,
  Sparkles,
  Waves,
} from "lucide-react";

const facilities = [
  {
    label: "Our Pool Experience",
    title: "Kolam Renang Tepi Laut",
    desc: "Bersantai sambil menikmati sunset ikonik Pantai Losari dengan suasana tenang dan pemandangan laut terbuka yang menjadi ciri khas MGH.",
    cta: "Explore pool experience",
    image:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1400&q=80",
    Icon: Waves,
  },
  {
    label: "Our Culinary Corner",
    title: "Terrace Anging Mammiri",
    desc: "Kopi, camilan lokal, dan semilir angin laut yang menenangkan, menghadirkan titik santai terbaik untuk menikmati sore khas Makassar.",
    cta: "Explore terrace dining",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80",
    Icon: Coffee,
  },
  {
    label: "Our Event Venue",
    title: "Ruang Rapat & Ballroom",
    desc: "Fasilitas elegan untuk kebutuhan bisnis maupun perayaan spesial Anda, dengan tata ruang fleksibel dan pelayanan event yang terkurasi.",
    cta: "Explore event spaces",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
    Icon: Presentation,
  },
  {
    label: "Our Wellness Ritual",
    title: "Layanan Spa & Relaksasi",
    desc: "Pulihkan energi Anda dengan perawatan pijat tradisional dan ritual relaksasi yang dirancang untuk menutup hari dengan nyaman.",
    cta: "Explore wellness ritual",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1400&q=80",
    Icon: Sparkles,
  },
];

function Facilities() {
  const rowRefs = useRef([]);
  const mediaRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      rowRefs.current.forEach((row) => {
        if (row) row.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        threshold: 0.22,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    rowRefs.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    let rafId = null;

    const updateParallax = () => {
      const viewportHeight = window.innerHeight || 1;

      mediaRefs.current.forEach((media) => {
        if (!media) return;

        const rect = media.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distanceFromViewportCenter = viewportHeight / 2 - center;
        const normalized = distanceFromViewportCenter / viewportHeight;
        const clamped = Math.max(-1, Math.min(1, normalized));
        const shiftPx = clamped * 14;

        media.style.setProperty("--parallax-shift", `${shiftPx.toFixed(2)}px`);
      });

      rafId = null;
    };

    const requestParallaxUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    requestParallaxUpdate();
    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);

    return () => {
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="facilities"
      style={{
        backgroundColor: "#FCF9F6",
        paddingBlock: "clamp(72px, 11vh, 132px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .fac-row {
          position: relative;
          transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fac-row:hover {
          transform: translateY(-2px);
        }

        .fac-image {
          transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fac-media {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transform: translateY(calc(var(--zigzag-offset, 0px) + var(--parallax-shift, 0px)));
          transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .fac-media-left {
          clip-path: polygon(0 0, 100% 0, 96% 100%, 0 100%);
        }

        .fac-media-right {
          clip-path: polygon(4% 0, 100% 0, 100% 100%, 0 100%);
        }

        .fac-row.asym-left .fac-media {
          min-height: clamp(360px, 52vh, 600px);
        }

        .fac-row.asym-right .fac-media {
          min-height: clamp(320px, 48vh, 560px);
        }

        .fac-row.asym-left .fac-image {
          transform-origin: 38% 52%;
        }

        .fac-row.asym-right .fac-image {
          transform-origin: 62% 48%;
        }

        .fac-row.asym-left:hover .fac-image {
          transform: scale(1.045) translateX(1.1%);
        }

        .fac-row.asym-right:hover .fac-image {
          transform: scale(1.045) translateX(-1.1%);
        }

        .fac-row.asym-left {
          margin-right: clamp(0px, 6vw, 72px);
        }

        .fac-row.asym-right {
          margin-left: clamp(0px, 6vw, 72px);
        }

        @media (min-width: 1024px) {
          .fac-row.asym-left .fac-media {
            --zigzag-offset: clamp(-8px, -1.2vh, -18px);
          }

          .fac-row.asym-right .fac-media {
            --zigzag-offset: clamp(10px, 1.5vh, 22px);
          }

          .fac-row.asym-left .lg\:order-2 {
            transform: translateY(clamp(8px, 1.1vh, 16px));
          }

          .fac-row.asym-right .lg\:order-1 {
            transform: translateY(clamp(-8px, -1.1vh, -16px));
          }
        }

        .fac-row:not(:last-child) {
          margin-bottom: clamp(120px, 20vh, 240px);
        }

        .fac-reveal {
          opacity: 0;
          transition: opacity 700ms ease, transform 760ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--reveal-delay, 0ms);
        }

        .fac-reveal.asym-left {
          transform: translate3d(-34px, 34px, 0) scale(0.985);
        }

        .fac-reveal.asym-right {
          transform: translate3d(34px, 34px, 0) scale(0.985);
        }

        .fac-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        @media (max-width: 1023px) {
          .fac-row.asym-left,
          .fac-row.asym-right {
            margin-left: 0;
            margin-right: 0;
          }

          .fac-row.asym-left .fac-media,
          .fac-row.asym-right .fac-media,
          .fac-row.asym-left .lg\:order-2,
          .fac-row.asym-right .lg\:order-1 {
            transform: none;
          }

          .fac-row:not(:last-child) {
            margin-bottom: clamp(16px, 3.6vh, 30px);
          }

          .fac-media-left,
          .fac-media-right {
            clip-path: none;
          }

          .fac-row.asym-left .fac-media,
          .fac-row.asym-right .fac-media {
            min-height: clamp(300px, 44vh, 480px);
          }

          .fac-reveal.asym-left,
          .fac-reveal.asym-right {
            transform: translate3d(0, 28px, 0) scale(0.99);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fac-reveal,
          .fac-reveal.asym-left,
          .fac-reveal.asym-right {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .fac-row.asym-left .fac-media,
          .fac-row.asym-right .fac-media,
          .fac-row.asym-left .lg\:order-2,
          .fac-row.asym-right .lg\:order-1 {
            transform: none;
          }

          .fac-media {
            transition: none;
          }
        }

        .fac-pill {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition: transform 560ms cubic-bezier(0.19, 1, 0.22, 1), color 420ms ease, border-color 420ms ease, background-color 420ms ease;
          will-change: transform;
        }

        .fac-pill::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: linear-gradient(112deg, rgba(252,249,246,0) 24%, rgba(252,249,246,0.28) 48%, rgba(252,249,246,0) 72%);
          transform: translateX(-148%) skewX(-22deg);
          transition: transform 820ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 0;
        }

        .fac-pill > * {
          position: relative;
          z-index: 1;
        }

        .fac-pill .pill-label {
          transition: letter-spacing 420ms ease, transform 420ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        .fac-pill .pill-ico-left {
          transition: transform 420ms cubic-bezier(0.19, 1, 0.22, 1), opacity 360ms ease;
          transform-origin: center;
        }

        .fac-pill .pill-ico-right {
          transition: transform 420ms cubic-bezier(0.19, 1, 0.22, 1);
          transform-origin: center;
        }

        .fac-pill:hover {
          background-color: #241208;
          color: #FCF9F6;
          border-color: #241208;
          transform: translateY(-2px) scale(1.016);
        }

        .fac-pill:hover::before {
          transform: translateX(148%) skewX(-22deg);
        }

        .fac-pill:hover .pill-label {
          letter-spacing: 1.45px;
          transform: translateX(0.6px);
        }

        .fac-pill:hover .pill-ico-left {
          transform: rotate(-12deg) translateY(-0.5px);
          opacity: 0.9;
        }

        .fac-pill:hover .pill-ico-right {
          transform: translateX(1.5px) translateY(-0.5px) rotate(8deg);
        }

        .fac-pill:active {
          transform: translateY(0) scale(0.99);
        }

        @media (min-width: 1280px) {
          .fac-pill {
            transition: transform 640ms cubic-bezier(0.19, 1, 0.22, 1), color 460ms ease, border-color 460ms ease, background-color 460ms ease;
          }

          .fac-pill:hover {
            transform: translateY(-2.5px) scale(1.018);
          }

          .fac-pill::before {
            transition-duration: 940ms;
          }
        }

        @media (max-width: 767px) {
          .fac-pill {
            transition: transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1), color 240ms ease, border-color 240ms ease, background-color 240ms ease;
          }

          .fac-pill:hover {
            transform: translateY(-1px) scale(1.008);
          }

          .fac-pill::before {
            transition-duration: 520ms;
          }

          .fac-pill:hover .pill-label {
            letter-spacing: 1.3px;
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fac-pill,
          .fac-pill::before,
          .fac-pill .pill-label,
          .fac-pill .pill-ico-left,
          .fac-pill .pill-ico-right {
            transition: none;
          }

          .fac-pill:hover,
          .fac-pill:active {
            transform: none;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-[16%] top-[-20%] h-[560px] w-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(244,124,89,0.14) 0%, rgba(244,124,89,0.03) 44%, rgba(244,124,89,0) 74%)",
          }}
        />
        <div
          className="absolute right-[-14%] top-[38%] h-[480px] w-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(146,207,242,0.12) 0%, rgba(146,207,242,0.02) 46%, rgba(146,207,242,0) 76%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(36,18,8,0.08) 0.45px, transparent 0.45px)",
            backgroundSize: "6px 6px",
            opacity: 0.14,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <header className="mx-auto max-w-3xl text-center">
          <p
            style={{
              color: "#F47C59",
              fontFamily: '"Inter", sans-serif',
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Pengalaman & Fasilitas
          </p>

          <h2
            style={{
              color: "#241208",
              fontFamily: '"Instrument Serif", serif',
              fontWeight: 200,
              fontSize: "clamp(40px, 4.8vw, 64px)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              marginBottom: "20px",
            }}
          >
            Curated Experiences at Makassar Golden Hotel
          </h2>

          <p
            style={{
              color: "rgba(36,18,8,0.7)",
              fontFamily: '"Inter", sans-serif',
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "-0.025em",
            }}
          >
            Setiap pengalaman dirancang dengan ritme yang lebih tenang, detail
            yang berkelas, dan pelayanan yang hangat untuk melengkapi masa inap
            Anda.
          </p>
        </header>

        <div className="mt-14">
          {facilities.map((item, index) => {
            const Icon = item.Icon;
            const isImageLeft = index % 2 === 0;
            const rowClass = isImageLeft ? "asym-left" : "asym-right";
            const columnsClass = isImageLeft
              ? "lg:grid-cols-[0.84fr_1.16fr]"
              : "lg:grid-cols-[1.16fr_0.84fr]";
            const mediaOrderClass = isImageLeft ? "lg:order-1" : "lg:order-2";
            const contentOrderClass = isImageLeft ? "lg:order-2" : "lg:order-1";
            const contentAlignClass = isImageLeft
              ? "lg:items-start lg:text-left"
              : "lg:items-end lg:text-right";

            return (
              <article
                key={item.title}
                ref={(element) => {
                  rowRefs.current[index] = element;
                }}
                className={`fac-row fac-reveal ${rowClass} overflow-hidden`}
                style={{
                  "--reveal-delay": `${index * 95}ms`,
                  borderRadius: "2px",
                  backgroundColor: "rgba(252,249,246,0.96)",
                }}
              >
                <div className={`grid grid-cols-1 ${columnsClass}`}>
                  <div
                    className={`fac-media ${mediaOrderClass} ${isImageLeft ? "fac-media-left" : "fac-media-right"}`}
                    ref={(element) => {
                      mediaRefs.current[index] = element;
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="fac-image absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(140deg, rgba(36,18,8,0.12) 0%, rgba(36,18,8,0.02) 62%)",
                      }}
                    />
                  </div>

                  <div
                    className={`flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14 ${contentOrderClass} ${contentAlignClass}`}
                  >
                    <p
                      style={{
                        color: "rgba(36,18,8,0.34)",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "12px",
                        lineHeight: "16px",
                        letterSpacing: "1.2px",
                        textTransform: "uppercase",
                        marginBottom: "16px",
                      }}
                    >
                      {item.label}
                    </p>

                    <h3
                      style={{
                        color: "#241208",
                        fontFamily: '"Instrument Serif", serif',
                        fontWeight: 200,
                        fontSize: "clamp(38px, 4.7vw, 72px)",
                        lineHeight: 1,
                        letterSpacing: "-0.025em",
                        maxWidth: "12ch",
                        marginBottom: "18px",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        color: "rgba(36,18,8,0.64)",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "14px",
                        lineHeight: "20px",
                        letterSpacing: "-0.025em",
                        maxWidth: "50ch",
                        marginBottom: "28px",
                      }}
                    >
                      {item.desc}
                    </p>

                    <div>
                      <button
                        type="button"
                        className="fac-pill inline-flex items-center gap-2"
                        style={{
                          border: "0.8px solid #F47C59",
                          backgroundColor: "#F47C59",
                          color: "#FCF9F6",
                          borderRadius: "999px",
                          padding: "10px 18px",
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "12px",
                          lineHeight: "16px",
                          letterSpacing: "1.2px",
                          textTransform: "uppercase",
                        }}
                      >
                        <span className="pill-ico-left">
                          <Icon size={13} strokeWidth={1.8} />
                        </span>
                        <span className="pill-label">{item.cta}</span>
                        <span className="pill-ico-right">
                          <ArrowUpRight size={13} strokeWidth={1.8} />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Facilities;
