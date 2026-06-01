import React, { useLayoutEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Design tokens ──────────────────────────────────────────────── */
const T = {
  primary: "#F47C59",
  dark: "#241208",
  darker: "#170e08",
  neutral: "#FCF9F6",
  display: '"Instrument Serif", serif',
  body: '"Inter", sans-serif',
};

/* ── Review data ────────────────────────────────────────────────── */
const REVIEWS = [
  {
    id: "01",
    name: "Budi S.",
    type: "Liburan Keluarga",
    stay: "Suite Sea View · 3 malam",
    rating: 5,
    review:
      "Pemandangan sunset dari balkon kamar sangat luar biasa. Benar-benar lokasi terbaik di Pantai Losari. Fasilitasnya klasik namun terawat dengan sangat baik.",
  },
  {
    id: "02",
    name: "Anita W.",
    type: "Pasangan",
    stay: "Deluxe Room · 2 malam",
    rating: 4,
    review:
      "Hotel bersejarah dengan pelayanan yang sangat ramah dan profesional. Sarapannya bervariasi dan enak. Sangat direkomendasikan untuk staycation.",
  },
  {
    id: "03",
    name: "David L.",
    type: "Perjalanan Bisnis",
    stay: "Executive Room · 2 malam",
    rating: 5,
    review:
      "Lokasi sangat strategis, malam hari tinggal jalan kaki keluar mencari kuliner khas Makassar. Tidur sangat nyaman, akses ke pusat kota juga cepat.",
  },
  {
    id: "04",
    name: "Maya R.",
    type: "Solo Traveler",
    stay: "Classic Room · 1 malam",
    rating: 4,
    review:
      "Nuansa heritage terasa kuat tapi tidak terasa tua. Stafnya responsif, area publik bersih, dan lokasi sangat memudahkan itinerary singkat saya.",
  },
  {
    id: "05",
    name: "Rian T.",
    type: "Staycation",
    stay: "Premier Room · 2 malam",
    rating: 5,
    review:
      "Saya suka ritme hotel ini: pagi tenang, sore hidup karena view laut. Makanannya juga konsisten enak, terutama menu lokal khas Makassar.",
  },
  {
    id: "06",
    name: "Nadia K.",
    type: "Business Trip",
    stay: "Business Room · 3 malam",
    rating: 4,
    review:
      "Untuk perjalanan kerja, ini pilihan praktis. Akses cepat, kamar nyaman untuk istirahat, dan service tim front office sangat membantu.",
  },
];

const LANE_A = [...REVIEWS, ...REVIEWS];
const LANE_B = [...REVIEWS, ...REVIEWS].reverse();

/* ── Review card (marquee) ──────────────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <article
      style={{
        flexShrink: 0,
        width: "min(82vw, 360px)",
        padding: "22px 24px",
        border: "0.8px solid rgba(252,249,246,0.1)",
        background: "rgba(252,249,246,0.055)",
        borderRadius: "0px",
      }}
    >
      <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < (review.rating ?? 5);
          return (
            <Star
              key={i}
              size={12}
              strokeWidth={1.6}
              style={{
                color: filled ? T.primary : "rgba(252,249,246,0.32)",
                fill: filled ? T.primary : "transparent",
              }}
            />
          );
        })}
      </div>
      <p
        style={{
          fontFamily: T.display,
          fontWeight: 200,
          fontSize: "15px",
          lineHeight: 1.62,
          letterSpacing: "-0.016em",
          color: "rgba(252,249,246,0.82)",
          marginBottom: "18px",
        }}
      >
        "{review.review}"
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "14px",
          borderTop: "0.8px solid rgba(252,249,246,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "rgba(244,124,89,0.16)",
              border: "0.8px solid rgba(244,124,89,0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: T.body,
              fontSize: "10px",
              fontWeight: 600,
              color: T.primary,
              flexShrink: 0,
            }}
          >
            {review.name.charAt(0)}
          </div>
          <div>
            <p
              style={{
                fontFamily: T.body,
                fontSize: "12px",
                fontWeight: 600,
                color: T.neutral,
                letterSpacing: "-0.01em",
              }}
            >
              {review.name}
            </p>
            <p
              style={{
                fontFamily: T.body,
                fontSize: "9px",
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                color: "rgba(252,249,246,0.44)",
              }}
            >
              {review.type}
            </p>
          </div>
        </div>
        <p
          style={{
            fontFamily: T.body,
            fontSize: "9px",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            color: "rgba(252,249,246,0.32)",
          }}
        >
          {review.stay}
        </p>
      </div>
    </article>
  );
}

/* ── Testimonials ───────────────────────────────────────────────── */
export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const quoteRef = useRef(null);
  const metaRef = useRef(null);
  const marqueeRef = useRef(null);
  const activeIdxRef = useRef(0);

  /* ── GSAP entrance ──────────────────────────────────────────── */
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 78%" };

      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: st,
        },
      );
      gsap.fromTo(
        headlineRef.current?.querySelectorAll(".tm-hl") || [],
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: "expo.out",
          stagger: 0.09,
          delay: 0.06,
          scrollTrigger: st,
        },
      );
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          delay: 0.24,
          scrollTrigger: st,
        },
      );
      gsap.fromTo(
        metaRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.38,
          scrollTrigger: st,
        },
      );
      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: st,
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Navigate testimonials ──────────────────────────────────── */
  const navigate = (dir) => {
    if (isAnimating) return;
    const next = (activeIdx + dir + REVIEWS.length) % REVIEWS.length;
    setIsAnimating(true);

    const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });
    tl.to([quoteRef.current, metaRef.current], {
      opacity: 0,
      y: dir > 0 ? -16 : 16,
      duration: 0.28,
      ease: "power2.in",
    })
      .call(() => setActiveIdx(next))
      .to(
        [quoteRef.current, metaRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          ease: "expo.out",
        },
        "+=0.02",
      );
  };

  const review = REVIEWS[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        position: "relative",
        background: T.dark,
        overflow: "hidden",
      }}
    >
      <style>{`
        #testimonials .tm-hl {
          display: block;
        }
        /* Marquee tracks */
        .tm-track-a {
          display: flex;
          width: max-content;
          gap: 12px;
          padding: 10px 0;
          animation: tmMoveLeft 42s linear infinite;
          will-change: transform;
        }
        .tm-track-b {
          display: flex;
          width: max-content;
          gap: 12px;
          padding: 10px 0;
          animation: tmMoveRight 36s linear infinite;
          will-change: transform;
        }
        .tm-marquee-wrap:hover .tm-track-a,
        .tm-marquee-wrap:hover .tm-track-b {
          animation-play-state: paused;
        }
        @keyframes tmMoveLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes tmMoveRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        #testimonials .tm-nav-btn {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 0;
          border: 0.8px solid rgba(252,249,246,0.14);
          background: rgba(252,249,246,0.05);
          color: rgba(252,249,246,0.62);
          cursor: pointer;
          transition: border-color 0.22s ease, background 0.22s ease, color 0.22s ease;
        }
        #testimonials .tm-nav-btn:hover {
          border-color: rgba(244,124,89,0.5);
          background: rgba(244,124,89,0.1);
          color: #F47C59;
        }
        #testimonials .tm-dot {
          transition: background-color 0.28s ease, transform 0.28s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .tm-track-a, .tm-track-b { animation: none !important; overflow-x: auto; }
        }
      `}</style>

      {/* Grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")",
          opacity: 0.5,
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(52% 44% at 8% 10%, rgba(244,124,89,0.18), transparent 72%), " +
            "radial-gradient(40% 36% at 90% 88%, rgba(252,249,246,0.06), transparent 72%)",
        }}
      />

      {/* ── Chapter strip ──────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px clamp(28px,5.5vw,72px)",
          borderBottom: "0.8px solid rgba(252,249,246,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span
            style={{
              fontFamily: T.display,
              fontWeight: 200,
              fontSize: "clamp(28px,2.8vw,42px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: T.primary,
              opacity: 0.36,
            }}
          >
            06
          </span>
          <div
            style={{
              width: "0.8px",
              height: "20px",
              background: "rgba(252,249,246,0.1)",
            }}
          />
          <span
            style={{
              fontFamily: T.body,
              fontSize: "9px",
              letterSpacing: "2.2px",
              textTransform: "uppercase",
              color: "rgba(252,249,246,0.3)",
            }}
          >
            Ulasan Tamu
          </span>
        </div>
        <span
          style={{
            fontFamily: T.body,
            fontSize: "9px",
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            color: "rgba(252,249,246,0.2)",
          }}
        >
          Makassar Golden Hotel
        </span>
      </div>

      {/* ── Editorial featured area ─────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding:
            "clamp(48px,6vh,80px) clamp(28px,5.5vw,72px) clamp(40px,5vh,60px)",
        }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "clamp(20px,2.6vh,32px)",
            opacity: 0,
          }}
        >
          <div
            style={{ width: "26px", height: "0.8px", background: T.primary }}
          />
          <span
            style={{
              fontFamily: T.body,
              fontSize: "9px",
              letterSpacing: "2.6px",
              textTransform: "uppercase",
              color: T.primary,
            }}
          >
            Kata Mereka
          </span>
        </div>

        {/* Headline */}
        <div
          ref={headlineRef}
          style={{ marginBottom: "clamp(32px,4.5vh,56px)" }}
        >
          <span
            className="tm-hl"
            style={{
              fontFamily: T.display,
              fontWeight: 200,
              fontSize: "clamp(42px,4.8vw,72px)",
              lineHeight: 0.92,
              letterSpacing: "-0.032em",
              color: T.neutral,
            }}
          >
            Elegansi
          </span>
          <span
            className="tm-hl"
            style={{
              fontFamily: T.display,
              fontWeight: 200,
              fontSize: "clamp(42px,4.8vw,72px)",
              lineHeight: 0.92,
              letterSpacing: "-0.032em",
              color: T.neutral,
              paddingLeft: "clamp(22px,3vw,48px)",
            }}
          >
            yang Konsisten,
          </span>
          <span
            className="tm-hl"
            style={{
              fontFamily: T.display,
              fontWeight: 200,
              fontSize: "clamp(42px,4.8vw,72px)",
              lineHeight: 0.92,
              letterSpacing: "-0.032em",
              color: T.primary,
              paddingLeft: "clamp(44px,6vw,96px)",
            }}
          >
            Dirasakan Semua.
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "0.8px",
            background: "rgba(252,249,246,0.08)",
            marginBottom: "clamp(32px,4.5vh,56px)",
          }}
        />

        {/* Featured pull-quote grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(24px,4vw,64px)",
            alignItems: "start",
          }}
          className="max-md:!grid-cols-1"
        >
          {/* Quote content */}
          <div>
            {/* Opening mark */}
            <div
              style={{
                fontFamily: T.display,
                fontWeight: 200,
                fontSize: "clamp(72px,8vw,120px)",
                lineHeight: 0.6,
                color: T.primary,
                opacity: 0.22,
                marginBottom: "-8px",
                userSelect: "none",
              }}
              aria-hidden="true"
            >
              "
            </div>

            {/* Quote text */}
            <div ref={quoteRef} style={{ opacity: 0 }}>
              <p
                style={{
                  fontFamily: T.display,
                  fontWeight: 200,
                  fontSize: "clamp(20px,2.4vw,34px)",
                  lineHeight: 1.46,
                  letterSpacing: "-0.022em",
                  color: T.neutral,
                  maxWidth: "70ch",
                }}
              >
                {review.review}
              </p>
            </div>
          </div>

          {/* Rating + nav */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "20px",
              paddingTop: "clamp(16px,2vh,28px)",
            }}
          >
            {/* Stars */}
            <div style={{ display: "flex", gap: "5px" }}>
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < (review.rating ?? 5);
                return (
                  <Star
                    key={i}
                    size={14}
                    strokeWidth={1.5}
                    style={{
                      color: filled ? T.primary : "rgba(252,249,246,0.32)",
                      fill: filled ? T.primary : "transparent",
                    }}
                  />
                );
              })}
            </div>

            {/* Counter */}
            <span
              style={{
                fontFamily: T.body,
                fontSize: "9px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(252,249,246,0.3)",
              }}
            >
              {review.id} / {String(REVIEWS.length).padStart(2, "0")}
            </span>

            {/* Navigation */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="tm-nav-btn"
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} strokeWidth={1.6} />
              </button>
              <button
                className="tm-nav-btn"
                type="button"
                onClick={() => navigate(1)}
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} strokeWidth={1.6} />
              </button>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: "6px" }}>
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="tm-dot"
                  onClick={() => navigate(i - activeIdx)}
                  aria-label={`Go to review ${i + 1}`}
                  style={{
                    width: i === activeIdx ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "0px",
                    background:
                      i === activeIdx ? T.primary : "rgba(252,249,246,0.22)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Author meta */}
        <div
          ref={metaRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "clamp(28px,3.8vh,48px)",
            paddingTop: "clamp(20px,2.8vh,32px)",
            borderTop: "0.8px solid rgba(252,249,246,0.08)",
            opacity: 0,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              flexShrink: 0,
              background: "rgba(244,124,89,0.12)",
              border: "0.8px solid rgba(244,124,89,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: T.body,
              fontSize: "14px",
              fontWeight: 600,
              color: T.primary,
            }}
          >
            {review.name.charAt(0)}
          </div>
          <div>
            <p
              style={{
                fontFamily: T.body,
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "-0.01em",
                color: T.neutral,
                marginBottom: "3px",
              }}
            >
              {review.name}
            </p>
            <p
              style={{
                fontFamily: T.body,
                fontSize: "9px",
                letterSpacing: "1.6px",
                textTransform: "uppercase",
                color: "rgba(252,249,246,0.42)",
              }}
            >
              {review.type} · {review.stay}
            </p>
          </div>
        </div>
      </div>

      {/* ── Marquee section ─────────────────────────────────────── */}
      <div
        ref={marqueeRef}
        className="tm-marquee-wrap"
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "0.8px solid rgba(252,249,246,0.07)",
          paddingTop: "clamp(20px,3vh,36px)",
          paddingBottom: "clamp(32px,4vh,52px)",
          overflow: "hidden",
          opacity: 0,
        }}
      >
        {/* Fade edges */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "clamp(40px,8vw,120px)",
            background: `linear-gradient(to right, ${T.dark}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "clamp(40px,8vw,120px)",
            background: `linear-gradient(to left, ${T.dark}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Lane A — left */}
        <div style={{ overflow: "hidden", marginBottom: "12px" }}>
          <div className="tm-track-a">
            {LANE_A.map((r, i) => (
              <ReviewCard key={`a-${r.name}-${i}`} review={r} />
            ))}
          </div>
        </div>

        {/* Lane B — right */}
        <div style={{ overflow: "hidden" }}>
          <div className="tm-track-b">
            {LANE_B.map((r, i) => (
              <ReviewCard key={`b-${r.name}-${i}`} review={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
