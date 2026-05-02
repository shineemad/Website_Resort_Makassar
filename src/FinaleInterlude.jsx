import React, { useEffect, useRef } from "react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";

function FinaleInterlude() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const nodes = sectionRef.current?.querySelectorAll("[data-fi-reveal]");
    if (!nodes || nodes.length === 0) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="finale-interlude"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#1F1007" }}
    >
      <style>{`
        .fi-reveal {
          opacity: 0;
          transform: translate3d(0, 18px, 0) scale(0.992);
          transition:
            opacity 760ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 760ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--fi-delay, 0ms);
        }

        .fi-reveal.is-visible {
          opacity: 1;
          transform: none;
        }

        .fi-top-divider,
        .fi-bottom-divider {
          position: absolute;
          left: 0;
          right: 0;
          height: 1.5px;
          z-index: 5;
        }

        .fi-top-divider {
          top: 0;
          background:
            linear-gradient(to right, transparent 0%, rgba(244,124,89,0.54) 28%, rgba(244,124,89,0.9) 50%, rgba(244,124,89,0.54) 72%, transparent 100%);
        }

        .fi-bottom-divider {
          bottom: 0;
          background:
            linear-gradient(to right, transparent 0%, rgba(252,249,246,0.2) 26%, rgba(252,249,246,0.46) 50%, rgba(252,249,246,0.2) 74%, transparent 100%);
        }

        .fi-eyebrow {
          color: #F47C59;
          font-family: "Inter", sans-serif;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .fi-copy {
          color: rgba(252,249,246,0.9);
          font-family: "Inter", sans-serif;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.025em;
        }

        .fi-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #F47C59;
          color: #FCF9F6;
          border: none;
          border-radius: 0;
          padding: 12px 16px;
          font-family: "Inter", sans-serif;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          text-decoration: none;
          transition:
            background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fi-cta:hover {
          background-color: rgba(244, 124, 89, 0.84);
          transform: translateY(-1px);
        }

        .fi-note-link {
          font-family: "Inter", sans-serif;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(252, 249, 246, 0.64);
          transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }

        .fi-note-link:hover {
          color: #F47C59;
        }

        @media (max-width: 767px) {
          .fi-reveal {
            transition-duration: 520ms;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fi-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .fi-cta,
          .fi-note-link {
            transition: none;
          }
        }
      `}</style>

      <div aria-hidden="true" className="fi-top-divider" />

      <img
        src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2600&q=82"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(112deg, rgba(20,10,5,0.74) 0%, rgba(36,18,8,0.38) 42%, rgba(20,10,5,0.8) 100%), linear-gradient(to top, rgba(20,10,5,0.84) 0%, rgba(20,10,5,0.08) 44%, rgba(20,10,5,0.62) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 42% at 12% 12%, rgba(244,124,89,0.28), transparent 72%), radial-gradient(38% 30% at 88% 86%, rgba(252,249,246,0.14), transparent 74%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(36,18,8,0.7) 0%, transparent 18%, transparent 82%, rgba(36,18,8,0.88) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-end py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
          <article className="max-w-3xl py-2 sm:py-4">
            <h2
              className="fi-reveal mt-2 max-w-[14ch] text-4xl sm:text-5xl lg:text-[58px]"
              data-fi-reveal
              style={{
                "--fi-delay": "120ms",
                color: "#FCF9F6",
                fontFamily: '"Instrument Serif", serif',
                fontWeight: 200,
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
            >
              Tinggalkan Kota dengan Senja Terbaiknya.
            </h2>

            <p
              className="fi-reveal fi-copy mt-5 max-w-[56ch]"
              data-fi-reveal
              style={{
                "--fi-delay": "180ms",
              }}
            >
              Jadikan penutup perjalanan Anda lebih berkesan dengan pemandangan
              laut, ritme kota tua, dan kenyamanan heritage yang hanya dimiliki
              Makassar Golden Hotel.
            </p>

            <div
              className="fi-reveal mt-8 flex flex-wrap items-center gap-3"
              data-fi-reveal
              style={{ "--fi-delay": "240ms" }}
            >
              <a href="tel:+62411313737" className="fi-cta" data-cursor="view">
                <Phone size={13} strokeWidth={1.8} />
                <span>Reservasi Sekarang</span>
                <ArrowUpRight size={13} strokeWidth={1.8} />
              </a>

              <a href="#featured-rooms" className="fi-note-link">
                Lihat Detail Kamar
              </a>
            </div>

            <div
              className="fi-reveal mt-8 flex items-center gap-2"
              data-fi-reveal
              style={{ "--fi-delay": "280ms" }}
            >
              <MapPin
                size={14}
                strokeWidth={1.8}
                style={{ color: "#F47C59" }}
              />
              <p
                style={{
                  color: "rgba(252,249,246,0.86)",
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "12px",
                  lineHeight: "16px",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                }}
              >
                Pantai Losari · Makassar
              </p>
            </div>
          </article>
        </div>
      </div>

      <div aria-hidden="true" className="fi-bottom-divider" />
    </section>
  );
}

export default FinaleInterlude;
