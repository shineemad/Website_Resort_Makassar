import React from "react";
import { ArrowUpRight } from "lucide-react";

const TOKENS = {
  primary: "#F47C59",
  secondary: "#241208",
  tertiary: "#92CFF2",
  neutral: "#FCF9F6",
  border: "#241208",
  displayFont: '"Instrument Serif", serif',
  bodyFont: '"Inter", sans-serif',
};

const Hero = () => {
  return (
    <>
      <style>{`
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes lineShrinkV {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes videoZoom {
          from { transform: scale(1.07); }
          to   { transform: scale(1); }
        }
        .hero-video   { animation: videoZoom 4000ms cubic-bezier(0.4,0,0.2,1) forwards; }
        .a1 { animation: heroFade 300ms cubic-bezier(0.4,0,0.2,1) 60ms both; }
        .a2 { animation: heroFade 300ms cubic-bezier(0.4,0,0.2,1) 140ms both; }
        .a3 { animation: heroFade 300ms cubic-bezier(0.4,0,0.2,1) 220ms both; }
        .a4 { animation: heroFade 300ms cubic-bezier(0.4,0,0.2,1) 300ms both; }
        .a5 { animation: heroFade 300ms cubic-bezier(0.4,0,0.2,1) 380ms both; }
        .a-line  { animation: lineGrow  300ms cubic-bezier(0.4,0,0.2,1) 460ms both; transform-origin: left; }
        .a-bot   { animation: heroFade  300ms cubic-bezier(0.4,0,0.2,1) 540ms both; }
        .a-scroll{ animation: heroFade  300ms ease 620ms both; }
        .a-scrollline { animation: lineShrinkV 300ms cubic-bezier(0.4,0,0.2,1) 700ms both; transform-origin: top; }
        .cta-btn { transition: background-color 0.3s ease, color 0.3s ease; }
        .cta-btn:hover { background-color: #241208 !important; color: #FCF9F6 !important; }
      `}</style>

      <section
        className="relative min-h-screen overflow-hidden"
        style={{ backgroundColor: TOKENS.neutral }}
      >
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            className="hero-video h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=60"
          >
            <source
              src="https://videos.pexels.com/video-files/1739011/1739011-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>
          {/* Overlay keeps text readable while preserving warm tones */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(170deg, rgba(36,18,8,0.10) 0%, rgba(36,18,8,0.30) 40%, rgba(36,18,8,0.72) 100%)",
            }}
          />
        </div>

        {/* Top bar */}
        <header
          className="a1 absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4 sm:px-10 lg:px-12"
          style={{
            fontFamily: TOKENS.bodyFont,
            fontSize: "12px",
            lineHeight: "16px",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            color: "rgba(252,249,246,0.75)",
            borderBottom: "0.8px solid rgba(252,249,246,0.14)",
          }}
        >
          <span style={{ color: TOKENS.neutral, letterSpacing: "1.2px" }}>
            Makassar Golden Hotel
          </span>
          <div className="hidden items-center gap-3 sm:flex">
            <span>★★★★ Pantai Losari</span>
            <span
              style={{
                color: TOKENS.primary,
                border: "0.8px solid rgba(244,124,89,0.6)",
                padding: "4px 12px",
                letterSpacing: "1.2px",
                borderRadius: "2px",
              }}
            >
              Est. 1978
            </span>
          </div>
        </header>

        {/* Main content */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-12">
          {/* Accent label */}
          <p
            className="a2 mb-5"
            style={{
              fontFamily: TOKENS.bodyFont,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: TOKENS.primary,
            }}
          >
            Heritage Hotel · Sulawesi Selatan
          </p>

          {/* Headline */}
          <h1 style={{ lineHeight: 1, letterSpacing: "-0.025em" }}>
            <span
              className="a3 block"
              style={{
                fontFamily: TOKENS.displayFont,
                fontWeight: 200,
                fontSize: "clamp(48px, 8vw, 112px)",
                color: TOKENS.neutral,
              }}
            >
              Matahari
            </span>
            <span
              className="a4 block"
              style={{
                fontFamily: TOKENS.displayFont,
                fontWeight: 200,
                fontStyle: "italic",
                fontSize: "clamp(48px, 8vw, 112px)",
                color: "rgba(252,249,246,0.88)",
                paddingLeft: "clamp(16px, 3vw, 48px)",
              }}
            >
              Terbenam
            </span>
            <span
              className="a5 block"
              style={{
                fontFamily: TOKENS.displayFont,
                fontWeight: 200,
                fontSize: "clamp(48px, 8vw, 112px)",
                color: TOKENS.neutral,
              }}
            >
              Terbaik.
            </span>
          </h1>

          {/* Separator */}
          <div
            className="a-line my-6"
            style={{
              height: "0.8px",
              backgroundColor: "rgba(252,249,246,0.20)",
            }}
          />

          {/* Bottom row */}
          <div className="a-bot flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p
              style={{
                fontFamily: TOKENS.bodyFont,
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "-0.025em",
                color: "rgba(252,249,246,0.78)",
                maxWidth: "448px",
              }}
            >
              Rasakan kemewahan klasik di atas ombak Pantai Losari. Perpaduan
              sempurna antara warisan budaya dan kenyamanan modern bintang
              empat.
            </p>

            <button
              type="button"
              className="cta-btn inline-flex shrink-0 items-center gap-3"
              style={{
                fontFamily: TOKENS.bodyFont,
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "16px",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: TOKENS.neutral,
                backgroundColor: TOKENS.primary,
                padding: "12px 20px",
                border: "none",
                borderRadius: "0px",
                cursor: "pointer",
              }}
            >
              Jelajahi Kamar
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="a-scroll absolute bottom-16 right-6 z-20 flex flex-col items-center gap-3 sm:right-10 lg:right-16"
          style={{
            fontFamily: TOKENS.bodyFont,
            fontSize: "12px",
            lineHeight: "16px",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            color: "rgba(252,249,246,0.35)",
          }}
        >
          <span style={{ writingMode: "vertical-rl" }}>Scroll</span>
          <div
            className="a-scrollline"
            style={{
              width: "0.8px",
              height: "48px",
              backgroundColor: TOKENS.primary,
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
