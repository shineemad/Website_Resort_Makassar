import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Kamar", id: "featured-rooms" },
  { label: "Fasilitas", id: "facilities" },
  { label: "Lokasi", id: "location" },
  { label: "Ulasan", id: "testimonials" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const overlayRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 72);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(100, (y / docH) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Body scroll lock when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  return (
    <>
      <style>{`
        .nv-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 60px;
          z-index: 9000;
          display: flex;
          align-items: center;
          transition:
            background-color 420ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 420ms cubic-bezier(0.22, 1, 0.36, 1),
            backdrop-filter 420ms;
        }

        .nv-bar.is-scrolled {
          background-color: rgba(36, 18, 8, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 0.8px solid rgba(252, 249, 246, 0.10);
        }

        .nv-inner {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        @media (min-width: 640px) {
          .nv-inner { padding: 0 40px; }
        }
        @media (min-width: 1024px) {
          .nv-inner { padding: 0 48px; }
        }

        /* Logo */
        .nv-logo-btn {
          display: flex;
          align-items: center;
          gap: 11px;
          background: none;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
        }
        .nv-logo-mark {
          font-family: "Instrument Serif", serif;
          font-weight: 200;
          font-size: 22px;
          line-height: 1;
          letter-spacing: -0.022em;
          color: #FCF9F6;
        }
        .nv-logo-sep {
          width: 0.8px;
          height: 14px;
          background: rgba(252,249,246,0.24);
          flex-shrink: 0;
        }
        .nv-logo-name {
          font-family: "Inter", sans-serif;
          font-size: 10px;
          letter-spacing: 1.3px;
          text-transform: uppercase;
          color: rgba(252,249,246,0.52);
          white-space: nowrap;
        }

        /* Desktop nav links */
        .nv-links {
          display: none;
          align-items: center;
          gap: 32px;
        }
        @media (min-width: 768px) {
          .nv-links { display: flex; }
        }

        .nv-link {
          position: relative;
          font-family: "Inter", sans-serif;
          font-size: 11px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: rgba(252, 249, 246, 0.66);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 240ms ease;
        }
        .nv-link::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 0.8px;
          background: #F47C59;
          transition: width 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nv-link:hover,
        .nv-link.is-active { color: #FCF9F6; }
        .nv-link.is-active::after { width: 100%; background: rgba(244,124,89,0.7); }
        .nv-link:hover::after { width: 100%; }

        /* CTA */
        .nv-cta {
          font-family: "Inter", sans-serif;
          font-size: 11px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #FCF9F6;
          background: #F47C59;
          padding: 8px 16px;
          border: none;
          border-radius: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          transition: background 240ms ease, transform 220ms ease;
          flex-shrink: 0;
        }
        .nv-cta:hover {
          background: rgba(244, 124, 89, 0.82);
          transform: translateY(-1px);
        }
        .nv-cta.desktop { display: none; }
        @media (min-width: 768px) {
          .nv-cta.desktop { display: inline-flex; }
        }

        /* Hamburger */
        .nv-burger {
          background: none;
          border: none;
          cursor: pointer;
          color: #FCF9F6;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9010;
          position: relative;
          padding: 4px;
        }
        @media (min-width: 768px) {
          .nv-burger { display: none; }
        }

        /* Scroll progress */
        .nv-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1.5px;
          background: #F47C59;
          transition: width 80ms linear;
        }

        /* Mobile fullscreen overlay */
        .nv-overlay {
          position: fixed;
          inset: 0;
          background: #241208;
          z-index: 9005;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 40px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (min-width: 768px) {
          .nv-overlay { display: none; }
        }
        .nv-overlay.is-open {
          opacity: 1;
          pointer-events: all;
        }

        .nv-mob-label {
          font-family: "Inter", sans-serif;
          font-size: 10px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #F47C59;
          margin-bottom: 28px;
        }

        .nv-mob-btn {
          display: block;
          font-family: "Instrument Serif", serif;
          font-weight: 200;
          font-size: clamp(42px, 10vw, 72px);
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: rgba(252, 249, 246, 0.72);
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 0;
          text-align: left;
          transition: color 260ms ease, transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nv-mob-btn:hover {
          color: #FCF9F6;
          transform: translateX(12px);
        }

        .nv-mob-footer {
          margin-top: 48px;
          padding-top: 28px;
          border-top: 0.8px solid rgba(252, 249, 246, 0.14);
        }

        @media (prefers-reduced-motion: reduce) {
          .nv-bar,
          .nv-link,
          .nv-link::after,
          .nv-cta,
          .nv-overlay,
          .nv-mob-btn,
          .nv-progress { transition: none; }
        }
      `}</style>

      {/* ── Navigation bar ── */}
      <nav
        className={`nv-bar${scrolled ? " is-scrolled" : ""}`}
        aria-label="Navigasi utama"
      >
        <div className="nv-inner">
          {/* Logo */}
          <button
            type="button"
            className="nv-logo-btn"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "auto"
                  : "smooth",
              })
            }
            aria-label="Kembali ke atas halaman"
          >
            <span className="nv-logo-mark">MGH</span>
            <span className="nv-logo-sep hidden sm:block" />
            <span className="nv-logo-name hidden sm:block">
              Makassar Golden Hotel
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="nv-links" role="list">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`nv-link${activeSection === link.id ? " is-active" : ""}`}
                onClick={() => scrollTo(link.id)}
                role="listitem"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href="tel:+62411313737" className="nv-cta desktop">
              Reservasi
              <ArrowUpRight size={12} strokeWidth={2} />
            </a>

            <button
              type="button"
              className="nv-burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu navigasi"}
              aria-expanded={menuOpen}
              aria-controls="nv-mobile-menu"
            >
              {menuOpen ? (
                <X size={22} strokeWidth={1.5} />
              ) : (
                <Menu size={22} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Scroll progress line */}
        <div
          aria-hidden="true"
          className="nv-progress"
          style={{ width: `${progress}%` }}
        />
      </nav>

      {/* ── Mobile fullscreen overlay ── */}
      <div
        id="nv-mobile-menu"
        ref={overlayRef}
        className={`nv-overlay${menuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi mobile"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(48% 44% at 8% 12%, rgba(244,124,89,0.18), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <p className="nv-mob-label" style={{ position: "relative" }}>
          Menu Utama
        </p>

        <nav aria-label="Menu navigasi mobile" style={{ position: "relative" }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              className="nv-mob-btn"
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="nv-mob-footer" style={{ position: "relative" }}>
          <a href="tel:+62411313737" className="nv-cta">
            Reservasi Sekarang
            <ArrowUpRight size={13} strokeWidth={2} />
          </a>
          <p
            style={{
              marginTop: "16px",
              fontFamily: '"Inter", sans-serif',
              fontSize: "12px",
              color: "rgba(252,249,246,0.38)",
              letterSpacing: "-0.01em",
            }}
          >
            Heritage Hotel · Sulawesi Selatan
          </p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
