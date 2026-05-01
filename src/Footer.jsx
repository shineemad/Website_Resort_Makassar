import React, { useEffect, useRef } from "react";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";

const navLinks = [
  { label: "Tentang Kami", href: "#about" },
  { label: "Kamar & Suite", href: "#rooms" },
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
      style={{ backgroundColor: "#241208" }}
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

        .ft-nav-link {
          position: relative;
          display: inline-block;
          color: rgba(252, 249, 246, 0.72);
          transition: color 280ms cubic-bezier(0.4, 0, 0.2, 1);
          font-family: "Inter", sans-serif;
          font-size: 13px;
          line-height: 20px;
          letter-spacing: -0.01em;
        }

        .ft-nav-link::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0%;
          height: 0.8px;
          background-color: #F47C59;
          transition: width 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ft-nav-link:hover {
          color: #FCF9F6;
        }

        .ft-nav-link:hover::after {
          width: 100%;
        }

        .ft-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #F47C59;
          color: #FCF9F6;
          border: 0px solid transparent;
          border-radius: 0px;
          padding: 12px 18px;
          font-family: "Inter", sans-serif;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          transition:
            background-color 280ms cubic-bezier(0.4, 0, 0.2, 1),
            transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ft-cta:hover {
          background-color: rgba(244, 124, 89, 0.84);
          transform: translateY(-1px);
        }

        .ft-cta:active {
          transform: translateY(0);
        }

        .ft-divider {
          border: none;
          border-top: 0.8px solid rgba(252, 249, 246, 0.18);
          margin: 0;
        }

        @media (max-width: 767px) {
          .ft-reveal {
            transition-duration: 480ms;
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

          .ft-cta {
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
            "radial-gradient(52% 44% at 10% 8%, rgba(244,124,89,0.2), transparent 70%), radial-gradient(40% 36% at 90% 88%, rgba(252,249,246,0.1), transparent 72%)",
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
        {/* Upper block */}
        <div className="grid grid-cols-1 gap-12 pb-12 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-16 lg:pt-18">
          {/* Left — brand + tagline + CTA */}
          <div
            className="ft-reveal"
            data-ft-reveal
            style={{ "--ft-delay": "60ms" }}
          >
            <p
              className="text-xs uppercase tracking-[1.2px]"
              style={{ color: "#F47C59", fontFamily: '"Inter", sans-serif' }}
            >
              Since 1985
            </p>

            <h2
              className="mt-3 max-w-[15ch] text-4xl sm:text-5xl lg:text-[56px]"
              style={{
                color: "#FCF9F6",
                fontFamily: '"Instrument Serif", serif',
                fontWeight: 200,
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
            >
              Tetap di Jantung Makassar.
            </h2>

            <p
              className="mt-5 max-w-[52ch]"
              style={{
                color: "rgba(252,249,246,0.72)",
                fontFamily: '"Inter", sans-serif',
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "-0.025em",
              }}
            >
              Setiap menginap di Makassar Golden Hotel adalah perjalanan kembali
              ke warisan kota yang kaya dan hangat. Kami siap menyambut Anda.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="tel:+62411313737" className="ft-cta">
                <Phone size={13} strokeWidth={1.8} />
                <span>Reservasi Sekarang</span>
                <ArrowUpRight size={13} strokeWidth={1.8} />
              </a>
              <a
                href="mailto:reservasi@makassargoldenhotel.com"
                className="text-xs uppercase tracking-[1.2px] transition-colors duration-300"
                style={{
                  color: "rgba(252,249,246,0.68)",
                  fontFamily: '"Inter", sans-serif',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F47C59")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(252,249,246,0.68)")
                }
              >
                atau kirim email →
              </a>
            </div>
          </div>

          {/* Right — nav + contact */}
          <div
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 ft-reveal"
            data-ft-reveal
            style={{ "--ft-delay": "120ms" }}
          >
            {/* Navigation */}
            <div>
              <p
                className="mb-4 text-xs uppercase tracking-[1.2px]"
                style={{
                  color: "rgba(252,249,246,0.48)",
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Navigasi
              </p>
              <nav>
                <ul className="space-y-3">
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
                  color: "rgba(252,249,246,0.48)",
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
                        border: "0.8px solid rgba(252,249,246,0.22)",
                        borderRadius: "2px",
                        backgroundColor: "rgba(244,124,89,0.14)",
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
                        color: "rgba(252,249,246,0.72)",
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
              color: "rgba(252,249,246,0.46)",
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
              color: "rgba(252,249,246,0.38)",
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
      </div>
    </footer>
  );
}

export default Footer;
