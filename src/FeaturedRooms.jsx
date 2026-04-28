import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Maximize2,
  Wifi,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const T = {
  primary: "#F47C59",
  secondary: "#241208",
  tertiary: "#92CFF2",
  neutral: "#FCF9F6",
  display: '"Instrument Serif", serif',
  body: '"Inter", sans-serif',
  border: "0.8px solid rgba(36,18,8,0.22)",
  shadow:
    "rgba(0,0,0,0.035) 0px 2.8px 2.2px, rgba(0,0,0,0.047) 0px 6.7px 5.3px, rgba(0,0,0,0.06) 0px 12.5px 10px, rgba(0,0,0,0.07) 0px 22.3px 17.9px, rgba(0,0,0,0.086) 0px 41.8px 33.4px, rgba(0,0,0,0.12) 0px 100px 80px",
};

const ROOM_DATA = [
  {
    id: "01",
    name: "Superior City View",
    desc: "Nyaman dan praktis dengan pemandangan kota yang hidup, cahaya pagi yang lembut, dan suasana istirahat yang terasa ringan.",
    size: "28m²",
    bed: "Twin/King Bed",
    price: "Rp 650.000",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "City-Facing Calm",
    popular: false,
  },
  {
    id: "02",
    name: "Deluxe Sea View",
    desc: "Menghadap langsung ke Pantai Losari dengan atmosfer senja yang paling ikonik, dirancang untuk tamu yang ingin pengalaman Makassar paling puitis.",
    size: "32m²",
    bed: "King Bed",
    price: "Rp 850.000",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Most Desired",
    popular: true,
  },
  {
    id: "03",
    name: "Golden Suite",
    desc: "Ruang paling lapang dengan area duduk terpisah, ritme yang lebih tenang, dan nuansa menginap yang terasa benar-benar istimewa.",
    size: "50m²",
    bed: "King Bed",
    price: "Rp 1.500.000",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Signature Stay",
    popular: false,
  },
  {
    id: "04",
    name: "Executive Ocean Corner",
    desc: "Sudut kamar yang lebih privat dengan panorama laut terbuka dan pencahayaan senja yang dramatis untuk pengalaman menginap yang lebih tenang.",
    size: "38m²",
    bed: "King Bed",
    price: "Rp 1.050.000",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Ocean Corner",
    popular: false,
  },
  {
    id: "05",
    name: "Losari Family Suite",
    desc: "Dirancang untuk perjalanan keluarga dengan ruang lebih lega, dua zona istirahat, dan suasana hangat yang tetap elegan sepanjang hari.",
    size: "56m²",
    bed: "King + Twin",
    price: "Rp 1.850.000",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    eyebrow: "Family Prestige",
    popular: false,
  },
];

function Amenity({ icon: Icon, label }) {
  return (
    <div
      className="inline-flex items-center gap-2"
      style={{
        fontFamily: T.body,
        fontSize: "12px",
        lineHeight: "16px",
        letterSpacing: "1.2px",
        textTransform: "uppercase",
        color: "rgba(36,18,8,0.56)",
      }}
    >
      <Icon size={14} strokeWidth={1.6} />
      <span>{label}</span>
    </div>
  );
}

function FeaturedRooms() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const auraRef = useRef(null);
  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const dragRef = useRef({
    isPointerDown: false,
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    hasMoved: false,
  });
  const [activeCard, setActiveCard] = useState(0);
  const activeRoom = ROOM_DATA[activeCard];

  const getClosestCardIndex = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return 0;

    const scrollerRect = scroller.getBoundingClientRect();
    const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(scrollerCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  const scrollToCard = (index) => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targetLeft =
      card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2;
    scroller.scrollTo({
      left: targetLeft,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const goPrev = () => {
    const nextIndex = Math.max(0, activeCard - 1);
    scrollToCard(nextIndex);
  };

  const goNext = () => {
    const nextIndex = Math.min(ROOM_DATA.length - 1, activeCard + 1);
    scrollToCard(nextIndex);
  };

  const onScrollerKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      scrollToCard(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      scrollToCard(ROOM_DATA.length - 1);
    }
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        cardRefs.current,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.74,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scrollerRef.current,
            start: "top 84%",
            once: true,
          },
        },
      );

      if (auraRef.current) {
        gsap.fromTo(
          auraRef.current,
          { yPercent: -4, scale: 1.02 },
          {
            yPercent: 4,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    let frameId = 0;

    const updateActiveCard = () => {
      frameId = 0;

      const scrollerRect = scroller.getBoundingClientRect();
      const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
      const maxDistance = scrollerRect.width * 0.62;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(scrollerCenter - cardCenter);
        const signedDistance = (cardCenter - scrollerCenter) / maxDistance;
        const normalized = Math.min(distance / maxDistance, 1);

        const targetShiftX = Math.max(-18, Math.min(18, -signedDistance * 18));
        const targetShiftY = normalized * 16;
        const targetScale = 1.028 - normalized * 0.12;
        const targetRotateY = -signedDistance * 12;

        const prevShiftX = Number(card.dataset.shiftX ?? "0");
        const prevShiftY = Number(card.dataset.shiftY ?? "0");
        const prevScale = Number(card.dataset.scale ?? "1");
        const prevRotateY = Number(card.dataset.rotateY ?? "0");
        const smoothFactor = 0.24;

        const shiftX = prevShiftX + (targetShiftX - prevShiftX) * smoothFactor;
        const shiftY = prevShiftY + (targetShiftY - prevShiftY) * smoothFactor;
        const scale = prevScale + (targetScale - prevScale) * smoothFactor;
        const rotateY =
          prevRotateY + (targetRotateY - prevRotateY) * smoothFactor;

        card.dataset.shiftX = shiftX.toFixed(3);
        card.dataset.shiftY = shiftY.toFixed(3);
        card.dataset.scale = scale.toFixed(4);
        card.dataset.rotateY = rotateY.toFixed(3);

        card.style.transform = `translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, 0) scale(${scale.toFixed(3)}) rotateY(${rotateY.toFixed(2)}deg)`;
        card.style.opacity = `${(1 - normalized * 0.2).toFixed(3)}`;
        card.style.filter = `saturate(${(1 - normalized * 0.18).toFixed(3)})`;

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveCard((prev) => (prev === closestIndex ? prev : closestIndex));
    };

    const onScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveCard);
    };

    updateActiveCard();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    let snapTimer = 0;

    const scheduleSnapToClosestCard = () => {
      if (snapTimer) window.clearTimeout(snapTimer);

      snapTimer = window.setTimeout(() => {
        if (dragRef.current.isPointerDown) return;
        const closestIndex = getClosestCardIndex();
        scrollToCard(closestIndex);
      }, 180);
    };

    scroller.addEventListener("scroll", scheduleSnapToClosestCard, {
      passive: true,
    });

    return () => {
      if (snapTimer) window.clearTimeout(snapTimer);
      scroller.removeEventListener("scroll", scheduleSnapToClosestCard);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const onPointerDown = (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      dragRef.current.isPointerDown = true;
      dragRef.current.pointerId = event.pointerId;
      dragRef.current.startX = event.clientX;
      dragRef.current.startScrollLeft = scroller.scrollLeft;
      dragRef.current.hasMoved = false;

      scroller.classList.add("is-dragging");
      if (typeof scroller.setPointerCapture === "function") {
        scroller.setPointerCapture(event.pointerId);
      }
    };

    const onPointerMove = (event) => {
      if (!dragRef.current.isPointerDown) return;

      const walk = event.clientX - dragRef.current.startX;
      if (Math.abs(walk) > 2) {
        dragRef.current.hasMoved = true;
      }
      scroller.scrollLeft = dragRef.current.startScrollLeft - walk;
    };

    const stopPointerDrag = () => {
      const { pointerId, hasMoved } = dragRef.current;
      dragRef.current.isPointerDown = false;
      dragRef.current.pointerId = null;
      scroller.classList.remove("is-dragging");

      if (
        pointerId !== null &&
        typeof scroller.releasePointerCapture === "function"
      ) {
        try {
          scroller.releasePointerCapture(pointerId);
        } catch {
          // Ignore when capture has already been released by the browser.
        }
      }

      if (hasMoved) {
        const closestIndex = getClosestCardIndex();
        scrollToCard(closestIndex);
      }
    };

    scroller.addEventListener("pointerdown", onPointerDown, {
      passive: true,
    });
    scroller.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });
    scroller.addEventListener("pointerup", stopPointerDrag, {
      passive: true,
    });
    scroller.addEventListener("pointercancel", stopPointerDrag, {
      passive: true,
    });
    scroller.addEventListener("pointerleave", stopPointerDrag, {
      passive: true,
    });

    return () => {
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", stopPointerDrag);
      scroller.removeEventListener("pointercancel", stopPointerDrag);
      scroller.removeEventListener("pointerleave", stopPointerDrag);
    };
  }, []);

  return (
    <>
      <style>{`
        .rooms-scroller {
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
          perspective: 1400px;
          scroll-padding-left: clamp(24px, 4vw, 48px);
          scroll-padding-right: clamp(24px, 4vw, 48px);
          cursor: grab;
          touch-action: pan-y;
          overscroll-behavior-x: contain;
        }

        .rooms-scroller.is-dragging {
          cursor: grabbing;
        }

        .rooms-scroller::-webkit-scrollbar {
          display: none;
        }

        .rooms-panel {
          transition:
            transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 300ms ease,
            opacity 380ms ease,
            filter 380ms ease;
          transform-origin: center center;
          will-change: transform, opacity, filter;
          scroll-snap-stop: always;
        }

        .rooms-panel:hover {
          box-shadow: rgba(0,0,0,0.06) 0px 10px 24px, rgba(244,124,89,0.2) 0px 20px 36px -22px;
        }

        .rooms-image {
          transition: transform 860ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .rooms-panel:hover .rooms-image {
          transform: scale(1.045);
        }

        .rooms-link {
          border: 0;
          border-radius: 0px;
          padding: 12px;
          background-color: ${T.primary};
          transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1), color 300ms ease, background-color 300ms ease;
          will-change: transform;
        }

        .rooms-link .rooms-link-label {
          transition: letter-spacing 420ms ease, transform 420ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        .rooms-link .rooms-link-icon {
          transition: transform 420ms cubic-bezier(0.19, 1, 0.22, 1);
          transform-origin: center;
        }

        .rooms-link:hover {
          color: ${T.neutral};
          background-color: ${T.secondary};
          transform: translateY(-1px);
        }

        .rooms-link:hover .rooms-link-label {
          letter-spacing: 1.2px;
          transform: none;
        }

        .rooms-link:hover .rooms-link-icon {
          transform: translateX(1px);
        }

        .rooms-link:active {
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .rooms-link,
          .rooms-link .rooms-link-label,
          .rooms-link .rooms-link-icon {
            transition: none;
          }

          .rooms-link:hover,
          .rooms-link:active {
            transform: none;
          }
        }

        .rooms-nav-btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition: transform 460ms cubic-bezier(0.22, 1, 0.36, 1), border-color 320ms ease, background-color 320ms ease, color 320ms ease;
          will-change: transform;
        }

        .rooms-nav-btn::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: linear-gradient(112deg, rgba(244,124,89,0) 24%, rgba(244,124,89,0.28) 48%, rgba(244,124,89,0) 72%);
          transform: translateX(-148%) skewX(-22deg);
          transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 0;
        }

        .rooms-nav-btn > * {
          position: relative;
          z-index: 1;
        }

        .rooms-nav-btn svg {
          transition: transform 360ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        .rooms-nav-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.05);
          border-color: rgba(244, 124, 89, 0.74);
          background-color: rgba(244, 124, 89, 0.22);
          color: rgba(252,249,246,0.98);
        }

        .rooms-nav-btn:hover:not(:disabled)::before {
          transform: translateX(148%) skewX(-22deg);
        }

        .rooms-nav-btn:hover:not(:disabled) svg {
          transform: translateX(var(--nav-shift, 0px));
        }

        .rooms-nav-btn:active:not(:disabled) {
          transform: translateY(0) scale(0.98);
        }

        .rooms-nav-btn:disabled {
          opacity: 0.38;
          cursor: not-allowed;
        }

        .rooms-dot-btn {
          position: relative;
          transition: transform 360ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease, background-color 300ms ease;
        }

        .rooms-dot-btn::after {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: 999px;
          background: linear-gradient(120deg, rgba(244,124,89,0.04) 0%, rgba(244,124,89,0.36) 52%, rgba(244,124,89,0.04) 100%);
          opacity: 0;
          transition: opacity 300ms ease;
        }

        .rooms-dot-btn:hover {
          transform: translateY(-1px) scale(1.04);
        }

        .rooms-dot-btn:hover::after {
          opacity: 1;
        }

        @media (min-width: 1280px) {
          .rooms-link {
            transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1), color 300ms ease, background-color 300ms ease;
          }

          .rooms-link:hover {
            transform: translateY(-1px);
          }

          .rooms-nav-btn:hover:not(:disabled) {
            transform: translateY(-2.5px) scale(1.06);
          }
        }

        @media (max-width: 767px) {
          .rooms-link {
            transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1), color 300ms ease, background-color 300ms ease;
          }

          .rooms-link:hover {
            transform: translateY(-1px);
          }

          .rooms-nav-btn {
            transition: transform 230ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 230ms ease, background-color 230ms ease, color 230ms ease;
          }

          .rooms-nav-btn:hover:not(:disabled) {
            transform: translateY(-1px) scale(1.025);
          }

          .rooms-dot-btn:hover {
            transform: translateY(-0.5px) scale(1.02);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rooms-nav-btn,
          .rooms-nav-btn::before,
          .rooms-nav-btn svg,
          .rooms-dot-btn,
          .rooms-dot-btn::after {
            transition: none;
          }

          .rooms-nav-btn:hover:not(:disabled),
          .rooms-nav-btn:active:not(:disabled),
          .rooms-dot-btn:hover {
            transform: none;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="featured-rooms"
        style={{
          backgroundColor: T.secondary,
          padding: "96px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            ref={auraRef}
            className="absolute -left-[14%] top-[-22%] h-[620px] w-[620px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(244,124,89,0.22) 0%, rgba(244,124,89,0.06) 38%, rgba(244,124,89,0) 72%)",
              filter: "blur(2px)",
              transformOrigin: "center center",
            }}
          />
          <div
            className="absolute right-[-12%] top-[26%] h-[460px] w-[460px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(146,207,242,0.18) 0%, rgba(146,207,242,0.04) 44%, rgba(146,207,242,0) 74%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(252,249,246,0.07) 0.45px, transparent 0.45px)",
              backgroundSize: "5px 5px",
              opacity: 0.22,
            }}
          />
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
          <header
            ref={headerRef}
            className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
          >
            <div>
              <p
                style={{
                  fontFamily: T.body,
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "16px",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: T.primary,
                  marginBottom: "16px",
                }}
              >
                Pilihan Kamar
              </p>

              <h2
                style={{
                  fontFamily: T.display,
                  fontWeight: 200,
                  fontSize: "clamp(40px, 5vw, 66px)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  color: T.neutral,
                }}
              >
                Kenyamanan Klasik,
                <br />
                <em>Pemandangan Terbaik.</em>
              </h2>
            </div>

            <p
              className="max-w-2xl"
              style={{
                fontFamily: T.body,
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "-0.025em",
                color: "rgba(252,249,246,0.82)",
              }}
            >
              Pilih tempat istirahat yang paling sesuai dengan ritme perjalanan
              Anda. Dari kamar yang menghadap gemerlap kota hingga suite yang
              lebih lapang untuk tinggal lebih lama, setiap ruang dirancang
              sebagai pengalaman yang terasa tenang, hangat, dan berkelas.
            </p>
          </header>

          <div
            ref={scrollerRef}
            className="rooms-scroller -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10 lg:-mx-12 lg:gap-6 lg:px-12"
            tabIndex={0}
            role="region"
            aria-label="Daftar kamar unggulan"
            onKeyDown={onScrollerKeyDown}
          >
            {ROOM_DATA.map((room, index) => (
              <article
                key={room.name}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-active={activeCard === index}
                className="rooms-panel min-w-[90vw] snap-center sm:min-w-[74vw] lg:min-w-[58vw] xl:min-w-[52vw]"
                style={{
                  padding: "1px",
                  borderRadius: "2px",
                  background:
                    "linear-gradient(135deg, rgba(244,124,89,0.34) 0%, rgba(255,255,255,0.08) 50%, rgba(36,18,8,0.10) 100%)",
                  boxShadow: T.shadow,
                }}
              >
                <div
                  className="flex h-full flex-col overflow-hidden"
                  style={{
                    backgroundColor: T.neutral,
                    borderRadius: "1px",
                    minHeight: "clamp(620px, 76vh, 730px)",
                  }}
                >
                  <div className="relative min-h-[340px] overflow-hidden sm:min-h-[380px] lg:min-h-[420px]">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="rooms-image absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />

                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(36,18,8,0.08) 0%, rgba(36,18,8,0.18) 50%, rgba(36,18,8,0.62) 100%)",
                      }}
                    />

                    <div className="absolute left-5 top-5 sm:left-6 sm:top-6">
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          border: "0.8px solid rgba(252,249,246,0.18)",
                          backgroundColor: "rgba(36,18,8,0.34)",
                          backdropFilter: "blur(14px)",
                          color: T.neutral,
                          padding: "8px 12px",
                          borderRadius: "999px",
                          fontFamily: T.body,
                          fontSize: "11px",
                          lineHeight: "16px",
                          letterSpacing: "1.2px",
                          textTransform: "uppercase",
                        }}
                      >
                        <span>{room.id}</span>
                        <span style={{ opacity: 0.8 }}>{room.eyebrow}</span>
                      </div>
                    </div>

                    {room.popular && (
                      <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            backgroundColor: T.primary,
                            color: T.neutral,
                            padding: "10px 14px",
                            borderRadius: "999px",
                            fontFamily: T.body,
                            fontSize: "11px",
                            lineHeight: "16px",
                            letterSpacing: "1.2px",
                            textTransform: "uppercase",
                          }}
                        >
                          Best Choice
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10">
                    <div>
                      <div
                        style={{
                          fontFamily: T.body,
                          fontSize: "12px",
                          lineHeight: "16px",
                          letterSpacing: "1.2px",
                          textTransform: "uppercase",
                          color: T.primary,
                          marginBottom: "16px",
                        }}
                      >
                        {room.eyebrow}
                      </div>

                      <h3
                        style={{
                          fontFamily: T.display,
                          fontWeight: 200,
                          fontSize: "clamp(30px, 3.6vw, 48px)",
                          lineHeight: 1,
                          letterSpacing: "-0.025em",
                          color: T.secondary,
                          marginBottom: "20px",
                        }}
                      >
                        {room.name}
                      </h3>

                      <p
                        style={{
                          fontFamily: T.body,
                          fontSize: "14px",
                          lineHeight: "20px",
                          letterSpacing: "-0.025em",
                          color: "rgba(36,18,8,0.72)",
                          marginBottom: "28px",
                          maxWidth: "46ch",
                        }}
                      >
                        {room.desc}
                      </p>

                      <div
                        style={{
                          height: "0.8px",
                          backgroundColor: "rgba(36,18,8,0.14)",
                          marginBottom: "24px",
                        }}
                      />

                      <div className="flex flex-wrap gap-x-6 gap-y-3">
                        <Amenity icon={Maximize2} label={room.size} />
                        <Amenity icon={BedDouble} label={room.bed} />
                        <Amenity icon={Wifi} label="Wi-Fi" />
                      </div>
                    </div>

                    <div className="mt-10">
                      <div
                        style={{
                          height: "0.8px",
                          backgroundColor: "rgba(36,18,8,0.14)",
                          marginBottom: "20px",
                        }}
                      />

                      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <div
                            style={{
                              fontFamily: T.body,
                              fontSize: "12px",
                              lineHeight: "16px",
                              letterSpacing: "1.2px",
                              textTransform: "uppercase",
                              color: "rgba(36,18,8,0.48)",
                              marginBottom: "6px",
                            }}
                          >
                            Mulai dari
                          </div>

                          <div
                            style={{
                              fontFamily: T.display,
                              fontSize: "clamp(28px, 3vw, 40px)",
                              fontWeight: 200,
                              lineHeight: 1,
                              letterSpacing: "-0.025em",
                              color: T.secondary,
                            }}
                          >
                            {room.price}
                            <span
                              style={{
                                fontFamily: T.body,
                                fontSize: "12px",
                                lineHeight: "16px",
                                letterSpacing: "1.2px",
                                textTransform: "uppercase",
                                color: "rgba(36,18,8,0.48)",
                                marginLeft: "8px",
                              }}
                            >
                              / malam
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="rooms-link inline-flex items-center gap-2"
                          style={{
                            alignSelf: "flex-start",
                            fontFamily: T.body,
                            fontSize: "12px",
                            lineHeight: "16px",
                            letterSpacing: "1.2px",
                            textTransform: "uppercase",
                            color: T.neutral,
                          }}
                        >
                          <span className="rooms-link-label">Lihat Detail</span>
                          <span className="rooms-link-icon">
                            <ArrowUpRight size={14} strokeWidth={1.7} />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-12 lg:px-12">
            <div
              className="flex flex-wrap items-center justify-between gap-4"
              style={{
                border: "0.8px solid rgba(252,249,246,0.18)",
                backgroundColor: "rgba(252,249,246,0.06)",
                backdropFilter: "blur(10px)",
                padding: "12px 14px",
                borderRadius: "999px",
              }}
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rooms-nav-btn inline-flex h-9 w-9 items-center justify-center"
                  onClick={goPrev}
                  disabled={activeCard === 0}
                  aria-label="Lihat kamar sebelumnya"
                  style={{
                    "--nav-shift": "-1.4px",
                    borderRadius: "999px",
                    border: "0.8px solid rgba(252,249,246,0.24)",
                    backgroundColor: "rgba(252,249,246,0.08)",
                    color: T.neutral,
                  }}
                >
                  <ArrowLeft size={15} strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  className="rooms-nav-btn inline-flex h-9 w-9 items-center justify-center"
                  onClick={goNext}
                  disabled={activeCard === ROOM_DATA.length - 1}
                  aria-label="Lihat kamar berikutnya"
                  style={{
                    "--nav-shift": "1.4px",
                    borderRadius: "999px",
                    border: "0.8px solid rgba(252,249,246,0.24)",
                    backgroundColor: "rgba(252,249,246,0.08)",
                    color: T.neutral,
                  }}
                >
                  <ArrowRight size={15} strokeWidth={1.8} />
                </button>
              </div>

              <div className="hidden md:block">
                <div
                  style={{
                    fontFamily: T.body,
                    fontSize: "11px",
                    lineHeight: "16px",
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    color: "rgba(252,249,246,0.74)",
                    textAlign: "center",
                  }}
                >
                  {String(activeCard + 1).padStart(2, "0")} /{" "}
                  {String(ROOM_DATA.length).padStart(2, "0")} •{" "}
                  {activeRoom?.name}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {ROOM_DATA.map((room, index) => (
                  <button
                    type="button"
                    key={`${room.id}-dot`}
                    className="rooms-dot-btn"
                    onClick={() => scrollToCard(index)}
                    aria-label={`Lompat ke ${room.name}`}
                    style={{
                      width: "30px",
                      height: "10px",
                      borderRadius: "999px",
                      border:
                        activeCard === index
                          ? "0.8px solid rgba(244,124,89,0.78)"
                          : "0.8px solid rgba(252,249,246,0.2)",
                      backgroundColor:
                        activeCard === index
                          ? "rgba(244,124,89,0.20)"
                          : "rgba(252,249,246,0.10)",
                      display: "flex",
                      alignItems: "center",
                      overflow: "hidden",
                      boxShadow:
                        activeCard === index
                          ? "inset 0 0 0 1px rgba(255,255,255,0.08), 0 4px 14px rgba(244,124,89,0.24)"
                          : "inset 0 0 0 1px rgba(255,255,255,0.04)",
                      transition:
                        "background-color 280ms ease, border-color 280ms ease, box-shadow 280ms ease",
                    }}
                  >
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "999px",
                        background:
                          activeCard === index
                            ? "linear-gradient(90deg, #f47c59 0%, #ffd7c8 100%)"
                            : "rgba(252,249,246,0.55)",
                        transformOrigin: "left center",
                        transform:
                          activeCard === index ? "scaleX(2.9)" : "scaleX(1)",
                        transition:
                          "transform 280ms cubic-bezier(0.22, 1, 0.36, 1), background 280ms ease",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturedRooms;
