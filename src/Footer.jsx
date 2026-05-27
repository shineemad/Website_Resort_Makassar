import React, { useLayoutEffect, useRef } from "react";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── Design tokens ──────────────────────────────────────────────── */
const T = {
  primary:  "#F47C59",
  dark:     "#241208",
  darker:   "#170e08",
  neutral:  "#FCF9F6",
  display:  '"Instrument Serif", serif',
  body:     '"Inter", sans-serif',
};

const NAV_LINKS = [
  { label: "Tentang Kami",  href: "#about" },
  { label: "Kamar & Suite", href: "#featured-rooms" },
  { label: "Fasilitas",     href: "#facilities" },
  { label: "Lokasi",        href: "#location" },
  { label: "Ulasan Tamu",   href: "#testimonials" },
];

const CONTACT = [
  { Icon: MapPin, text: "Jl. Pasar Ikan No. 52, Makassar 90111" },
  { Icon: Phone,  text: "+62 411 313 737" },
  { Icon: Mail,   text: "reservasi@makassargoldenhotel.com" },
];

/* ── Footer ─────────────────────────────────────────────────────── */
export default function Footer() {
  const footerRef   = useRef(null);
  const eyebrowRef  = useRef(null);
  const headlineRef = useRef(null);
  const subRef      = useRef(null);
  const divARef     = useRef(null);
  const col1Ref     = useRef(null);
  const col2Ref     = useRef(null);
  const col3Ref     = useRef(null);
  const divBRef     = useRef(null);
  const barRef      = useRef(null);
  const mghRef      = useRef(null);

  /* ── GSAP entrance ──────────────────────────────────────────── */
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const st  = { trigger: footerRef.current, start: "top 82%" };
      const st2 = { trigger: footerRef.current, start: "top 75%" };

      /* Eyebrow */
      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, x: -18 },
        { opacity: 1, x: 0, duration: 0.75, ease: "expo.out", scrollTrigger: st },
      );

      /* Headline lines stagger */
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.querySelectorAll(".ft-hl"),
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 1.05, ease: "expo.out", stagger: 0.09, delay: 0.06, scrollTrigger: st },
        );
      }

      /* Sub copy */
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.34, scrollTrigger: st },
      );

      /* Divider A — scaleX from left */
      gsap.fromTo(divARef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.1, ease: "expo.out", delay: 0.42, scrollTrigger: st },
      );

      /* Grid columns stagger */
      gsap.fromTo(
        [col1Ref.current, col2Ref.current, col3Ref.current],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.18, scrollTrigger: st2 },
      );

      /* Divider B */
      gsap.fromTo(divBRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.9, ease: "expo.out", delay: 0.1, scrollTrigger: st2 },
      );

      /* Copyright bar */
      gsap.fromTo(barRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.4, scrollTrigger: st2 },
      );

      /* MGH wordmark */
      gsap.fromTo(mghRef.current,
        { opacity: 0, y: 32, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out", delay: 0.28, scrollTrigger: st2 },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      style={{
        position: "relative",
        overflow: "hidden",
        background: T.dark,
      }}
    >
      <style>{`
        /* Headline lines */
        #footer .ft-hl { display: block; }

        /* Divider */
        #footer .ft-divider {
          height: 0.8px;
          background: rgba(252,249,246,0.1);
        }

        /* Nav links */
        #footer .ft-nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: "Inter", sans-serif;
          font-size: 11px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: rgba(252,249,246,0.5);
          text-decoration: none;
          transition: color 0.24s ease;
        }
        #footer .ft-nav-link::after {
          content: "";
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 0.8px;
          background: #F47C59;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        #footer .ft-nav-link:hover { color: #FCF9F6; }
        #footer .ft-nav-link:hover::after { transform: scaleX(1); }

        /* Contact row */
        #footer .ft-contact-row {
          display: flex; align-items: flex-start; gap: 10px;
        }
        #footer .ft-contact-icon {
          width: 26px; height: 26px; border-radius: 2px; flex-shrink: 0;
          border: 0.8px solid rgba(244,124,89,0.28);
          background: rgba(244,124,89,0.1);
          display: flex; align-items: center; justify-content: center;
        }

        /* CTA link */
        #footer .ft-cta {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: "Inter", sans-serif;
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: #F47C59; text-decoration: none;
          transition: gap 0.24s ease, opacity 0.24s ease;
        }
        #footer .ft-cta:hover { gap: 11px; opacity: 0.82; }

        /* MGH wordmark hover */
        #footer .ft-mgh {
          transition: opacity 0.3s ease, letter-spacing 0.4s ease;
        }
        #footer .ft-mgh:hover {
          opacity: 0.78;
          letter-spacing: -0.02em;
        }

        @media (prefers-reduced-motion: reduce) {
          #footer .ft-nav-link::after { transition: none; }
        }
      `}</style>

      {/* ── Orange top accent line ──────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "1.5px", zIndex: 3,
          background: `linear-gradient(to right, transparent 0%, ${T.primary}88 20%, ${T.primary} 50%, ${T.primary}88 80%, transparent 100%)`,
        }}
      />

      {/* ── Grain overlay ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")",
          opacity: 0.55,
        }}
      />

      {/* ── Ambient glow ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background:
            "radial-gradient(55% 48% at 6% 6%, rgba(244,124,89,0.18), transparent 72%), " +
            "radial-gradient(38% 34% at 94% 92%, rgba(252,249,246,0.05), transparent 70%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* ── Chapter strip ──────────────────────────────────────── */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px clamp(28px,5.5vw,72px)",
            borderBottom: "0.8px solid rgba(252,249,246,0.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{
              fontFamily: T.display, fontWeight: 200,
              fontSize: "clamp(28px,2.8vw,42px)", lineHeight: 1,
              letterSpacing: "-0.04em", color: T.primary, opacity: 0.36,
            }}>07</span>
            <div style={{ width: "0.8px", height: "20px", background: "rgba(252,249,246,0.1)" }} />
            <span style={{
              fontFamily: T.body, fontSize: "9px",
              letterSpacing: "2.2px", textTransform: "uppercase",
              color: "rgba(252,249,246,0.3)",
            }}>Penutup</span>
          </div>
          <span style={{
            fontFamily: T.body, fontSize: "9px",
            letterSpacing: "1.6px", textTransform: "uppercase",
            color: "rgba(252,249,246,0.2)",
          }}>Since 1985</span>
        </div>

        {/* ── Brand statement ─────────────────────────────────────── */}
        <div
          style={{
            padding: "clamp(48px,6vh,80px) clamp(28px,5.5vw,72px) clamp(40px,5vh,56px)",
          }}
        >
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            style={{
              display: "flex", alignItems: "center", gap: "12px",
              marginBottom: "clamp(20px,2.6vh,30px)", opacity: 0,
            }}
          >
            <div style={{ width: "26px", height: "0.8px", background: T.primary }} />
            <span style={{
              fontFamily: T.body, fontSize: "9px",
              letterSpacing: "2.6px", textTransform: "uppercase", color: T.primary,
            }}>Makassar Golden Hotel</span>
          </div>

          {/* Headline — staggered three lines */}
          <div
            ref={headlineRef}
            style={{ marginBottom: "clamp(20px,2.8vh,32px)" }}
          >
            <span className="ft-hl" style={{
              fontFamily: T.display, fontWeight: 200,
              fontSize: "clamp(42px,4.8vw,72px)", lineHeight: 0.92,
              letterSpacing: "-0.032em", color: T.neutral,
            }}>Penutup</span>
            <span className="ft-hl" style={{
              fontFamily: T.display, fontWeight: 200,
              fontSize: "clamp(42px,4.8vw,72px)", lineHeight: 0.92,
              letterSpacing: "-0.032em", color: T.neutral,
              paddingLeft: "clamp(20px,2.8vw,44px)",
            }}>yang Tenang,</span>
            <span className="ft-hl" style={{
              fontFamily: T.display, fontWeight: 200,
              fontSize: "clamp(42px,4.8vw,72px)", lineHeight: 0.92,
              letterSpacing: "-0.032em", color: T.primary,
              paddingLeft: "clamp(40px,5.6vw,88px)",
            }}>Selalu Diingat.</span>
          </div>

          {/* Sub copy */}
          <div
            ref={subRef}
            style={{
              display: "flex", alignItems: "flex-start", justifyContent: "space-between",
              gap: "clamp(24px,4vw,64px)", flexWrap: "wrap", opacity: 0,
            }}
          >
            <p style={{
              fontFamily: T.body, fontSize: "14px",
              lineHeight: 1.72, letterSpacing: "-0.016em",
              color: "rgba(252,249,246,0.6)",
              maxWidth: "52ch",
            }}>
              Makassar Golden Hotel merangkum kehangatan heritage, ritme pesisir,
              dan kenyamanan modern dalam satu alamat yang selalu kembali dicari.
            </p>
            <a href="mailto:reservasi@makassargoldenhotel.com" className="ft-cta">
              Reservasi Sekarang
              <ArrowUpRight size={12} strokeWidth={1.8} />
            </a>
          </div>
        </div>

        {/* ── Divider A ───────────────────────────────────────────── */}
        <div
          ref={divARef}
          className="ft-divider"
          style={{ margin: "0 clamp(28px,5.5vw,72px)" }}
        />

        {/* ── Three-column grid ───────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.8fr 1fr",
            gap: "clamp(24px,4vw,56px)",
            padding: "clamp(36px,4.5vh,56px) clamp(28px,5.5vw,72px)",
          }}
          className="max-lg:!grid-cols-1"
        >
          {/* Col 1 — brand note */}
          <div ref={col1Ref} style={{ opacity: 0 }}>
            <p style={{
              fontFamily: T.body, fontSize: "9px",
              letterSpacing: "2.2px", textTransform: "uppercase",
              color: "rgba(252,249,246,0.3)", marginBottom: "18px",
            }}>Catatan Tamu</p>
            <p style={{
              fontFamily: T.display, fontWeight: 200,
              fontSize: "clamp(15px,1.6vw,20px)", lineHeight: 1.56,
              letterSpacing: "-0.018em", color: "rgba(252,249,246,0.72)",
              marginBottom: "22px",
            }}>
              Dari sunrise di tepi Losari hingga malam penuh rasa khas Makassar,
              setiap detail dirancang agar perjalanan Anda pulang dengan kenangan yang utuh.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="mailto:reservasi@makassargoldenhotel.com" className="ft-cta">
                Kirim Email <ArrowUpRight size={11} strokeWidth={1.8} />
              </a>
              <a href="tel:+62411313737" className="ft-cta">
                Hubungi Front Desk <ArrowUpRight size={11} strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* Col 2 — navigation */}
          <div ref={col2Ref} style={{ opacity: 0 }}>
            <p style={{
              fontFamily: T.body, fontSize: "9px",
              letterSpacing: "2.2px", textTransform: "uppercase",
              color: "rgba(252,249,246,0.3)", marginBottom: "18px",
            }}>Navigasi</p>
            <nav>
              <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0, margin: 0 }}>
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="ft-nav-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — contact */}
          <div ref={col3Ref} style={{ opacity: 0 }}>
            <p style={{
              fontFamily: T.body, fontSize: "9px",
              letterSpacing: "2.2px", textTransform: "uppercase",
              color: "rgba(252,249,246,0.3)", marginBottom: "18px",
            }}>Hubungi Kami</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", padding: 0, margin: 0 }}>
              {CONTACT.map(({ Icon, text }) => (
                <li key={text} className="ft-contact-row">
                  <span className="ft-contact-icon">
                    <Icon size={12} strokeWidth={1.7} style={{ color: T.primary }} />
                  </span>
                  <p style={{
                    fontFamily: T.body, fontSize: "12.5px",
                    lineHeight: 1.62, letterSpacing: "-0.01em",
                    color: "rgba(252,249,246,0.7)", margin: 0,
                  }}>{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider B ───────────────────────────────────────────── */}
        <div
          ref={divBRef}
          className="ft-divider"
          style={{ margin: "0 clamp(28px,5.5vw,72px)" }}
        />

        {/* ── Copyright bar ───────────────────────────────────────── */}
        <div
          ref={barRef}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "12px",
            padding: "16px clamp(28px,5.5vw,72px)",
            opacity: 0,
          }}
        >
          <p style={{
            fontFamily: T.body, fontSize: "11px",
            letterSpacing: "0.4px", color: "rgba(252,249,246,0.38)",
          }}>
            © {new Date().getFullYear()} Makassar Golden Hotel. Semua hak dilindungi.
          </p>
          <p style={{
            fontFamily: T.body, fontSize: "9px",
            letterSpacing: "2px", textTransform: "uppercase",
            color: "rgba(252,249,246,0.26)",
          }}>
            Heritage Hotel · Sulawesi Selatan
          </p>
        </div>

        {/* ── Giant MGH endplate ──────────────────────────────────── */}
        <div
          ref={mghRef}
          style={{
            borderTop: "0.8px solid rgba(252,249,246,0.07)",
            padding: "clamp(14px,2.2vh,28px) clamp(28px,5.5vw,72px) 0",
            opacity: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
          aria-label="Makassar Golden Hotel"
        >
          {/* Wordmark */}
          <p
            className="ft-mgh"
            style={{
              fontFamily: T.display,
              fontWeight: 200,
              fontSize: "clamp(36px,7vw,110px)",
              lineHeight: 0.9,
              letterSpacing: "0.12em",
              color: "rgba(252,249,246,0.88)",
              userSelect: "none",
              display: "block",
              textAlign: "center",
              textTransform: "uppercase",
              paddingBottom: "clamp(16px,2.5vh,32px)",
            }}
          >
            Makassar Golden Hotel
          </p>
        </div>

      </div>
    </footer>
  );
}
