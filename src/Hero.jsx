import React from "react";
import { ArrowUpRight } from "lucide-react";

/* ─── Design tokens ─────────────────────────────────── */
const T = {
  primary: "#F47C59",
  dark: "#241208",
  cream: "#FCF9F6",
  base: "#0e0906",
  display: '"Instrument Serif", serif',
  body: '"Inter", sans-serif',
};

/* ─── Ticker items (doubled for seamless loop) ────── */
const TICKER = [
  "Makassar Golden Hotel",
  "Heritage Hotel",
  "Sulawesi Selatan",
  "Bintang ★★★★",
  "Pantai Losari",
  "Est. 1985",
  "S 5°08′ · E 119°24′",
  "Jl. Pasar Ikan No.1",
  "Makassar Golden Hotel",
  "Heritage Hotel",
  "Sulawesi Selatan",
  "Bintang ★★★★",
  "Pantai Losari",
  "Est. 1985",
  "S 5°08′ · E 119°24′",
  "Jl. Pasar Ikan No.1",
];

const Hero = () => {
  const handleExplore = () => {
    const el = document.getElementById("featured-rooms");
    if (!el) return;
    el.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <>
      <style>{`
        /* ── Clip-path wipe ── premium left-to-right headline reveal */
        @keyframes heroWipe {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0%   0 0); }
        }
        /* ── Soft fade+rise for metadata / CTA ── */
        @keyframes heroRise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        /* ── Horizontal separator grow ── */
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        /* ── Vertical side-line grow ── */
        @keyframes lineDropV {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        /* ── Video subtle parallax zoom ── */
        @keyframes videoBreath {
          from { transform: scale(1.07); }
          to   { transform: scale(1.01); }
        }
        /* ── Ticker scroll ── */
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        /* ── Scroll dot bounce ── */
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.9; }
          50%       { transform: translateY(7px); opacity: 0.3; }
        }
        /* ── Side counter pulse ── */
        @keyframes tagPulse {
          0%, 100% { opacity: 0.36; }
          50%       { opacity: 0.60; }
        }

        /* Applied classes */
        .h-video { animation: videoBreath 5s cubic-bezier(0.4,0,0.2,1) forwards; }

        .h-w1 { animation: heroWipe 1.0s cubic-bezier(0.22,1,0.36,1)  80ms both; }
        .h-w2 { animation: heroWipe 1.0s cubic-bezier(0.22,1,0.36,1) 240ms both; }
        .h-w3 { animation: heroWipe 1.0s cubic-bezier(0.22,1,0.36,1) 400ms both; }

        .h-k1  { animation: heroRise 0.7s cubic-bezier(0.22,1,0.36,1)  50ms both; }
        .h-k2  { animation: heroRise 0.7s cubic-bezier(0.22,1,0.36,1) 120ms both; }
        .h-sep {
          animation: lineGrow 0.9s cubic-bezier(0.22,1,0.36,1) 500ms both;
          transform-origin: left center;
        }
        .h-desc { animation: heroRise 0.7s cubic-bezier(0.22,1,0.36,1) 560ms both; }
        .h-cta  { animation: heroRise 0.7s cubic-bezier(0.22,1,0.36,1) 660ms both; }
        .h-scr  { animation: heroRise 0.6s ease                        780ms both; }

        .h-side-tag  { animation: tagPulse 4s ease-in-out 1.2s infinite; }
        .h-side-line {
          animation: lineDropV 0.8s cubic-bezier(0.22,1,0.36,1) 900ms both;
          transform-origin: top center;
        }
        .h-scroll-pip { animation: scrollBounce 2.4s ease-in-out infinite; }
        .h-ticker     { animation: tickerScroll 34s linear infinite; will-change: transform; }

        .h-btn-primary {
          transition: background 0.28s ease, color 0.28s ease,
                      transform 0.28s cubic-bezier(0.22,1,0.36,1);
        }
        .h-btn-primary:hover {
          background-color: #241208 !important;
          color: #FCF9F6 !important;
          transform: translateY(-2px);
        }
        .h-btn-ghost {
          transition: background 0.28s ease, border-color 0.28s ease;
        }
        .h-btn-ghost:hover {
          background: rgba(252,249,246,0.10) !important;
        }

        /* Orange pulse dot */
        .h-corner-dot {
          position: absolute;
          bottom: clamp(52px, 7vh, 72px);
          left: clamp(28px, 5.5vw, 88px);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F47C59;
          box-shadow:
            0 0 0  8px rgba(244,124,89,0.16),
            0 0 0 18px rgba(244,124,89,0.06);
          z-index: 20;
        }

        @media (prefers-reduced-motion: reduce) {
          .h-w1,.h-w2,.h-w3,.h-k1,.h-k2,.h-sep,.h-desc,.h-cta,.h-scr,
          .h-side-tag,.h-side-line {
            animation: none;
            opacity: 1;
            clip-path: none;
            transform: none;
          }
          .h-ticker     { animation: none; }
          .h-scroll-pip { animation: none; }
          .h-side-tag   { opacity: 0.36; }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          overflow: "hidden",
          backgroundColor: T.base,
        }}
      >
        {/* ── Video background ── */}
        <div style={{ position: "absolute", inset: 0 }}>
          <video
            className="h-video"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=60"
          >
            <source
              src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_24fps.mp4"
              type="video/mp4"
            />
          </video>

          {/* Layer 1 — base cinematic scrim */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(14,9,6,0.36)",
            }}
          />
          {/* Layer 2 — edge vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 95% 95% at 50% 40%, transparent 36%, rgba(14,9,6,0.80) 100%)",
            }}
          />
          {/* Layer 3 — bottom-up fade (keeps type readable) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(14,9,6,0.94) 0%, rgba(14,9,6,0.34) 30%, transparent 58%)",
            }}
          />
          {/* Layer 4 — top edge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "22%",
              background:
                "linear-gradient(to bottom, rgba(14,9,6,0.44), transparent)",
            }}
          />
        </div>

        {/* ── Left vertical counter ── */}
        <div
          aria-hidden="true"
          className="hidden sm:flex"
          style={{
            position: "absolute",
            left: "clamp(14px, 2.4vw, 26px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            className="h-side-tag"
            style={{
              writingMode: "vertical-rl",
              fontFamily: T.body,
              fontSize: "9px",
              letterSpacing: "2.2px",
              textTransform: "uppercase",
              color: "rgba(252,249,246,0.36)",
              transform: "rotate(180deg)",
              userSelect: "none",
            }}
          >
            01 · 07
          </span>
          <div
            className="h-side-line"
            style={{
              width: "0.8px",
              height: "48px",
              background: "rgba(252,249,246,0.16)",
            }}
          />
        </div>

        {/* ── Main content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            minHeight: "100svh",
          }}
        >
          {/* Top metadata bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "clamp(88px, 12vh, 128px) clamp(28px, 5.5vw, 88px) 0",
            }}
          >
            <p
              className="h-k1"
              style={{
                fontFamily: T.body,
                fontSize: "10px",
                letterSpacing: "2.0px",
                textTransform: "uppercase",
                color: T.primary,
                margin: 0,
              }}
            >
              Heritage Hotel · Sulawesi Selatan
            </p>

            <p
              className="h-k2"
              style={{
                fontFamily: T.body,
                fontSize: "10px",
                letterSpacing: "1.6px",
                textTransform: "uppercase",
                color: "rgba(252,249,246,0.28)",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "16px",
                  height: "0.8px",
                  backgroundColor: "rgba(252,249,246,0.18)",
                  flexShrink: 0,
                }}
              />
              S 5°08′ · E 119°24′
            </p>
          </div>

          {/* Headline — fills remaining space, anchors to bottom */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0 clamp(28px, 5.5vw, 88px) clamp(72px, 10vh, 108px)",
            }}
          >
            {/* Diagonal cascade headline */}
            <h1
              style={{
                margin: "0 0 clamp(22px, 3.8vh, 38px)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
              }}
            >
              {/* Word 1 — flush left */}
              <span
                className="h-w1"
                style={{
                  display: "block",
                  fontFamily: T.display,
                  fontWeight: 200,
                  fontSize: "clamp(60px, 11vw, 166px)",
                  color: T.cream,
                  marginLeft: 0,
                }}
              >
                Matahari
              </span>

              {/* Word 2 — italic, indented */}
              <span
                className="h-w2"
                style={{
                  display: "block",
                  fontFamily: T.display,
                  fontWeight: 200,
                  fontStyle: "italic",
                  fontSize: "clamp(60px, 11vw, 166px)",
                  color: "rgba(252,249,246,0.84)",
                  marginLeft: "clamp(36px, 7.5vw, 118px)",
                }}
              >
                Terbenam
              </span>

              {/* Word 3 — further indented, diagonal cascade */}
              <span
                className="h-w3"
                style={{
                  display: "block",
                  fontFamily: T.display,
                  fontWeight: 200,
                  fontSize: "clamp(60px, 11vw, 166px)",
                  color: T.cream,
                  marginLeft: "clamp(72px, 15vw, 236px)",
                }}
              >
                Terbaik.
              </span>
            </h1>

            {/* Horizontal separator */}
            <div
              className="h-sep"
              style={{
                height: "0.8px",
                background: "rgba(252,249,246,0.16)",
                marginBottom: "clamp(20px, 3.2vh, 30px)",
              }}
            />

            {/* Description + CTA row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "20px",
              }}
            >
              <p
                className="h-desc"
                style={{
                  fontFamily: T.body,
                  fontSize: "14px",
                  lineHeight: "22px",
                  letterSpacing: "-0.016em",
                  color: "rgba(252,249,246,0.66)",
                  maxWidth: "42ch",
                  margin: 0,
                }}
              >
                Rasakan kemewahan klasik di atas ombak Pantai Losari — perpaduan
                warisan budaya dan kenyamanan bintang empat yang hanya ada di
                Makassar.
              </p>

              {/* CTA group */}
              <div
                className="h-cta"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexShrink: 0,
                }}
              >
                <button
                  type="button"
                  className="h-btn-ghost"
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    fontFamily: T.body,
                    fontSize: "11px",
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    color: "rgba(252,249,246,0.58)",
                    background: "transparent",
                    border: "0.8px solid rgba(252,249,246,0.20)",
                    padding: "11px 18px",
                    cursor: "pointer",
                    borderRadius: 0,
                  }}
                >
                  Tentang Kami
                </button>

                <button
                  type="button"
                  className="h-btn-primary"
                  onClick={handleExplore}
                  style={{
                    fontFamily: T.body,
                    fontSize: "11px",
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    color: T.dark,
                    background: T.primary,
                    border: "none",
                    padding: "11px 20px",
                    cursor: "pointer",
                    borderRadius: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Jelajahi Kamar
                  <ArrowUpRight size={13} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          className="h-scr"
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "clamp(52px, 7vh, 72px)",
            right: "clamp(28px, 5.5vw, 88px)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontFamily: T.body,
              fontSize: "9px",
              letterSpacing: "2.2px",
              textTransform: "uppercase",
              color: "rgba(252,249,246,0.26)",
              writingMode: "vertical-rl",
            }}
          >
            Scroll
          </span>
          <div
            className="h-scroll-pip"
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: T.primary,
              boxShadow: "0 0 0 5px rgba(244,124,89,0.18)",
            }}
          />
          <div
            style={{
              width: "0.8px",
              height: "40px",
              background: "rgba(252,249,246,0.12)",
            }}
          />
        </div>

        {/* ── Orange pulse dot accent ── */}
        <div className="h-cta h-corner-dot" aria-hidden="true" />

        {/* ── Bottom ticker ── */}
        <div
          className="h-desc"
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            height: "38px",
            overflow: "hidden",
            borderTop: "0.8px solid rgba(252,249,246,0.08)",
            background: "rgba(14,9,6,0.54)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div
            className="h-ticker"
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "max-content",
            }}
          >
            {TICKER.map((item, i) => (
              <React.Fragment key={i}>
                <span
                  style={{
                    fontFamily: T.body,
                    fontSize: "9.5px",
                    letterSpacing: "1.8px",
                    textTransform: "uppercase",
                    color: "rgba(252,249,246,0.40)",
                    padding: "0 28px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </span>
                <span
                  style={{
                    color: T.primary,
                    fontSize: "6px",
                    flexShrink: 0,
                    lineHeight: 1,
                    opacity: 0.65,
                  }}
                >
                  ◆
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
