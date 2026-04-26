import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

/* ─── Design tokens (mirrors DESIGN.md) ───────────────────────────── */
const T = {
  primary:     "#F47C59",
  secondary:   "#241208",
  neutral:     "#FCF9F6",
  display:     '"Instrument Serif", serif',
  body:        '"Inter", sans-serif',
  border:      "0.8px solid rgba(36,18,8,0.18)",
  shadow:
    "rgba(0,0,0,0.035) 0px 2.8px 2.2px, rgba(0,0,0,0.047) 0px 6.7px 5.3px, rgba(0,0,0,0.06) 0px 12.5px 10px, rgba(0,0,0,0.07) 0px 22.3px 17.9px, rgba(0,0,0,0.086) 0px 41.8px 33.4px, rgba(0,0,0,0.12) 0px 100px 80px",
};

/* ─── Stats data ──────────────────────────────────────────────────── */
const STATS = [
  { value: "1985", label: "Berdiri Sejak" },
  { value: "156",  label: "Kamar & Suite" },
  { value: "★★★★", label: "Bintang Empat" },
];

/* ─── About component ─────────────────────────────────────────────── */
const About = () => {
  const sectionRef = useRef(null);

  /* Scroll-reveal via IntersectionObserver — no deps, zero re-renders */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section
          .querySelectorAll("[data-r]")
          .forEach((el, i) =>
            setTimeout(() => el.classList.add("ab-in"), i * 80)
          );
        io.disconnect();
      },
      { threshold: 0.12 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* Reveal classes — data-r drives staggered entrance */
        [data-r] {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 300ms cubic-bezier(0.4,0,0.2,1),
                      transform 300ms cubic-bezier(0.4,0,0.2,1);
          will-change: opacity, transform;
        }
        [data-r].ab-in { opacity: 1; transform: translateY(0); }

        /* Horizontal rule grow */
        [data-r-line] {
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 500ms cubic-bezier(0.4,0,0.2,1);
        }
        [data-r-line].ab-in { transform: scaleX(1); }

        /* Image clip reveal */
        [data-r-img] {
          clip-path: inset(100% 0 0 0);
          transition: clip-path 500ms cubic-bezier(0.4,0,0.2,1) 80ms;
        }
        [data-r-img].ab-in { clip-path: inset(0% 0 0 0); }

        /* Ghost CTA hover */
        .ab-cta {
          transition: background-color 300ms ease, color 300ms ease;
        }
        .ab-cta:hover {
          background-color: #241208 !important;
          color: #FCF9F6 !important;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{ backgroundColor: T.neutral, padding: "96px 0" }}
      >
        {/* ── Bounded container ── */}
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">

          {/* Top rule */}
          <div
            data-r
            data-r-line
            style={{
              height: "0.8px",
              backgroundColor: "rgba(36,18,8,0.14)",
              marginBottom: "64px",
            }}
          />

          {/* ── Two-column grid ── */}
          <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">

            {/* ════ LEFT: Image column ════ */}
            <div className="relative lg:w-[52%]">

              {/* Ghost year — purely decorative */}
              <span
                aria-hidden="true"
                data-r
                style={{
                  fontFamily:    T.display,
                  fontWeight:    200,
                  fontSize:      "clamp(88px, 15vw, 200px)",
                  lineHeight:    1,
                  letterSpacing: "-0.04em",
                  color:         "rgba(36,18,8,0.05)",
                  position:      "absolute",
                  top:           "-0.12em",
                  left:          "-0.06em",
                  pointerEvents: "none",
                  userSelect:    "none",
                  zIndex:        0,
                  whiteSpace:    "nowrap",
                }}
              >
                1985
              </span>

              {/* Gradient border shell (DESIGN.md Elevation technique) */}
              <div
                data-r
                data-r-img
                className="relative z-10"
                style={{
                  padding:      "1px",
                  borderRadius: "2px",
                  background:
                    "linear-gradient(135deg, rgba(244,124,89,0.40) 0%, rgba(255,255,255,0.06) 50%, rgba(36,18,8,0.08) 100%)",
                  boxShadow: T.shadow,
                }}
              >
                <div style={{ borderRadius: "1px", overflow: "hidden" }}>
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=960&q=80"
                    alt="Makassar Golden Hotel — Pantai Losari"
                    style={{
                      width:       "100%",
                      aspectRatio: "4 / 3",
                      objectFit:   "cover",
                      display:     "block",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Floating badge — bottom right */}
              <div
                data-r
                style={{
                  position:        "absolute",
                  bottom:          "-20px",
                  right:           "20px",
                  backgroundColor: T.primary,
                  color:           T.neutral,
                  padding:         "14px 18px",
                  zIndex:          20,
                  fontFamily:      T.body,
                  fontSize:        "10px",
                  letterSpacing:   "1.2px",
                  textTransform:   "uppercase",
                  lineHeight:      1.5,
                  borderRadius:    "0px",
                }}
              >
                <div style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  #1
                </div>
                <div style={{ marginTop: "2px", opacity: 0.9 }}>
                  Pantai Losari
                </div>
              </div>
            </div>

            {/* ════ RIGHT: Text column ════ */}
            <div
              className="flex flex-col lg:w-[48%]"
              style={{ paddingTop: "12px" }}
            >

              {/* Eyebrow label */}
              <p
                data-r
                style={{
                  fontFamily:    T.body,
                  fontSize:      "12px",
                  fontWeight:    400,
                  lineHeight:    "16px",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color:         T.primary,
                  marginBottom:  "16px",
                }}
              >
                Warisan Kemewahan Makassar
              </p>

              {/* H2 — Instrument Serif weight 200, italic mix */}
              <h2
                data-r
                style={{
                  fontFamily:    T.display,
                  fontWeight:    200,
                  fontSize:      "clamp(36px, 4vw, 54px)",
                  lineHeight:    1.0,
                  letterSpacing: "-0.025em",
                  color:         T.secondary,
                  marginBottom:  "32px",
                }}
              >
                Lebih Dari Sekadar<br />
                Tempat Singgah,{" "}
                <em>Sebuah&nbsp;Ikon Sejarah.</em>
              </h2>

              {/* Section divider */}
              <div
                data-r
                data-r-line
                style={{
                  height:          "0.8px",
                  backgroundColor: "rgba(36,18,8,0.16)",
                  marginBottom:    "28px",
                }}
              />

              {/* Body paragraph 1 */}
              <p
                data-r
                style={{
                  fontFamily:    T.body,
                  fontSize:      "14px",
                  fontWeight:    400,
                  lineHeight:    "20px",
                  letterSpacing: "-0.025em",
                  color:         "rgba(36,18,8,0.68)",
                  marginBottom:  "16px",
                }}
              >
                Berdiri megah sejak 1985, Makassar Golden Hotel adalah pelopor
                keramahan bintang 4 di jantung kota. Kami telah menjadi saksi
                bisu ribuan senja dan momen berharga. Di sini, sentuhan
                keanggunan klasik berpadu sempurna dengan kenyamanan fasilitas
                modern, menyambut Anda seperti kembali ke rumah.
              </p>

              {/* Body paragraph 2 */}
              <p
                data-r
                style={{
                  fontFamily:    T.body,
                  fontSize:      "14px",
                  fontWeight:    400,
                  lineHeight:    "20px",
                  letterSpacing: "-0.025em",
                  color:         "rgba(36,18,8,0.68)",
                  marginBottom:  "40px",
                }}
              >
                Langkah kaki Anda langsung menyentuh ikon Pantai Losari.
                Dengan pemandangan laut lepas yang memukau dan akses mudah ke
                pusat kuliner serta situs bersejarah, kami menawarkan
                pengalaman menginap dengan lokasi yang tak tertandingi di
                Makassar.
              </p>

              {/* ── Stats grid ── */}
              <div
                data-r
                style={{
                  display:             "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  borderTop:           T.border,
                  borderLeft:          T.border,
                  marginBottom:        "48px",
                }}
              >
                {STATS.map(({ value, label }) => (
                  <div
                    key={label}
                    style={{
                      borderRight:  T.border,
                      borderBottom: T.border,
                      padding:      "16px 12px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily:    T.display,
                        fontWeight:    200,
                        fontSize:      "26px",
                        lineHeight:    1,
                        letterSpacing: "-0.025em",
                        color:         T.secondary,
                        marginBottom:  "4px",
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontFamily:    T.body,
                        fontSize:      "10px",
                        fontWeight:    400,
                        lineHeight:    "16px",
                        letterSpacing: "1.2px",
                        textTransform: "uppercase",
                        color:         "rgba(36,18,8,0.42)",
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Ghost / outline CTA */}
              <div data-r>
                <button
                  type="button"
                  className="ab-cta inline-flex items-center gap-3"
                  style={{
                    fontFamily:      T.body,
                    fontSize:        "12px",
                    fontWeight:      400,
                    lineHeight:      "16px",
                    letterSpacing:   "1.2px",
                    textTransform:   "uppercase",
                    color:           T.secondary,
                    backgroundColor: "transparent",
                    border:          "0.8px solid #241208",
                    borderRadius:    "0px",
                    padding:         "12px 20px",
                    cursor:          "pointer",
                  }}
                >
                  Jelajahi Fasilitas
                  <ArrowUpRight style={{ width: "14px", height: "14px" }} />
                </button>
              </div>

            </div>
          </div>

          {/* Bottom rule */}
          <div
            data-r
            data-r-line
            style={{
              height:          "0.8px",
              backgroundColor: "rgba(36,18,8,0.14)",
              marginTop:       "80px",
            }}
          />
        </div>
      </section>
    </>
  );
};

export default About;
