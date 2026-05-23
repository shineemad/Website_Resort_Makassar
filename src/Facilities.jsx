import React, { useLayoutEffect, useRef } from "react";
import {
  ArrowUpRight,
  Coffee,
  Presentation,
  Sparkles,
  Waves,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Design tokens (shared with all sections) ──────────────────── */
const T = {
  primary: "#F47C59",
  secondary: "#241208",
  neutral: "#FCF9F6",
  display: '"Instrument Serif", serif',
  body: '"Inter", sans-serif',
};

/* ── Facility data ─────────────────────────────────────────────── */
const FACILITIES = [
  {
    id: "01",
    label: "Pool Experience",
    title: "Kolam Renang\nTepi Laut",
    desc: "Bersantai sambil menikmati sunset ikonik Pantai Losari dengan suasana tenang dan pemandangan laut terbuka yang menjadi ciri khas MGH.",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1400&q=80",
    Icon: Waves,
    accent: "#92CFF2",
  },
  {
    id: "02",
    label: "Culinary Corner",
    title: "Terrace Anging\nMammiri",
    desc: "Kopi, camilan lokal, dan semilir angin laut yang menenangkan — titik santai terbaik untuk menikmati sore khas Makassar.",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
    Icon: Coffee,
    accent: "#F47C59",
  },
  {
    id: "03",
    label: "Event Venue",
    title: "Ruang Rapat\n& Ballroom",
    desc: "Fasilitas elegan untuk kebutuhan bisnis maupun perayaan spesial, dengan tata ruang fleksibel dan pelayanan event terkurasi.",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    Icon: Presentation,
    accent: "#C8B49A",
  },
  {
    id: "04",
    label: "Wellness Ritual",
    title: "Spa &\nRelaksasi",
    desc: "Pulihkan energi Anda dengan perawatan pijat tradisional dan ritual relaksasi yang dirancang untuk menutup hari dengan nyaman.",
    cta: "Explore",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
    Icon: Sparkles,
    accent: "#D4A59A",
  },
];

/* ── Component ─────────────────────────────────────────────────── */
function Facilities() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const panelRefs = useRef([]);
  const imgRefs = useRef([]);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    /* ── DESKTOP: horizontal pin ──────────────────────────────── */
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          const track = trackRef.current;
          if (!track) return;

          const getScrollDist = () => track.offsetWidth - window.innerWidth;

          /* Main horizontal tween */
          const hTween = gsap.to(track, {
            x: () => -getScrollDist(),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getScrollDist()}`,
              pin: true,
              scrub: 1.1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressRef.current) {
                  progressRef.current.style.transform = `scaleX(${self.progress})`;
                }
              },
            },
          });

          /* Panel text reveals (containerAnimation) */
          panelRefs.current.forEach((panel) => {
            if (!panel) return;
            const items = panel.querySelectorAll(".rev");
            if (!items.length) return;
            gsap.fromTo(
              items,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.78,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  containerAnimation: hTween,
                  trigger: panel,
                  start: "left 90%",
                  once: true,
                },
              },
            );
          });

          /* Image scale-in on each panel entry */
          imgRefs.current.forEach((img, i) => {
            if (!img) return;
            const panel = panelRefs.current[i];
            if (!panel) return;
            gsap.fromTo(
              img,
              { scale: 1.14, filter: "brightness(0.72)" },
              {
                scale: 1.02,
                filter: "brightness(1)",
                duration: 1.4,
                ease: "power2.out",
                scrollTrigger: {
                  containerAnimation: hTween,
                  trigger: panel,
                  start: "left 90%",
                  once: true,
                },
              },
            );
          });
        }, sectionRef);

        return () => ctx.revert();
      },
    );

    /* ── MOBILE: vertical fallback ────────────────────────────── */
    mm.add("(max-width: 1023px)", () => {
      const ctx = gsap.context(() => {
        panelRefs.current.filter(Boolean).forEach((panel) => {
          const items = panel.querySelectorAll(".rev");
          gsap.fromTo(
            items,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.82,
              stagger: 0.08,
              ease: "expo.out",
              scrollTrigger: { trigger: panel, start: "top 80%", once: true },
            },
          );
        });
        imgRefs.current.filter(Boolean).forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1.0,
              duration: 1.0,
              ease: "power2.out",
              scrollTrigger: { trigger: img, start: "top 90%", once: true },
            },
          );
        });
      }, sectionRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── Section ──────────────────────────────────────────── */
        #facilities {
          background-color: ${T.secondary};
          position: relative;
          overflow: hidden;
          height: 100svh;
        }

        /* Dot texture */
        #facilities::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(252,249,246,0.05) 0.5px, transparent 0.5px);
          background-size: 6px 6px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Chapter strip (always-visible, globally pinned) ── */
        .fac-chapter {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px clamp(28px, 4vw, 58px);
          border-bottom: 0.8px solid rgba(252,249,246,0.08);
          background: rgba(36, 18, 8, 0.76);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        /* ── Progress bar (bottom edge) ── */
        .fac-prog-track {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 30;
          height: 2px;
          background: rgba(252, 249, 246, 0.06);
          overflow: hidden;
        }
        .fac-prog-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, ${T.primary}, rgba(244,124,89,0.6));
          transform: scaleX(0);
          transform-origin: left center;
          will-change: transform;
        }

        /* ── Ambient glows ── */
        .fac-glow-a {
          position: absolute;
          top: -20%;
          left: -8%;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244,124,89,0.10) 0%, transparent 66%);
          pointer-events: none;
          z-index: 0;
          filter: blur(1px);
        }
        .fac-glow-b {
          position: absolute;
          bottom: -14%;
          right: -8%;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(146,207,242,0.07) 0%, transparent 68%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Horizontal track ── */
        .fac-track {
          display: flex;
          width: calc(${FACILITIES.length} * 100vw);
          height: 100svh;
          position: relative;
          z-index: 1;
          will-change: transform;
        }

        /* ── Panel ── */
        .fac-panel {
          width: 100vw;
          height: 100svh;
          flex-shrink: 0;
          display: flex;
          overflow: hidden;
        }

        /* ── Left text column ── */
        .fac-left {
          width: 40%;
          height: 100%;
          background: ${T.secondary};
          display: flex;
          flex-direction: column;
          padding: clamp(68px,8.5vh,102px) clamp(28px,4.2vw,62px) clamp(32px,4.5vh,52px);
          position: relative;
          border-right: 0.8px solid rgba(252,249,246,0.07);
          flex-shrink: 0;
          overflow: hidden;
        }

        /* Giant background number watermark */
        .fac-bg-num {
          position: absolute;
          top: -0.02em;
          right: -0.04em;
          font-family: ${T.display};
          font-weight: 200;
          font-size: clamp(160px, 20vw, 310px);
          line-height: 0.82;
          letter-spacing: -0.06em;
          color: rgba(252,249,246,0.04);
          user-select: none;
          pointer-events: none;
          z-index: 0;
        }

        /* Content above watermark */
        .fac-left-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* Vertical accent edge line */
        .fac-accent-edge {
          position: absolute;
          left: 0;
          top: clamp(68px,8.5vh,102px);
          bottom: clamp(32px,4.5vh,52px);
          width: 2px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            var(--accent, ${T.primary}) 28%,
            var(--accent, ${T.primary}) 72%,
            transparent 100%
          );
          opacity: 0.18;
          z-index: 0;
        }

        /* Facility index list */
        .fac-idx {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: clamp(22px, 3vh, 36px);
          margin-top: auto;
        }
        .fac-idx-row {
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .fac-idx-dash {
          width: 14px;
          height: 1px;
          flex-shrink: 0;
          background: rgba(252,249,246,0.16);
          transition: width 0.3s ease, background 0.3s ease;
        }
        .fac-idx-row.cur .fac-idx-dash {
          width: 22px;
          background: ${T.primary};
        }
        .fac-idx-label {
          font-family: ${T.body};
          font-size: 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(252,249,246,0.22);
          transition: color 0.3s ease;
        }
        .fac-idx-row.cur .fac-idx-label {
          color: ${T.neutral};
        }

        /* Eyebrow */
        .fac-eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: ${T.body};
          font-size: 8.5px;
          letter-spacing: 2.4px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        /* Display number */
        .fac-num {
          font-family: ${T.display};
          font-weight: 200;
          font-size: clamp(46px, 5.2vw, 78px);
          line-height: 0.88;
          letter-spacing: -0.04em;
          color: ${T.primary};
          margin-bottom: 10px;
        }

        /* Title */
        .fac-title {
          font-family: ${T.display};
          font-weight: 200;
          font-size: clamp(28px, 3.2vw, 50px);
          line-height: 0.96;
          letter-spacing: -0.026em;
          color: ${T.neutral};
          white-space: pre-line;
          margin: 0 0 13px;
        }

        /* Hairline divider */
        .fac-hr {
          height: 0.8px;
          background: rgba(252,249,246,0.10);
          margin-bottom: 13px;
        }

        /* Description */
        .fac-desc {
          font-family: ${T.body};
          font-size: 12.5px;
          line-height: 1.70;
          letter-spacing: -0.014em;
          color: rgba(252,249,246,0.52);
          margin: 0 0 22px;
          max-width: 38ch;
        }

        /* CTA */
        .fac-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: ${T.body};
          font-size: 10px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: ${T.secondary};
          background: ${T.primary};
          border: none;
          padding: 10px 18px;
          cursor: pointer;
          align-self: flex-start;
          transition:
            background 0.28s ease,
            color 0.28s ease,
            transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .fac-cta:hover {
          background: ${T.neutral};
          color: ${T.secondary};
          transform: translateY(-2px);
        }
        .fac-cta:active { transform: translateY(0); }

        /* ── Right image column ── */
        .fac-right {
          flex: 1;
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        .fac-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          will-change: transform, filter;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fac-panel:hover .fac-img {
          transform: scale(1.035);
        }

        /* Image left gradient bleed into text column */
        .fac-img-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(36, 18, 8, 0.62) 0%,
            rgba(36, 18, 8, 0.16) 38%,
            transparent 66%
          );
          pointer-events: none;
        }

        /* Panel counter badge (image area) */
        .fac-badge {
          position: absolute;
          bottom: clamp(16px, 2.4vh, 28px);
          right: clamp(18px, 2.6vw, 32px);
          font-family: ${T.display};
          font-weight: 200;
          font-size: 10.5px;
          letter-spacing: 1.4px;
          color: rgba(252,249,246,0.34);
          display: flex;
          align-items: center;
          gap: 5px;
          pointer-events: none;
        }

        /* ── Mobile: vertical stack ── */
        @media (max-width: 1023px) {
          #facilities {
            height: auto;
            overflow: visible;
          }
          .fac-chapter { position: sticky; top: 0; }
          .fac-prog-track { display: none; }
          .fac-track {
            flex-direction: column;
            width: 100%;
            height: auto;
          }
          .fac-panel {
            width: 100%;
            height: auto;
            flex-direction: column;
          }
          .fac-left {
            width: 100%;
            padding: clamp(36px,5vh,52px) clamp(20px,5vw,36px) clamp(24px,4vh,36px);
          }
          .fac-right { height: 54vw; min-height: 260px; }
          .fac-bg-num { font-size: clamp(100px,16vw,180px); }
          .fac-idx { display: none; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .fac-img { transition: none; }
          .rev { opacity: 1 !important; transform: none !important; }
          .fac-prog-fill { transition: none; }
        }
      `}</style>

      <section id="facilities" ref={sectionRef}>
        {/* Ambient glows */}
        <div className="fac-glow-a" aria-hidden="true" />
        <div className="fac-glow-b" aria-hidden="true" />

        {/* Chapter strip — globally visible throughout horizontal scroll */}
        <div className="fac-chapter" aria-hidden="true">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontFamily: T.display,
                fontWeight: 200,
                fontSize: "clamp(20px, 2vw, 28px)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: T.primary,
                opacity: 0.52,
              }}
            >
              04
            </span>
            <div
              style={{
                width: "0.8px",
                height: "16px",
                background: "rgba(252,249,246,0.16)",
              }}
            />
            <span
              style={{
                fontFamily: T.body,
                fontSize: "8px",
                letterSpacing: "2.2px",
                textTransform: "uppercase",
                color: "rgba(252,249,246,0.30)",
              }}
            >
              Fasilitas &amp; Pengalaman
            </span>
          </div>
          <span
            style={{
              fontFamily: T.body,
              fontSize: "8px",
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: "rgba(252,249,246,0.18)",
            }}
          >
            Makassar Golden Hotel
          </span>
        </div>

        {/* Progress bar */}
        <div className="fac-prog-track">
          <div ref={progressRef} className="fac-prog-fill" />
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="fac-track">
          {FACILITIES.map((item, index) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.id}
                className="fac-panel"
                ref={(el) => {
                  panelRefs.current[index] = el;
                }}
              >
                {/* === LEFT: editorial text panel === */}
                <div className="fac-left" style={{ "--accent": item.accent }}>
                  {/* Vertical accent edge line */}
                  <div className="fac-accent-edge" />

                  {/* Giant watermark number */}
                  <div className="fac-bg-num">{item.id}</div>

                  {/* Content above watermark */}
                  <div className="fac-left-content">
                    {/* Facility index list */}
                    <div className="fac-idx rev">
                      {FACILITIES.map((f, i) => (
                        <div
                          key={f.id}
                          className={`fac-idx-row${i === index ? " cur" : ""}`}
                        >
                          <div className="fac-idx-dash" />
                          <span className="fac-idx-label">{f.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Eyebrow */}
                    <div
                      className="fac-eyebrow rev"
                      style={{ color: T.primary }}
                    >
                      <Icon size={11} strokeWidth={1.6} />
                      {item.label}
                    </div>

                    {/* Number */}
                    <div className="fac-num rev">{item.id}</div>

                    {/* Title */}
                    <h3 className="fac-title rev">{item.title}</h3>

                    {/* Hairline */}
                    <div className="fac-hr rev" />

                    {/* Description */}
                    <p className="fac-desc rev">{item.desc}</p>

                    {/* CTA */}
                    <button type="button" className="fac-cta rev">
                      {item.cta}
                      <ArrowUpRight size={11} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>

                {/* === RIGHT: full-bleed image === */}
                <div className="fac-right">
                  <img
                    ref={(el) => {
                      imgRefs.current[index] = el;
                    }}
                    src={item.image}
                    alt={item.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="fac-img"
                  />
                  <div className="fac-img-veil" />

                  {/* Counter badge */}
                  <div className="fac-badge">
                    <span style={{ color: T.primary }}>{item.id}</span>
                    <span style={{ opacity: 0.3 }}>/</span>
                    <span>{String(FACILITIES.length).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Facilities;
