import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { gsap } from "gsap";

/* ── Cursor-follower images — 8 hotel / Makassar scenes ── */
const HOVER_IMAGES = [
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=700&q=80",
];

function FinaleInterlude() {
  const prefersReducedMotion = useReducedMotion();

  /* ── Cursor follower state ── */
  const imgRef = useRef(null);
  const turbulenceRef = useRef(null);
  const displacementRef = useRef(null);
  const glintRef = useRef(null);
  const rippleLayerRef = useRef(null);
  const sectionRef = useRef(null);
  const articleRef = useRef(null);
  const imgIndexRef = useRef(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const section = sectionRef.current;
    const img = imgRef.current;
    const turbulence = turbulenceRef.current;
    const displacement = displacementRef.current;
    const glint = glintRef.current;
    if (!section || !img || !turbulence || !displacement || !glint) return;

    let wasOutside = false;
    let lastPointer = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };
    let lastRippleAt = 0;

    gsap.set(img, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.82,
      rotate: 0,
      force3D: true,
    });
    gsap.set(glint, { opacity: 0, xPercent: -62, yPercent: 0, scaleX: 0.9 });

    const xTo = gsap.quickTo(img, "x", {
      duration: 0.44,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(img, "y", {
      duration: 0.44,
      ease: "power3.out",
    });
    const rotateTo = gsap.quickTo(img, "rotate", {
      duration: 0.3,
      ease: "power2.out",
    });
    const scaleTo = gsap.quickTo(img, "scale", {
      duration: 0.36,
      ease: "power3.out",
    });

    const spawnRipple = (x, y, strength = 1) => {
      const layer = rippleLayerRef.current;
      if (!layer) return;

      const ripple = document.createElement("span");
      ripple.className = "fi-water-ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      layer.appendChild(ripple);

      const baseSize = 34 + Math.random() * 34;
      const size = baseSize + strength * 28;

      gsap.fromTo(
        ripple,
        {
          xPercent: -50,
          yPercent: -50,
          width: 8,
          height: 8,
          opacity: 0.42,
          scale: 0.24,
        },
        {
          width: size,
          height: size,
          opacity: 0,
          scale: 1,
          duration: 0.92,
          ease: "power2.out",
          onComplete: () => {
            ripple.remove();
          },
        },
      );
    };

    const triggerShimmer = (strength = 1) => {
      const bump = gsap.utils.clamp(0, 1.45, strength);
      const shimmerScale = 10 + bump * 24;
      const freqX = (0.009 + bump * 0.01).toFixed(4);
      const freqY = (0.013 + bump * 0.012).toFixed(4);

      turbulence.setAttribute(
        "seed",
        `${Math.floor(Math.random() * 120) + 11}`,
      );
      gsap.killTweensOf([turbulence, displacement, glint]);
      gsap.set(turbulence, {
        attr: { baseFrequency: `${freqX} ${freqY}` },
      });

      gsap.fromTo(
        displacement,
        { attr: { scale: 0 } },
        {
          attr: { scale: shimmerScale },
          duration: 0.22,
          ease: "power2.out",
        },
      );

      gsap.to(displacement, {
        attr: { scale: 0 },
        duration: 0.72,
        delay: 0.16,
        ease: "expo.out",
      });

      gsap.to(turbulence, {
        attr: { baseFrequency: "0.0040 0.0070" },
        duration: 0.94,
        delay: 0.05,
        ease: "sine.out",
      });

      gsap.fromTo(
        glint,
        {
          opacity: 0,
          xPercent: -68,
          scaleX: 0.86,
        },
        {
          opacity: 0.32,
          xPercent: 72,
          scaleX: 1.2,
          duration: 0.74,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(glint, { opacity: 0, duration: 0.24, ease: "sine.out" });
          },
        },
      );
    };

    const isOutsideArticle = (cx, cy) => {
      const article = articleRef.current;
      if (!article) return true;
      const r = article.getBoundingClientRect();
      const pad = 24;
      return (
        cx < r.left - pad ||
        cx > r.right + pad ||
        cy < r.top - pad ||
        cy > r.bottom + pad
      );
    };

    const onMouseEnter = (e) => {
      lastPointer = { x: e.clientX, y: e.clientY };
      velocity = { x: 0, y: 0 };
      xTo(e.clientX);
      yTo(e.clientY);
      rotateTo(0);
      scaleTo(0.84);
    };

    const onMouseMove = (e) => {
      velocity = {
        x: e.clientX - lastPointer.x,
        y: e.clientY - lastPointer.y,
      };
      lastPointer = { x: e.clientX, y: e.clientY };

      xTo(e.clientX);
      yTo(e.clientY);
      rotateTo(gsap.utils.clamp(-12, 12, velocity.x * 0.6));

      const outside = isOutsideArticle(e.clientX, e.clientY);
      if (outside && !wasOutside) {
        imgIndexRef.current = (imgIndexRef.current + 1) % HOVER_IMAGES.length;
        setImgIndex(imgIndexRef.current);
        setIsHovering(true);
        scaleTo(1);
        spawnRipple(e.clientX, e.clientY, 1.2);
        triggerShimmer(0.9);
      } else if (!outside && wasOutside) {
        setIsHovering(false);
        scaleTo(0.84);
        rotateTo(0);
      }

      if (outside) {
        const speed = Math.hypot(velocity.x, velocity.y);
        const now = performance.now();
        if (speed > 26 && now - lastRippleAt > 150) {
          spawnRipple(e.clientX, e.clientY, Math.min(1.35, speed / 42));
          triggerShimmer(Math.min(1.4, speed / 34));
          lastRippleAt = now;
        }
      }
      wasOutside = outside;
    };

    const onMouseLeave = (e) => {
      wasOutside = false;
      setIsHovering(false);
      spawnRipple(e.clientX, e.clientY, 1.5);
      triggerShimmer(1.05);

      gsap.to(img, {
        x: e.clientX + velocity.x * 2.6,
        y: e.clientY + velocity.y * 2.6,
        rotate: gsap.utils.clamp(-8, 8, velocity.x * 0.35),
        scale: 0.76,
        duration: 0.52,
        ease: "power3.out",
      });

      gsap.to(img, {
        rotate: 0,
        duration: 0.68,
        ease: "expo.out",
      });
    };

    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
      gsap.killTweensOf(img);
      const layer = rippleLayerRef.current;
      if (layer) {
        layer.querySelectorAll(".fi-water-ripple").forEach((node) => {
          node.remove();
        });
      }
      gsap.killTweensOf([turbulence, displacement, glint]);
      gsap.set(glint, { opacity: 0 });
      gsap.set(displacement, { attr: { scale: 0 } });
    };
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
      viewport: { once: true, amount: 0.28 },
      transition: {
        duration: 0.56,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    };
  };

  return (
    <section
      id="finale-interlude"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#FCF9F6" }}
    >
      <style>{`
        .fi-reveal {
          will-change: transform, opacity;
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
            linear-gradient(to right, transparent 0%, rgba(36,18,8,0.08) 26%, rgba(36,18,8,0.18) 50%, rgba(36,18,8,0.08) 74%, transparent 100%);
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
          color: rgba(36,18,8,0.82);
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
          color: #241208;
          border: 0.8px solid rgba(36,18,8,0.26);
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
            color 300ms cubic-bezier(0.4, 0, 0.2, 1),
            border-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fi-cta:hover {
          background-color: #241208;
          color: #FCF9F6;
          border-color: rgba(36,18,8,0.92);
          transform: translateY(-1px);
        }

        .fi-note-link {
          font-family: "Inter", sans-serif;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(36,18,8,0.72);
          transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }

        .fi-note-link:hover {
          color: #241208;
        }

        .fi-divider-line {
          display: block;
          width: clamp(32px, 6vw, 56px);
          height: 0.8px;
          background-color: rgba(244,124,89,0.72);
          margin: 0 auto;
        }

        /* ── Cursor follower image ── */
        .fi-cursor-img {
          position: fixed;
          pointer-events: none;
          z-index: 9990;
          width: clamp(140px, 14vw, 200px);
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 2px;
          box-shadow:
            0 28px 56px rgba(36,18,8,0.22),
            0 8px 18px rgba(36,18,8,0.14);
          opacity: 0;
          transform: rotate(0deg) scale(0.82);
          transition:
            opacity 460ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
          isolation: isolate;
        }

        .fi-cursor-img.is-visible {
          opacity: 1;
        }

        .fi-cursor-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: url(#fi-liquid-distortion);
          will-change: filter;
        }

        .fi-liquid-glint {
          position: absolute;
          inset: -8% -32%;
          pointer-events: none;
          background:
            linear-gradient(
              104deg,
              transparent 22%,
              rgba(252,249,246,0.1) 40%,
              rgba(252,249,246,0.34) 52%,
              rgba(244,124,89,0.22) 60%,
              transparent 76%
            );
          mix-blend-mode: screen;
          z-index: 2;
          will-change: transform, opacity;
        }

        /* Caption strip on image */
        .fi-cursor-img::after {
          content: "Makassar · Indonesia";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 10px 12px;
          font-family: "Inter", sans-serif;
          font-size: 10px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: rgba(252,249,246,0.7);
          background: linear-gradient(to top, rgba(36,18,8,0.62), transparent);
        }

        .fi-ripple-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 8;
          overflow: hidden;
        }

        .fi-water-ripple {
          position: absolute;
          border-radius: 999px;
          border: 1.4px solid rgba(244,124,89,0.55);
          box-shadow:
            0 0 0 1px rgba(252,249,246,0.32) inset,
            0 0 24px rgba(244,124,89,0.18);
          backdrop-filter: blur(1.5px);
          transform: translate(-50%, -50%);
          will-change: width, height, opacity, transform;
        }

        @media (max-width: 1023px) {
          .fi-cursor-img { display: none; }
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
          .fi-note-link,
          .fi-cursor-img {
            transition: none;
          }
        }
      `}</style>

      {/* ── Magnetic cursor image ── */}
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        focusable="false"
        style={{ position: "absolute" }}
      >
        <filter id="fi-liquid-distortion">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="base" />
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.0040 0.0070"
            numOctaves="2"
            seed="17"
            result="noise"
          />
          <feDisplacementMap
            ref={displacementRef}
            in="base"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        ref={imgRef}
        aria-hidden="true"
        className={`fi-cursor-img${isHovering ? " is-visible" : ""}`}
      >
        <span ref={glintRef} className="fi-liquid-glint" />
        <img
          src={HOVER_IMAGES[imgIndex]}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>

      <div aria-hidden="true" className="fi-top-divider" />
      <div
        ref={rippleLayerRef}
        aria-hidden="true"
        className="fi-ripple-layer"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(112deg, rgba(252,249,246,0.94) 0%, rgba(249,241,234,0.82) 46%, rgba(252,249,246,0.94) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(54% 44% at 50% 50%, rgba(244,124,89,0.14), transparent 72%), radial-gradient(38% 30% at 88% 86%, rgba(36,18,8,0.06), transparent 74%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(36,18,8,0.08) 0%, transparent 18%, transparent 82%, rgba(36,18,8,0.12) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center py-24 sm:py-28 lg:py-32">
        <div className="mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-12">
          <article
            ref={articleRef}
            className="flex flex-col items-center py-2 sm:py-4 text-center"
          >
            <motion.p className="fi-reveal fi-eyebrow" {...revealMotion(0.04)}>
              Makassar Golden Hotel
            </motion.p>

            <span aria-hidden="true" className="fi-divider-line mt-4" />

            <motion.h2
              className="fi-reveal mt-8 max-w-[18ch] text-4xl sm:text-5xl lg:text-[62px]"
              style={{
                color: "#241208",
                fontFamily: '"Instrument Serif", serif',
                fontWeight: 200,
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
              {...revealMotion(0.1)}
            >
              Tinggalkan Kota dengan Senja Terbaiknya.
            </motion.h2>

            <motion.p
              className="fi-reveal fi-copy mt-6 max-w-[52ch]"
              {...revealMotion(0.18)}
            >
              Jadikan penutup perjalanan Anda lebih berkesan dengan pemandangan
              laut, ritme kota tua, dan kenyamanan heritage yang hanya dimiliki
              Makassar Golden Hotel.
            </motion.p>

            <motion.div
              className="fi-reveal mt-10 flex flex-wrap items-center justify-center gap-3"
              {...revealMotion(0.24)}
            >
              <a href="tel:+62411313737" className="fi-cta" data-cursor="view">
                <Phone size={13} strokeWidth={1.8} />
                <span>Reservasi Sekarang</span>
                <ArrowUpRight size={13} strokeWidth={1.8} />
              </a>

              <a href="#featured-rooms" className="fi-note-link">
                Lihat Detail Kamar
              </a>
            </motion.div>

            <motion.div
              className="fi-reveal mt-10 flex items-center justify-center gap-2"
              {...revealMotion(0.3)}
            >
              <MapPin
                size={14}
                strokeWidth={1.8}
                style={{ color: "#F47C59" }}
              />
              <p
                style={{
                  color: "rgba(36,18,8,0.72)",
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "12px",
                  lineHeight: "16px",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                }}
              >
                Pantai Losari · Makassar
              </p>
            </motion.div>
          </article>
        </div>
      </div>

      <div aria-hidden="true" className="fi-bottom-divider" />
    </section>
  );
}

export default FinaleInterlude;
