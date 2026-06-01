import React, { useLayoutEffect, useRef, useState } from "react";
import { MapPin, Navigation2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Design tokens ──────────────────────────────────────────────── */
const T = {
  primary: "#F47C59",
  dark: "#241208",
  neutral: "#FCF9F6",
  sand: "#F0E6D8",
  display: '"Instrument Serif", serif',
  body: '"Inter", sans-serif',
};

/* ── Attraction data ────────────────────────────────────────────── */
const PLACES = [
  {
    id: "01",
    name: "Pantai Losari",
    detail: "Tepat di depan hotel",
    dist: "0 m",
    narrative:
      "Sunset line paling ikonik di kota ini — cukup melangkah keluar lobi dan Anda langsung tiba di tepi laut.",
  },
  {
    id: "02",
    name: "Masjid Terapung",
    detail: "5 menit jalan kaki",
    dist: "400 m",
    narrative:
      "Siluet arsitektur terapung yang tenang di atas air, cocok untuk momen pagi dan sore hari.",
  },
  {
    id: "03",
    name: "Somba Opu",
    detail: "5 menit jalan kaki",
    dist: "500 m",
    narrative:
      "Koridor belanja khas Makassar untuk membawa pulang rasa dan cerita lokal.",
  },
  {
    id: "04",
    name: "Benteng Rotterdam",
    detail: "7 menit jalan kaki",
    dist: "700 m",
    narrative:
      "Ruang sejarah yang memperlihatkan lapisan budaya kota pelabuhan dari abad ke abad.",
  },
  {
    id: "05",
    name: "Trans Studio",
    detail: "15 menit berkendara",
    dist: "8 km",
    narrative:
      "Destinasi hiburan modern untuk keluarga, ideal saat ingin agenda yang lebih dinamis.",
  },
];

/* ── Component ──────────────────────────────────────────────────── */
export default function Location() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const coordRef = useRef(null);
  const mapRef = useRef(null);
  const progressRef = useRef(null);
  const itemRefs = useRef([]);
  const activeIdxRef = useRef(0);

  /* ── GSAP: entrance + ScrollTrigger pin ──────────────────────── */
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* 1. Entrance animations — fire as section scrolls into view */
      const entSt = { trigger: sectionRef.current, start: "top 80%" };

      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: entSt,
        },
      );

      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.querySelectorAll(".loc-hl"),
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "expo.out",
            stagger: 0.09,
            delay: 0.06,
            scrollTrigger: entSt,
          },
        );
      }

      gsap.fromTo(
        coordRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.32,
          scrollTrigger: entSt,
        },
      );

      gsap.fromTo(
        mapRef.current,
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.1,
          scrollTrigger: entSt,
        },
      );

      gsap.fromTo(
        itemRefs.current.filter(Boolean),
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.24,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );

      /* 2. ScrollTrigger pin — lock section while stepping through PLACES */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * PLACES.length}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          /* Drive progress bar */
          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleY: Math.max(0.02, self.progress),
            });
          }
          /* Step active index */
          const idx = Math.min(
            PLACES.length - 1,
            Math.floor(self.progress * PLACES.length),
          );
          if (idx !== activeIdxRef.current) {
            activeIdxRef.current = idx;
            setActiveIndex(idx);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── GSAP item active/inactive ──────────────────────────────── */
  useLayoutEffect(() => {
    itemRefs.current.filter(Boolean).forEach((node, i) => {
      if (i === activeIndex) {
        gsap.to(node, {
          borderColor: "rgba(244,124,89,0.32)",
          backgroundColor: "rgba(244,124,89,0.07)",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(node, {
          borderColor: "rgba(36,18,8,0.08)",
          backgroundColor: "rgba(36,18,8,0.02)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  }, [activeIndex]);

  const active = PLACES[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="location"
      style={{
        position: "relative",
        background: T.neutral,
        minHeight: "100svh",
        overflow: "hidden",
      }}
    >
      <style>{`
        #location .loc-hl {
          display: block;
        }
        #location .loc-narrative {
          overflow: hidden;
          transition:
            max-height 0.44s cubic-bezier(0.22,1,0.36,1),
            opacity 0.32s ease,
            margin-top 0.3s ease;
        }
        #location .loc-item-dot {
          transition: background-color 0.32s ease, box-shadow 0.32s ease;
        }
        #location .loc-item-id,
        #location .loc-item-name,
        #location .loc-item-dist {
          transition: color 0.26s ease;
        }
        @media (max-width: 1023px) {
          #location .loc-right    { padding-top: 0 !important; }
          #location .loc-sticky   { position: static !important; }
          #location .loc-grid     { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          #location .loc-narrative { transition: none; }
        }
      `}</style>

      {/* Subtle warm dot-grain texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(36,18,8,0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.45,
        }}
      />

      {/* Warm radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(55% 50% at 100% 100%, rgba(244,124,89,0.1), transparent 70%), " +
            "radial-gradient(40% 40% at 0% 0%, rgba(36,18,8,0.04), transparent 70%)",
        }}
      />

      {/* Coordinate watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-3%",
          top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          fontFamily: T.body,
          fontWeight: 700,
          fontSize: "clamp(48px,6.5vw,96px)",
          letterSpacing: "0.12em",
          color: "rgba(36,18,8,0.028)",
          pointerEvents: "none",
          zIndex: 0,
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        −5.1477° S &nbsp; 119.4327° E
      </div>

      {/* ── Chapter strip ──────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px clamp(28px,5.5vw,72px)",
          borderBottom: "0.8px solid rgba(36,18,8,0.08)",
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
              opacity: 0.38,
            }}
          >
            05
          </span>
          <div
            style={{
              width: "0.8px",
              height: "20px",
              background: "rgba(36,18,8,0.12)",
            }}
          />
          <span
            style={{
              fontFamily: T.body,
              fontSize: "9px",
              letterSpacing: "2.2px",
              textTransform: "uppercase",
              color: "rgba(36,18,8,0.38)",
            }}
          >
            Lokasi Strategis
          </span>
        </div>
        <span
          style={{
            fontFamily: T.body,
            fontSize: "9px",
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            color: "rgba(36,18,8,0.26)",
          }}
        >
          Makassar Golden Hotel
        </span>
      </div>

      {/* ── Main grid ──────────────────────────────────────────── */}
      <div
        className="loc-grid"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "46fr 54fr",
          minHeight: "calc(100svh - 50px)",
        }}
      >
        {/* ═══ LEFT ══════════════════════════════════════════════ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding:
              "clamp(44px,5.5vh,72px) clamp(28px,5.5vw,72px) clamp(40px,5vh,60px)",
            borderRight: "0.8px solid rgba(36,18,8,0.07)",
          }}
        >
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
              marginBottom: "clamp(18px,2.4vh,28px)",
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
              Warisan Kota Pelabuhan
            </span>
          </div>

          {/* Headline */}
          <div
            ref={headlineRef}
            style={{ marginBottom: "clamp(20px,2.8vh,32px)" }}
          >
            <span
              className="loc-hl"
              style={{
                fontFamily: T.display,
                fontWeight: 200,
                fontSize: "clamp(42px,4.8vw,74px)",
                lineHeight: 0.93,
                letterSpacing: "-0.032em",
                color: T.dark,
              }}
            >
              Jantung
            </span>
            <span
              className="loc-hl"
              style={{
                fontFamily: T.display,
                fontWeight: 200,
                fontSize: "clamp(42px,4.8vw,74px)",
                lineHeight: 0.93,
                letterSpacing: "-0.032em",
                color: T.dark,
                paddingLeft: "clamp(18px,2.6vw,40px)",
              }}
            >
              Kota
            </span>
            <span
              className="loc-hl"
              style={{
                fontFamily: T.display,
                fontWeight: 200,
                fontSize: "clamp(42px,4.8vw,74px)",
                lineHeight: 0.93,
                letterSpacing: "-0.032em",
                color: T.primary,
                paddingLeft: "clamp(36px,5.2vw,80px)",
              }}
            >
              Makassar
            </span>
          </div>

          {/* Coordinates */}
          <div
            ref={coordRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "clamp(28px,3.8vh,48px)",
              opacity: 0,
            }}
          >
            <Navigation2
              size={11}
              strokeWidth={1.5}
              style={{ color: T.primary, flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: T.body,
                fontSize: "9.5px",
                letterSpacing: "1.8px",
                textTransform: "uppercase",
                color: "rgba(36,18,8,0.38)",
              }}
            >
              −5.1477° S, 119.4327° E
            </span>
            <div
              style={{
                flex: 1,
                height: "0.8px",
                background: "rgba(36,18,8,0.08)",
              }}
            />
          </div>

          {/* Attractions list with progress track */}
          <div style={{ display: "flex", gap: "16px", flex: 1 }}>
            {/* Vertical progress track */}
            <div
              style={{
                position: "relative",
                width: "1.5px",
                flexShrink: 0,
                background: "rgba(36,18,8,0.08)",
                marginTop: "4px",
                marginBottom: "4px",
                borderRadius: "0px",
              }}
            >
              <div
                ref={progressRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "100%",
                  background: T.primary,
                  transformOrigin: "top center",
                  transform: "scaleY(0.02)",
                  borderRadius: "0px",
                  boxShadow: `0 0 6px rgba(244,124,89,0.4)`,
                }}
              />
            </div>

            {/* Items */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                flex: 1,
              }}
            >
              {PLACES.map((place, i) => {
                const isCur = i === activeIndex;
                return (
                  <div
                    key={place.id}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    style={{
                      position: "relative",
                      padding: "13px 15px",
                      borderRadius: "0px",
                      border: "0.8px solid rgba(36,18,8,0.08)",
                      backgroundColor: "rgba(36,18,8,0.02)",
                      opacity: 0,
                    }}
                  >
                    {/* Timeline dot */}
                    <div
                      className="loc-item-dot"
                      style={{
                        position: "absolute",
                        left: "-24px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: isCur ? T.primary : "rgba(36,18,8,0.16)",
                        boxShadow: isCur
                          ? `0 0 0 3px rgba(244,124,89,0.16), 0 0 8px rgba(244,124,89,0.35)`
                          : "none",
                      }}
                    />

                    {/* Row: id + name + dist */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "12px",
                      }}
                    >
                      <span
                        className="loc-item-id"
                        style={{
                          fontFamily: T.body,
                          fontSize: "9px",
                          letterSpacing: "1.8px",
                          color: isCur ? T.primary : "rgba(36,18,8,0.24)",
                          flexShrink: 0,
                        }}
                      >
                        {place.id}
                      </span>
                      <span
                        className="loc-item-name"
                        style={{
                          fontFamily: T.display,
                          fontWeight: 200,
                          fontSize: "clamp(14px,1.5vw,19px)",
                          letterSpacing: "-0.02em",
                          color: isCur ? T.dark : "rgba(36,18,8,0.45)",
                          flex: 1,
                        }}
                      >
                        {place.name}
                      </span>
                      <span
                        className="loc-item-dist"
                        style={{
                          fontFamily: T.body,
                          fontSize: "9px",
                          letterSpacing: "1.4px",
                          textTransform: "uppercase",
                          color: isCur ? T.primary : "rgba(36,18,8,0.2)",
                          flexShrink: 0,
                        }}
                      >
                        {place.dist}
                      </span>
                    </div>

                    {/* Collapsible narrative */}
                    <div
                      className="loc-narrative"
                      style={{
                        maxHeight: isCur ? "68px" : "0px",
                        opacity: isCur ? 1 : 0,
                        marginTop: isCur ? "7px" : "0",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: T.body,
                          fontSize: "11.5px",
                          lineHeight: 1.66,
                          color: "rgba(36,18,8,0.52)",
                          paddingLeft: "26px",
                          margin: 0,
                        }}
                      >
                        {place.narrative}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══ RIGHT ═════════════════════════════════════════════ */}
        <div
          className="loc-right"
          style={{ padding: "clamp(36px,4.5vh,60px) clamp(24px,4.5vw,60px)" }}
        >
          <div
            className="loc-sticky"
            style={{ position: "sticky", top: "clamp(18px,2.5vh,36px)" }}
          >
            {/* Map card */}
            <div
              ref={mapRef}
              style={{
                position: "relative",
                borderRadius: "0px",
                border: "0.8px solid rgba(36,18,8,0.1)",
                overflow: "hidden",
                boxShadow:
                  "0 2px 4px rgba(36,18,8,0.04), 0 8px 16px rgba(36,18,8,0.08), 0 24px 48px rgba(36,18,8,0.1)",
                opacity: 0,
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  background: "rgba(252,249,246,0.96)",
                  borderBottom: "0.8px solid rgba(36,18,8,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "7px" }}
                >
                  <MapPin
                    size={11}
                    strokeWidth={1.6}
                    style={{ color: T.primary }}
                  />
                  <span
                    style={{
                      fontFamily: T.body,
                      fontSize: "9px",
                      letterSpacing: "1.8px",
                      textTransform: "uppercase",
                      color: "rgba(36,18,8,0.5)",
                    }}
                  >
                    Makassar Golden Hotel
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: T.body,
                    fontSize: "9px",
                    letterSpacing: "1.6px",
                    textTransform: "uppercase",
                    color: T.primary,
                  }}
                >
                  {active.detail}
                </span>
              </div>

              {/* Iframe */}
              <div
                style={{
                  height: "clamp(290px,42vh,540px)",
                  position: "relative",
                }}
              >
                <iframe
                  title="Makassar Golden Hotel Location"
                  src="https://maps.google.com/maps?q=Makassar%20Golden%20Hotel%2C%20Jl.%20Pasar%20Ikan%20No.%2052%2C%20Makassar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    display: "block",
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Card footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "11px 16px",
                  background: "rgba(252,249,246,0.96)",
                  borderTop: "0.8px solid rgba(36,18,8,0.08)",
                }}
              >
                <span
                  style={{
                    fontFamily: T.display,
                    fontWeight: 200,
                    fontSize: "16px",
                    letterSpacing: "-0.02em",
                    color: T.dark,
                  }}
                >
                  {active.name}
                </span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: T.primary,
                      boxShadow: "0 0 5px rgba(244,124,89,0.45)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: T.body,
                      fontSize: "9px",
                      letterSpacing: "1.6px",
                      textTransform: "uppercase",
                      color: "rgba(36,18,8,0.38)",
                    }}
                  >
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(PLACES.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* Address strip */}
            <div
              style={{
                marginTop: "18px",
                paddingLeft: "4px",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "1.5px",
                  alignSelf: "stretch",
                  background: T.primary,
                  opacity: 0.45,
                  flexShrink: 0,
                }}
              />
              <div>
                <p
                  style={{
                    fontFamily: T.body,
                    fontSize: "9px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(36,18,8,0.3)",
                    marginBottom: "5px",
                  }}
                >
                  Alamat
                </p>
                <p
                  style={{
                    fontFamily: T.display,
                    fontWeight: 200,
                    fontSize: "14.5px",
                    lineHeight: 1.52,
                    letterSpacing: "-0.012em",
                    color: "rgba(36,18,8,0.58)",
                  }}
                >
                  Jl. Pasar Ikan No. 52,
                  <br />
                  Losari, Makassar 90111
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
