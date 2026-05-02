import React, { useEffect, useRef } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const navLinks = [
  { label: "Tentang Kami", href: "#about" },
  { label: "Kamar & Suite", href: "#featured-rooms" },
  { label: "Fasilitas", href: "#facilities" },
  { label: "Lokasi", href: "#location" },
  { label: "Ulasan Tamu", href: "#testimonials" },
];

const contactItems = [
  {
    Icon: MapPin,
    text: "Jl. Pasar Ikan No. 52, Makassar, Sulawesi Selatan 90111",
  },
  { Icon: Phone, text: "+62 411 313 737" },
  { Icon: Mail, text: "reservasi@makassargoldenhotel.com" },
];

function Footer() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const revealNodes =
      sectionRef.current?.querySelectorAll("[data-ft-reveal]");
    if (!revealNodes || revealNodes.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
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
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FCF9F6" }}
    >
      <style>{`
        .ft-reveal {
          opacity: 0;
          transform: translate3d(0, 14px, 0) scale(0.993);
          transition:
            opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--ft-delay, 0ms);
        }

        .ft-reveal.is-visible {
          opacity: 1;
          transform: none;
        }

        .ft-hairline {
          border-top: 0.8px solid rgba(36, 18, 8, 0.2);
        }

        .ft-gridline {
          border-top: 0.8px solid rgba(36, 18, 8, 0.14);
          border-bottom: 0.8px solid rgba(36, 18, 8, 0.14);
        }

        .ft-nav-link {
          position: relative;
          display: inline-block;
          color: rgba(36, 18, 8, 0.72);
          transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);
          font-family: "Inter", sans-serif;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .ft-nav-link::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 0.8px;
          background-color: #F47C59;
          transition: width 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ft-nav-link:hover {
          color: #241208;
        }

        .ft-nav-link:hover::after {
          width: 100%;
        }

        .ft-note-link {
          color: rgba(36, 18, 8, 0.66);
          transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }

        .ft-note-link:hover {
          color: #F47C59;
        }

        .ft-divider {
          border: none;
          border-top: 0.8px solid rgba(36, 18, 8, 0.2);
          margin: 0;
        }

        .ft-end-logo-wrap {
          border-top: 0.8px solid rgba(36, 18, 8, 0.14);
          padding-top: 20px;
          padding-bottom: 26px;
        }

        .ft-end-logo-mark {
          display: block;
          font-family: "Instrument Serif", serif;
          font-weight: 200;
          font-size: clamp(64px, 15vw, 196px);
          line-height: 0.84;
          letter-spacing: -0.04em;
          color: rgba(36, 18, 8, 0.92);
          text-align: center;
          user-select: none;
        }

        .ft-end-logo-name {
          margin-top: 8px;
          text-align: center;
          font-family: "Inter", sans-serif;
          font-size: clamp(10px, 1.5vw, 12px);
          line-height: 16px;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: rgba(36, 18, 8, 0.56);
        }

        @media (max-width: 767px) {
          .ft-reveal {
            transition-duration: 480ms;
          }

          .ft-end-logo-wrap {
            padding-top: 16px;
            padding-bottom: 22px;
          }

          .ft-end-logo-name {
            letter-spacing: 1.3px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ft-reveal {
            transition: none;
            opacity: 1;
            transform: none;
          }

          .ft-nav-link::after {
            transition: none;
          }

        }
      `}</style>

      {/* Ambient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(56% 44% at 10% 8%, rgba(244,124,89,0.2), transparent 72%), radial-gradient(40% 36% at 90% 88%, rgba(36,18,8,0.08), transparent 72%), linear-gradient(180deg, rgba(252,249,246,1) 0%, rgba(252,249,246,1) 100%)",
        }}
      />

      {/* Top border accent line */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(244,124,89,0.64) 30%, rgba(244,124,89,0.9) 50%, rgba(244,124,89,0.64) 72%, transparent 100%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* Editorial header line */}
        <div className="ft-hairline" aria-hidden="true" />

        {/* Brand statement */}
        <div
          className="ft-reveal pb-10 pt-12 lg:pb-12 lg:pt-14"
          data-ft-reveal
          style={{ "--ft-delay": "70ms" }}
        >
          <p
            className="text-xs uppercase tracking-[1.2px]"
            style={{ color: "#F47C59", fontFamily: '"Inter", sans-serif' }}
          >
            Since 1985
          </p>

          <h2
            className="mt-4 max-w-[18ch] text-4xl sm:text-5xl lg:text-[56px]"
            style={{
              color: "#241208",
              fontFamily: '"Instrument Serif", serif',
              fontWeight: 200,
              lineHeight: 0.94,
              letterSpacing: "-0.025em",
            }}
          >
            Penutup yang tenang untuk perjalanan Anda di Makassar.
          </h2>

          <p
            className="mt-5 max-w-[64ch]"
            style={{
              color: "rgba(36,18,8,0.72)",
              fontFamily: '"Inter", sans-serif',
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "-0.025em",
            }}
          >
            Makassar Golden Hotel merangkum kehangatan heritage, ritme pesisir,
            dan kenyamanan modern dalam satu alamat yang selalu kembali dicari.
          </p>
        </div>

        {/* Triptych grid */}
        <div className="ft-gridline grid grid-cols-1 gap-8 py-10 lg:grid-cols-[1.2fr_0.9fr] lg:gap-10 lg:py-12">
          {/* Column 1 - utility note */}
          <div
            className="ft-reveal"
            data-ft-reveal
            style={{ "--ft-delay": "110ms" }}
          >
            <p
              className="mb-4 text-xs uppercase tracking-[1.2px]"
              style={{
                color: "rgba(36,18,8,0.6)",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Catatan Tamu
            </p>

            <p
              className="max-w-[42ch]"
              style={{
                color: "rgba(36,18,8,0.82)",
                fontFamily: '"Inter", sans-serif',
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "-0.025em",
              }}
            >
              Dari sunrise di tepi Losari hingga malam penuh rasa khas Makassar,
              setiap detail dirancang agar perjalanan Anda pulang dengan
              kenangan yang utuh.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href="mailto:reservasi@makassargoldenhotel.com"
                className="ft-note-link text-xs uppercase tracking-[1.2px]"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Kirim Email
              </a>
              <span style={{ color: "rgba(36,18,8,0.24)" }}>•</span>
              <a
                href="tel:+62411313737"
                className="ft-note-link text-xs uppercase tracking-[1.2px]"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Hubungi Front Desk
              </a>
            </div>
          </div>

          {/* Column 2 - navigation + contact */}
          <div
            className="grid grid-cols-1 gap-10 ft-reveal"
            data-ft-reveal
            style={{ "--ft-delay": "150ms" }}
          >
            {/* Navigation */}
            <div>
              <p
                className="mb-4 text-xs uppercase tracking-[1.2px]"
                style={{
                  color: "rgba(36,18,8,0.6)",
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Navigasi
              </p>
              <nav>
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="ft-nav-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <p
                className="mb-4 text-xs uppercase tracking-[1.2px]"
                style={{
                  color: "rgba(36,18,8,0.6)",
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Hubungi Kami
              </p>
              <ul className="space-y-4">
                {contactItems.map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span
                      className="mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center"
                      style={{
                        border: "0.8px solid rgba(36,18,8,0.2)",
                        borderRadius: "2px",
                        backgroundColor: "rgba(244,124,89,0.12)",
                      }}
                    >
                      <Icon
                        size={12}
                        strokeWidth={1.8}
                        style={{ color: "#F47C59" }}
                      />
                    </span>
                    <p
                      style={{
                        color: "rgba(36,18,8,0.82)",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "13px",
                        lineHeight: "20px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <hr className="ft-divider" />

        {/* Bottom bar */}
        <div
          className="ft-reveal flex flex-wrap items-center justify-between gap-4 py-5"
          data-ft-reveal
          style={{ "--ft-delay": "180ms" }}
        >
          <p
            style={{
              color: "rgba(36,18,8,0.62)",
              fontFamily: '"Inter", sans-serif',
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.01em",
            }}
          >
            © {new Date().getFullYear()} Makassar Golden Hotel. Semua hak
            dilindungi.
          </p>

          <p
            style={{
              color: "rgba(36,18,8,0.56)",
              fontFamily: '"Inter", sans-serif',
              fontSize: "11px",
              lineHeight: "16px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Heritage Hotel · Sulawesi Selatan
          </p>
        </div>

        {/* End logo */}
        <div
          className="ft-end-logo-wrap ft-reveal"
          data-ft-reveal
          style={{ "--ft-delay": "220ms" }}
          aria-label="Makassar Golden Hotel logo"
        >
          <span className="ft-end-logo-mark">MGH</span>
          <p className="ft-end-logo-name">Makassar Golden Hotel</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
