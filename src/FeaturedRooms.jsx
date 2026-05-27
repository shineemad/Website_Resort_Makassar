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
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=75",
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
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=75",
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
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=75",
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
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=75",
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
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=75",
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
    setActiveCard(index);
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    // Scroll-to logic is a graceful no-op in the accordion layout (no overflow).
    // Kept for compatibility with existing nav/keyboard handlers.
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

  // NOTE: The scroll-based card-transform effect is disabled in the accordion layout.
  // Cards expand via CSS flex transition; activeCard is set by click / scrollToCard.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    let frameId = 0;
    let settleFrames = 0;

    const updateActiveCard = () => {
      frameId = 0;
      // Accordion layout — no scroll-driven transforms needed.
      return;
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

      if (settleFrames > 0) {
        settleFrames -= 1;
        frameId = window.requestAnimationFrame(updateActiveCard);
      }
    };

    const onScroll = () => {
      settleFrames = 8;
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
        const targetCard = cardRefs.current[closestIndex];
        if (!targetCard) return;

        const targetLeft =
          targetCard.offsetLeft -
          (scroller.clientWidth - targetCard.clientWidth) / 2;

        if (Math.abs(scroller.scrollLeft - targetLeft) < 2) return;
        scrollToCard(closestIndex);
      }, 280);
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
        /* ─── Accordion strip ─── */
        .fr-strip {
          display: flex;
          flex-direction: row;
          gap: 2px;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* Each card fills its share; active card expands */
        .fr-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          flex: 1 1 0;
          min-width: 48px;
          transition: flex 0.74s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fr-card.is-active {
          flex: 3.6 1 0;
          cursor: default;
        }

        .fr-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          will-change: transform;
          transition: transform 0.92s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fr-card.is-active .fr-card-img {
          transform: scale(1.05);
        }

        .fr-card-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(8, 4, 2, 0.96) 0%,
            rgba(8, 4, 2, 0.32) 46%,
            rgba(8, 4, 2, 0.06) 100%
          );
          transition: opacity 0.42s ease;
        }

        .fr-card:not(.is-active) .fr-card-veil {
          background: linear-gradient(
            to top,
            rgba(8, 4, 2, 0.90) 0%,
            rgba(8, 4, 2, 0.62) 100%
          );
        }

        /* Room number shown on inactive cards */
        .fr-card-num {
          position: absolute;
          top: clamp(18px, 2.8vh, 32px);
          left: 50%;
          transform: translateX(-50%);
          font-family: "Instrument Serif", serif;
          font-weight: 200;
          font-size: clamp(20px, 2.4vw, 32px);
          line-height: 1;
          letter-spacing: -0.02em;
          color: rgba(252,249,246,0.36);
          white-space: nowrap;
          transition: opacity 0.38s ease, color 0.38s ease;
        }

        .fr-card.is-active .fr-card-num {
          color: ${T.primary};
          opacity: 0.8;
        }

        /* Vertical room name on inactive cards */
        .fr-card-vert {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-90deg);
          white-space: nowrap;
          font-family: "Instrument Serif", serif;
          font-weight: 200;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: rgba(252,249,246,0.44);
          text-transform: uppercase;
          overflow: hidden;
          max-width: 130px;
          text-overflow: ellipsis;
          opacity: 1;
          transition: opacity 0.28s ease;
          pointer-events: none;
        }

        .fr-card.is-active .fr-card-vert {
          opacity: 0;
        }

        /* Active card bottom info panel */
        .fr-card-foot {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: clamp(20px, 2.6vw, 36px);
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.44s ease 0.14s,
            transform 0.46s cubic-bezier(0.22, 1, 0.36, 1) 0.14s;
          pointer-events: none;
        }

        .fr-card.is-active .fr-card-foot {
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }

        /* Eyebrow badge (inactive) */
        .fr-card-badge {
          position: absolute;
          bottom: clamp(18px, 2.6vh, 30px);
          left: 50%;
          transform: translateX(-50%) rotate(-90deg);
          white-space: nowrap;
          font-family: "Inter", sans-serif;
          font-size: 10px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: rgba(252,249,246,0.36);
          opacity: 1;
          transition: opacity 0.26s ease;
          pointer-events: none;
        }

        .fr-card.is-active .fr-card-badge {
          opacity: 0;
        }

        /* ─── Info panel detail swap ─── */
        @keyframes fr-swap-in {
          from { opacity: 0; transform: translateY(11px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Nav buttons ─── */
        .fr-nav {
          transition: background 0.28s ease, border-color 0.28s ease,
            transform 0.36s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fr-nav:hover:not(:disabled) {
          background: rgba(244, 124, 89, 0.10) !important;
          border-color: rgba(244, 124, 89, 0.72) !important;
          transform: translateY(-2px);
        }

        .fr-nav:disabled { opacity: 0.24; cursor: not-allowed; }

        /* ─── CTA ─── */
        .fr-cta {
          transition: background 0.28s ease, color 0.28s ease,
            transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fr-cta:hover {
          background: ${T.primary} !important;
          color: ${T.secondary} !important;
          transform: translateY(-2px);
        }

        /* ─── Progress pips ─── */
        .fr-pip {
          height: 2px;
          border-radius: 2px;
          transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.28s ease;
        }

        /* ─── Reduced motion ─── */
        @media (prefers-reduced-motion: reduce) {
          .fr-card, .fr-card-img, .fr-card-veil,
          .fr-card-num, .fr-card-vert, .fr-card-badge,
          .fr-card-foot, .fr-nav, .fr-cta, .fr-pip {
            transition: none;
          }

          .fr-nav:hover:not(:disabled), .fr-cta:hover { transform: none; }
        }

        /* ─── Mobile: stack vertically ─── */
        @media (max-width: 1023px) {
          .fr-strip {
            overflow-x: auto;
            scrollbar-width: none;
            min-height: 380px;
          }
          .fr-strip::-webkit-scrollbar { display: none; }
          .fr-card { flex: 0 0 56vw; min-height: 380px; }
          .fr-card.is-active { flex: 0 0 74vw; }
          .fr-card-vert { font-size: 10px; }
        }

        /* ─── Rooms scroller (legacy compat) ─── */
        .rooms-scroller {
          scrollbar-width: none;
          -ms-overflow-style: none;
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
            box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 300ms ease,
            opacity 380ms ease,
            filter 380ms ease;
          transform-origin: center center;
          will-change: transform;
          scroll-snap-stop: always;
        }

        .rooms-panel:hover {
          box-shadow: ${T.shadow};
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
          box-shadow: ${T.shadow};
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
          backgroundColor: T.neutral,
          position: "relative",
          overflow: "hidden",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          borderTop: `3px solid ${T.primary}`,
        }}
      >
        {/* ── Background decorations ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div
            ref={auraRef}
            style={{
              position: "absolute",
              top: "-28%",
              left: "-8%",
              width: "580px",
              height: "580px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(244,124,89,0.10) 0%, transparent 68%)",
              filter: "blur(2px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "40%",
              height: "55%",
              background:
                "radial-gradient(ellipse at bottom right, rgba(36,18,8,0.04) 0%, transparent 72%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(36,18,8,0.06) 0.4px, transparent 0.4px)",
              backgroundSize: "5px 5px",
              opacity: 0.5,
            }}
          />
        </div>

        {/* ── SECTION HEADER STRIP (spacing + chapter marker) ── */}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <span
              style={{
                fontFamily: T.display,
                fontWeight: 200,
                fontSize: "clamp(32px,3.2vw,46px)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: T.primary,
                opacity: 0.36,
              }}
            >
              03
            </span>
            <div
              style={{
                width: "0.8px",
                height: "24px",
                background: "rgba(36,18,8,0.14)",
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
              Pilihan Kamar Unggulan
            </span>
          </div>
          <span
            style={{
              fontFamily: T.body,
              fontSize: "11px",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              color: "rgba(36,18,8,0.28)",
            }}
          >
            Makassar Golden Hotel
          </span>
        </div>

        {/* ── MAIN SPLIT: INFO PANEL LEFT + ACCORDION RIGHT ── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            display: "grid",
            gridTemplateColumns: "42fr 58fr",
            minHeight: "100svh",
          }}
          className="max-lg:!grid-cols-1"
        >
          {/* ── LEFT: INFO PANEL ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(72px,8vh,100px) clamp(28px,5.5vw,72px)",
              borderRight: "0.8px solid rgba(36,18,8,0.10)",
            }}
          >
            <div
              style={{
                height: "0.8px",
                background: "rgba(36,18,8,0.10)",
                marginBottom: "clamp(28px,3.6vh,48px)",
              }}
            />

            {/* Header — eyebrow + headline */}
            <div ref={headerRef}>
              <p
                style={{
                  fontFamily: T.body,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: T.primary,
                  margin: "0 0 clamp(14px,1.8vh,22px)",
                }}
              >
                Pilihan Kamar
              </p>
              <h2
                style={{
                  fontFamily: T.display,
                  fontWeight: 200,
                  fontSize: "clamp(36px,4vw,64px)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.03em",
                  color: T.secondary,
                  margin: "0 0 clamp(22px,3vh,38px)",
                  fontFeatureSettings: '"kern" 1, "liga" 1',
                  textRendering: "optimizeLegibility",
                }}
              >
                Kenyamanan Klasik,
                <br />
                <em>Pemandangan Terbaik.</em>
              </h2>
            </div>

            <div
              style={{
                height: "0.8px",
                background: "rgba(36,18,8,0.10)",
                marginBottom: "clamp(22px,3vh,38px)",
              }}
            />

            {/* Active room details — re-mounts on card change for swap-in animation */}
            <div
              key={activeCard}
              style={{
                animation: "fr-swap-in 0.44s cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              {/* Room number + eyebrow */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontFamily: T.display,
                    fontSize: "clamp(40px,4.2vw,60px)",
                    fontWeight: 200,
                    lineHeight: 0.9,
                    letterSpacing: "-0.04em",
                    color: T.primary,
                  }}
                >
                  {activeRoom.id}
                </span>
                <span
                  style={{
                    fontFamily: T.body,
                    fontSize: "11px",
                    letterSpacing: "1.8px",
                    textTransform: "uppercase",
                    color: "rgba(36,18,8,0.38)",
                  }}
                >
                  {activeRoom.eyebrow}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: T.display,
                  fontWeight: 200,
                  fontSize: "clamp(24px,2.8vw,40px)",
                  lineHeight: 1,
                  letterSpacing: "-0.026em",
                  color: T.secondary,
                  margin: "0 0 16px",
                  fontFeatureSettings: '"kern" 1, "liga" 1',
                }}
              >
                {activeRoom.name}
              </h3>

              <p
                style={{
                  fontFamily: T.body,
                  fontSize: "14px",
                  lineHeight: 1.65,
                  letterSpacing: "-0.018em",
                  color: "rgba(36,18,8,0.60)",
                  margin: "0 0 clamp(16px,2.2vh,26px)",
                  maxWidth: "38ch",
                }}
              >
                {activeRoom.desc}
              </p>

              {/* Amenities */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px 16px",
                  marginBottom: "clamp(18px,2.4vh,28px)",
                }}
              >
                {[
                  { Icon: Maximize2, label: activeRoom.size },
                  { Icon: BedDouble, label: activeRoom.bed },
                  { Icon: Wifi, label: "Wi-Fi" },
                ].map(({ Icon, label }) => (
                  <span
                    key={label}
                    style={{
                      fontFamily: T.body,
                      fontSize: "11px",
                      letterSpacing: "1.2px",
                      textTransform: "uppercase",
                      color: "rgba(36,18,8,0.44)",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Icon size={11} strokeWidth={1.6} />
                    {label}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "14px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: T.body,
                      fontSize: "11px",
                      letterSpacing: "1.4px",
                      textTransform: "uppercase",
                      color: "rgba(36,18,8,0.36)",
                      marginBottom: "6px",
                    }}
                  >
                    Mulai dari
                  </div>
                  <div
                    style={{
                      fontFamily: T.display,
                      fontWeight: 200,
                      fontSize: "clamp(28px,3vw,44px)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      color: T.secondary,
                      fontFeatureSettings: '"onum" 1, "kern" 1',
                    }}
                  >
                    {activeRoom.price}
                    <span
                      style={{
                        fontFamily: T.body,
                        fontSize: "11px",
                        letterSpacing: "1.2px",
                        textTransform: "uppercase",
                        color: "rgba(36,18,8,0.38)",
                        marginLeft: "6px",
                      }}
                    >
                      /malam
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="fr-cta"
                  style={{
                    fontFamily: T.body,
                    fontSize: "12px",
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    color: T.neutral,
                    background: T.secondary,
                    border: "none",
                    padding: "12px 24px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  Lihat Detail
                  <ArrowUpRight size={12} strokeWidth={1.8} />
                </button>
              </div>
            </div>

            {/* Nav + pips */}
            <div
              style={{
                marginTop: "clamp(24px,3.4vh,44px)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                type="button"
                className="fr-nav"
                onClick={goPrev}
                disabled={activeCard === 0}
                aria-label="Kamar sebelumnya"
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  border: "0.8px solid rgba(36,18,8,0.20)",
                  background: "rgba(36,18,8,0.04)",
                  color: T.secondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ArrowLeft size={13} strokeWidth={1.8} />
              </button>

              <button
                type="button"
                className="fr-nav"
                onClick={goNext}
                disabled={activeCard === ROOM_DATA.length - 1}
                aria-label="Kamar berikutnya"
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  border: "0.8px solid rgba(36,18,8,0.20)",
                  background: "rgba(36,18,8,0.04)",
                  color: T.secondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ArrowRight size={13} strokeWidth={1.8} />
              </button>

              {ROOM_DATA.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToCard(i)}
                  aria-label={`Kamar ${i + 1}`}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "6px 0",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="fr-pip"
                    style={{
                      width: activeCard === i ? "20px" : "6px",
                      background:
                        activeCard === i ? T.primary : "rgba(36,18,8,0.18)",
                    }}
                  />
                </button>
              ))}

              <span
                style={{
                  fontFamily: T.body,
                  fontSize: "11px",
                  letterSpacing: "1.6px",
                  textTransform: "uppercase",
                  color: "rgba(36,18,8,0.28)",
                  marginLeft: "auto",
                }}
              >
                {String(activeCard + 1).padStart(2, "0")} ·{" "}
                {String(ROOM_DATA.length).padStart(2, "0")}
              </span>
            </div>

            <div
              style={{
                height: "0.8px",
                background: "rgba(36,18,8,0.10)",
                marginTop: "clamp(20px,2.8vh,36px)",
              }}
            />
          </div>

          {/* ── RIGHT: ACCORDION FILM STRIP ── */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div
              ref={scrollerRef}
              className="fr-strip"
              role="region"
              aria-label="Daftar kamar unggulan"
              tabIndex={0}
              onKeyDown={onScrollerKeyDown}
              style={{ height: "100%" }}
            >
              {ROOM_DATA.map((room, index) => (
                <article
                  key={room.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`fr-card${activeCard === index ? " is-active" : ""}`}
                  onClick={() => {
                    if (activeCard !== index) scrollToCard(index);
                  }}
                  data-active={activeCard === index}
                  aria-label={`${room.name} — ${room.price}/malam`}
                >
                  {/* Room photo */}
                  <img
                    src={room.image}
                    alt={room.name}
                    className="fr-card-img"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Dark veil */}
                  <div className="fr-card-veil" />

                  {/* Room number (top) */}
                  <div className="fr-card-num">{room.id}</div>

                  {/* Vertical name (inactive only) */}
                  <div className="fr-card-vert">{room.name}</div>

                  {/* Eyebrow rotated badge (inactive) */}
                  <div className="fr-card-badge">{room.eyebrow}</div>

                  {/* Active card: bottom details */}
                  <div className="fr-card-foot">
                    {room.popular && (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          background: T.primary,
                          color: T.secondary,
                          fontFamily: T.body,
                          fontSize: "8.5px",
                          letterSpacing: "1.8px",
                          textTransform: "uppercase",
                          padding: "4px 10px",
                          marginBottom: "10px",
                        }}
                      >
                        Most Desired
                      </div>
                    )}
                    <div
                      style={{
                        fontFamily: T.display,
                        fontWeight: 200,
                        fontSize: "clamp(20px,2.4vw,32px)",
                        lineHeight: 1,
                        letterSpacing: "-0.026em",
                        color: T.neutral,
                        marginBottom: "8px",
                        fontFeatureSettings: '"kern" 1, "liga" 1',
                      }}
                    >
                      {room.name}
                    </div>
                    <div
                      style={{
                        fontFamily: T.body,
                        fontSize: "11px",
                        letterSpacing: "1.4px",
                        textTransform: "uppercase",
                        color: "rgba(252,249,246,0.46)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Maximize2 size={10} strokeWidth={1.6} />
                        {room.size}
                      </span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <BedDouble size={10} strokeWidth={1.6} />
                        {room.bed}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturedRooms;
