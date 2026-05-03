import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Budi S.",
    type: "Liburan Keluarga",
    stay: "Suite Sea View - 3 malam",
    review:
      "Pemandangan sunset dari balkon kamar sangat luar biasa. Benar-benar lokasi terbaik di Pantai Losari. Fasilitasnya klasik namun terawat dengan sangat baik.",
  },
  {
    name: "Anita W.",
    type: "Pasangan",
    stay: "Deluxe Room - 2 malam",
    review:
      "Hotel bersejarah dengan pelayanan yang sangat ramah dan profesional. Sarapannya bervariasi dan enak. Sangat direkomendasikan untuk staycation.",
  },
  {
    name: "David L.",
    type: "Perjalanan Bisnis",
    stay: "Executive Room - 2 malam",
    review:
      "Lokasi sangat strategis, malam hari tinggal jalan kaki keluar mencari kuliner khas Makassar. Tidur sangat nyaman, akses ke pusat kota juga cepat.",
  },
  {
    name: "Maya R.",
    type: "Solo Traveler",
    stay: "Classic Room - 1 malam",
    review:
      "Nuansa heritage terasa kuat tapi tidak terasa tua. Stafnya responsif, area publik bersih, dan lokasi sangat memudahkan itinerary singkat saya.",
  },
  {
    name: "Rian T.",
    type: "Staycation",
    stay: "Premier Room - 2 malam",
    review:
      "Saya suka ritme hotel ini: pagi tenang, sore hidup karena view laut. Makanannya juga konsisten enak, terutama menu lokal khas Makassar.",
  },
  {
    name: "Nadia K.",
    type: "Business Trip",
    stay: "Business Room - 3 malam",
    review:
      "Untuk perjalanan kerja, ini pilihan praktis. Akses cepat, kamar nyaman untuk istirahat, dan service tim front office sangat membantu.",
  },
];

const topLaneReviews = [...reviews, ...reviews];
const bottomLaneReviews = [
  ...reviews.slice(2),
  ...reviews.slice(0, 2),
  ...reviews.slice(2),
  ...reviews.slice(0, 2),
];

function ReviewCard({ review, isGhost = false }) {
  return (
    <article
      className="tm6-card shrink-0 p-6 sm:p-7"
      aria-hidden={isGhost ? "true" : undefined}
    >
      <p
        className="text-[11px] uppercase tracking-[1.2px]"
        style={{ color: "#F47C59", fontFamily: '"Inter", sans-serif' }}
      >
        Guest Voice
      </p>

      <div className="mt-3 flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="h-4 w-4"
            style={{ color: "#F47C59", fill: "rgba(244,124,89,0.24)" }}
            strokeWidth={1.7}
          />
        ))}
      </div>

      <p
        className="mt-4"
        style={{
          color: "rgba(252,249,246,0.9)",
          fontFamily: '"Inter", sans-serif',
          fontSize: "15px",
          lineHeight: "28px",
          letterSpacing: "-0.016em",
        }}
      >
        "{review.review}"
      </p>

      <div className="mt-6 flex items-center justify-between gap-4 pt-4">
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: "#FCF9F6", fontFamily: '"Inter", sans-serif' }}
          >
            {review.name}
          </p>
          <p
            className="mt-1 text-xs uppercase tracking-[1.2px]"
            style={{
              color: "rgba(252,249,246,0.58)",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {review.type}
          </p>
        </div>

        <p
          className="text-xs uppercase tracking-[1.2px]"
          style={{
            color: "rgba(252,249,246,0.62)",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {review.stay}
        </p>
      </div>
    </article>
  );
}

function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [marqueeActive, setMarqueeActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const node = sectionRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setMarqueeActive(entry.isIntersecting);
      },
      { root: null, rootMargin: "220px 0px 220px 0px", threshold: 0.01 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [prefersReducedMotion]);

  const revealMotion = (delay = 0) => {
    if (prefersReducedMotion) {
      return {
        initial: false,
      };
    }

    return {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: {
        duration: 0.56,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    };
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-16 lg:py-24"
      style={{ backgroundColor: "#241208" }}
    >
      <style>{`
        .tm6-reveal {
          will-change: transform, opacity;
        }

        .tm6-marquee {
          position: relative;
          overflow: hidden;
          background: rgba(252, 249, 246, 0.04);
        }

        .tm6-marquee::before,
        .tm6-marquee::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: clamp(36px, 7vw, 110px);
          z-index: 2;
          pointer-events: none;
        }

        .tm6-marquee::before {
          left: 0;
          background: linear-gradient(to right, rgba(36, 18, 8, 0.9), transparent);
        }

        .tm6-marquee::after {
          right: 0;
          background: linear-gradient(to left, rgba(36, 18, 8, 0.9), transparent);
        }

        .tm6-track {
          display: flex;
          width: max-content;
          gap: 1rem;
          padding: 1rem;
          will-change: transform;
          animation-play-state: paused;
        }

        .tm6-marquee.is-running.tm6-top .tm6-track {
          animation: tm6MoveLeft 38s linear infinite;
          animation-play-state: running;
        }

        .tm6-marquee.is-running.tm6-bottom .tm6-track {
          animation: tm6MoveRight 44s linear infinite;
          animation-play-state: running;
        }

        .tm6-marquee:hover .tm6-track,
        .tm6-marquee:focus-within .tm6-track {
          animation-play-state: paused;
        }

        .tm6-card {
          width: min(86vw, 390px);
          background: rgba(252, 249, 246, 0.08);
          box-shadow:
            rgba(0, 0, 0, 0.22) 0px 10px 22px -18px,
            rgba(244, 124, 89, 0.16) 0px 14px 24px -22px;
          transition:
            transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tm6-card:hover {
          transform: translateY(-2px);
          background: rgba(252, 249, 246, 0.13);
        }

        @keyframes tm6MoveLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes tm6MoveRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        @media (max-width: 767px) {
          .tm6-top .tm6-track { animation-duration: 28s; }
          .tm6-bottom .tm6-track { animation-duration: 32s; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tm6-track {
            animation: none !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 1.2rem;
          }

          .tm6-card {
            scroll-snap-align: start;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(54% 44% at 12% 14%, rgba(244,124,89,0.22), transparent 72%), radial-gradient(44% 34% at 84% 86%, rgba(252,249,246,0.12), transparent 74%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <motion.p
            className="tm6-reveal text-xs font-semibold uppercase tracking-[1.2px]"
            style={{
              color: "#F47C59",
              fontFamily: '"Inter", sans-serif',
              lineHeight: "16px",
            }}
            {...revealMotion(0.06)}
          >
            Kata Mereka
          </motion.p>

          <motion.h2
            className="tm6-reveal mt-3 text-4xl sm:text-5xl lg:text-[58px]"
            style={{
              color: "#FCF9F6",
              fontFamily: '"Instrument Serif", serif',
              fontWeight: 200,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
            }}
            {...revealMotion(0.12)}
          >
            Stories In Motion, Not Just Testimonials.
          </motion.h2>

          <motion.p
            className="tm6-reveal mx-auto mt-5 max-w-2xl"
            style={{
              color: "rgba(252,249,246,0.74)",
              fontFamily: '"Inter", sans-serif',
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              letterSpacing: "-0.025em",
            }}
            {...revealMotion(0.18)}
          >
            Dua lane bergerak ini menampilkan ritme pengalaman tamu yang terus
            mengalir. Hover untuk memperlambat dan baca tiap cerita lebih dalam.
          </motion.p>
        </div>
      </div>

      <motion.div
        className="tm6-reveal relative z-10 mt-12 space-y-4"
        {...revealMotion(0.24)}
      >
        <div
          className={`tm6-marquee tm6-top${marqueeActive ? " is-running" : ""}`}
        >
          <div className="tm6-track">
            {topLaneReviews.map((review, index) => (
              <ReviewCard
                key={`top-${review.name}-${index}`}
                review={review}
                isGhost={index >= topLaneReviews.length / 2}
              />
            ))}
          </div>
        </div>

        <div
          className={`tm6-marquee tm6-bottom${marqueeActive ? " is-running" : ""}`}
        >
          <div className="tm6-track">
            {bottomLaneReviews.map((review, index) => (
              <ReviewCard
                key={`bottom-${review.name}-${index}`}
                review={review}
                isGhost={index >= bottomLaneReviews.length / 2}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Testimonials;
