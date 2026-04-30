import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapPin } from "lucide-react";

const nearbyAttractions = [
  {
    name: "Pantai Losari",
    detail: "Tepat di depan hotel",
    narrative:
      "Sunset line paling ikonik di kota ini. Cukup melangkah keluar lobi dan Anda langsung tiba di tepi laut.",
  },
  {
    name: "Masjid Terapung Amirul Mukminin",
    detail: "5 menit jalan kaki",
    narrative:
      "Siluet arsitektur terapung yang tenang di atas air, cocok untuk momen pagi dan sore hari.",
  },
  {
    name: "Pusat Oleh-Oleh Somba Opu",
    detail: "5 menit jalan kaki",
    narrative:
      "Koridor belanja khas Makassar untuk membawa pulang rasa dan cerita lokal.",
  },
  {
    name: "Benteng Rotterdam",
    detail: "7 menit jalan kaki",
    narrative:
      "Ruang sejarah yang memperlihatkan lapisan budaya kota pelabuhan dari masa ke masa.",
  },
  {
    name: "Trans Studio Makassar",
    detail: "15 menit berkendara",
    narrative:
      "Destinasi hiburan modern untuk keluarga, ideal saat ingin agenda yang lebih dinamis.",
  },
];

function Location() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const itemRefs = useRef([]);
  const sectionRef = useRef(null);
  const activeIndexRef = useRef(0);

  const activePlace = useMemo(
    () => nearbyAttractions[activeIndex] ?? nearbyAttractions[0],
    [activeIndex],
  );

  const progressPercent = useMemo(() => {
    const total = nearbyAttractions.length;
    if (total <= 1) return 100;
    return (activeIndex / (total - 1)) * 100;
  }, [activeIndex]);

  useEffect(() => {
    const viewportQuery = window.matchMedia("(max-width: 767px)");
    const handleViewportChange = (event) => {
      setIsMobileViewport(event.matches);
    };

    setIsMobileViewport(viewportQuery.matches);
    if (viewportQuery.addEventListener) {
      viewportQuery.addEventListener("change", handleViewportChange);
    } else {
      viewportQuery.addListener(handleViewportChange);
    }

    return () => {
      if (viewportQuery.removeEventListener) {
        viewportQuery.removeEventListener("change", handleViewportChange);
      } else {
        viewportQuery.removeListener(handleViewportChange);
      }
    };
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean);
    if (nodes.length === 0) return;

    let rafId = null;

    const updateActiveByScroll = () => {
      const viewportHeight = window.innerHeight || 1;
      const focusLine = viewportHeight * (isMobileViewport ? 0.42 : 0.48);
      const switchGuardPx = isMobileViewport ? 16 : 24;

      let bestIndex = activeIndexRef.current;
      let bestDistance = Number.POSITIVE_INFINITY;

      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - focusLine);

        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      const currentNode = nodes[activeIndexRef.current];
      let currentDistance = Number.POSITIVE_INFINITY;
      if (currentNode) {
        const currentRect = currentNode.getBoundingClientRect();
        const currentCenter = currentRect.top + currentRect.height / 2;
        currentDistance = Math.abs(currentCenter - focusLine);
      }

      const shouldSwitch =
        bestIndex !== activeIndexRef.current &&
        bestDistance + switchGuardPx < currentDistance;

      if (shouldSwitch) {
        activeIndexRef.current = bestIndex;
        setActiveIndex(bestIndex);
      }

      rafId = null;
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateActiveByScroll);
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [isMobileViewport]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealNodes =
      sectionRef.current?.querySelectorAll("[data-loc-reveal]");
    if (!revealNodes || revealNodes.length === 0) return;

    if (prefersReducedMotion) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        root: null,
        threshold: isMobileViewport ? 0.12 : 0.22,
        rootMargin: isMobileViewport ? "0px 0px -10% 0px" : "0px 0px -6% 0px",
      },
    );

    revealNodes.forEach((node) => revealObserver.observe(node));
    return () => revealObserver.disconnect();
  }, [isMobileViewport]);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F6ECE0] py-18 lg:py-24"
    >
      <style>{`
        .loc-reveal {
          opacity: 0;
          transform: translate3d(0, var(--loc-reveal-distance, 16px), 0) scale(0.992);
          transition:
            opacity var(--loc-reveal-duration, 700ms) cubic-bezier(0.22, 1, 0.36, 1),
            transform var(--loc-reveal-duration, 700ms) cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--loc-delay, 0ms);
        }

        .loc-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        .loc-headline {
          --loc-delay: 60ms;
          --loc-reveal-distance: 14px;
        }

        .loc-intro {
          --loc-delay: 120ms;
          --loc-reveal-distance: 14px;
        }

        .loc-item {
          --loc-delay: calc(160ms + var(--item-order, 0) * 50ms);
          --loc-reveal-distance: 18px;
        }

        .loc-map-shell {
          --loc-delay: 180ms;
          --loc-reveal-distance: 18px;
        }

        .loc-map-grid {
          background-image:
            linear-gradient(to right, rgba(36,18,8,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(36,18,8,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.3;
        }

        @media (max-width: 767px) {
          .loc-reveal {
            --loc-reveal-duration: 460ms;
            --loc-reveal-distance: 10px;
          }

          .loc-item {
            --loc-delay: calc(110ms + var(--item-order, 0) * 26ms);
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .loc-reveal {
            --loc-reveal-duration: 580ms;
          }

          .loc-item {
            --loc-delay: calc(140ms + var(--item-order, 0) * 38ms);
          }
        }

        @media (min-width: 1024px) {
          .loc-map-shell {
            --loc-reveal-distance: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loc-reveal {
            transition: none;
            opacity: 1;
            transform: none !important;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 48% at 14% 8%, rgba(244,124,89,0.18), transparent 70%), radial-gradient(42% 36% at 88% 84%, rgba(36,18,8,0.12), transparent 76%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="text-left">
            <p
              className="loc-headline loc-reveal text-xs font-semibold uppercase tracking-[1.2px]"
              data-loc-reveal
              style={{
                color: "#F47C59",
                fontFamily: '"Inter", sans-serif',
                lineHeight: "16px",
              }}
            >
              Location Narrative
            </p>

            <h2
              className="loc-headline loc-reveal mt-3 max-w-[16ch] text-4xl sm:text-5xl lg:text-[56px]"
              data-loc-reveal
              style={{
                color: "#241208",
                fontFamily: '"Instrument Serif", serif',
                fontWeight: 200,
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
            >
              Jejak Kota Dimulai Dari Sini.
            </h2>

            <div
              className="loc-intro loc-reveal relative mt-10 pl-6"
              data-loc-reveal
            >
              <div
                aria-hidden="true"
                className="absolute bottom-2 left-[6px] top-2 w-[1.5px]"
                style={{ backgroundColor: "rgba(36,18,8,0.18)" }}
              />
              <div
                aria-hidden="true"
                className="absolute left-[3px] top-2 w-[7px]"
                style={{
                  backgroundColor: "#F47C59",
                  height: `${Math.max(8, progressPercent)}%`,
                  transition: "height 460ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />

              <ul className="space-y-6 lg:space-y-8">
                {nearbyAttractions.map((place, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <li
                      key={place.name}
                      ref={(node) => {
                        itemRefs.current[index] = node;
                      }}
                      className="loc-item loc-reveal relative rounded-[2px] p-4 transition-all duration-300"
                      data-loc-reveal
                      style={{
                        "--item-order": index,
                        border: isActive
                          ? "0.8px solid rgba(36,18,8,0.22)"
                          : "0.8px solid rgba(36,18,8,0.14)",
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.84)"
                          : "rgba(255,255,255,0.45)",
                        boxShadow: isActive
                          ? "rgba(0,0,0,0.032) 0px 2.3px 1.8px, rgba(0,0,0,0.042) 0px 5.6px 4.3px, rgba(0,0,0,0.054) 0px 10.5px 8px, rgba(0,0,0,0.062) 0px 18.7px 14.3px"
                          : "none",
                        transform: isActive
                          ? "translateY(-2px)"
                          : "translateY(0)",
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute -left-5 top-1/2 hidden h-[10px] w-[10px] -translate-y-1/2 rounded-full sm:block"
                        style={{
                          backgroundColor: isActive
                            ? "#F47C59"
                            : "rgba(36,18,8,0.22)",
                          boxShadow: isActive
                            ? "0 0 0 4px rgba(244,124,89,0.2)"
                            : "none",
                          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />

                      <p
                        className="mb-2 text-[11px] uppercase tracking-[1.2px]"
                        style={{
                          color: isActive ? "#F47C59" : "rgba(36,18,8,0.5)",
                          fontFamily: '"Inter", sans-serif',
                        }}
                      >
                        Stop {String(index + 1).padStart(2, "0")}
                      </p>

                      <div className="flex items-start gap-3">
                        <span
                          className="mt-[2px] inline-flex h-7 w-7 shrink-0 items-center justify-center"
                          style={{
                            border: "0.8px solid rgba(36,18,8,0.18)",
                            borderRadius: "2px",
                            backgroundColor: isActive
                              ? "rgba(244,124,89,0.18)"
                              : "rgba(244,124,89,0.08)",
                          }}
                        >
                          <MapPin
                            size={14}
                            strokeWidth={1.8}
                            className="text-[#241208]"
                          />
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p
                              className="font-semibold"
                              style={{
                                color: "#241208",
                                fontFamily: '"Inter", sans-serif',
                                fontSize: "14px",
                                lineHeight: "20px",
                                letterSpacing: "-0.025em",
                              }}
                            >
                              {place.name}
                            </p>

                            <p
                              className="text-xs uppercase tracking-[1.2px]"
                              style={{
                                color: isActive
                                  ? "#F47C59"
                                  : "rgba(36,18,8,0.55)",
                                fontFamily: '"Inter", sans-serif',
                                lineHeight: "16px",
                              }}
                            >
                              {place.detail}
                            </p>
                          </div>

                          <p
                            className="mt-2 text-sm transition-opacity duration-300"
                            style={{
                              color: "rgba(36,18,8,0.64)",
                              fontFamily: '"Inter", sans-serif',
                              lineHeight: "20px",
                              letterSpacing: "-0.01em",
                              opacity: isActive ? 1 : 0.72,
                            }}
                          >
                            {place.narrative}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:pt-8">
            <div className="lg:sticky lg:top-24">
              <div
                className="loc-map-shell loc-reveal relative overflow-hidden rounded-[2px]"
                data-loc-reveal
                style={{
                  border: "0.8px solid rgba(36,18,8,0.16)",
                  boxShadow:
                    "rgba(0,0,0,0.035) 0px 2.8px 2.2px, rgba(0,0,0,0.047) 0px 6.7px 5.3px, rgba(0,0,0,0.06) 0px 12.5px 10px, rgba(0,0,0,0.07) 0px 22.3px 17.9px, rgba(0,0,0,0.086) 0px 41.8px 33.4px, rgba(0,0,0,0.12) 0px 100px 80px",
                }}
              >
                <div
                  aria-hidden="true"
                  className="loc-map-grid pointer-events-none absolute inset-0 z-[1]"
                />

                <div
                  className="relative z-[2] flex items-center justify-between px-4 py-3"
                  style={{
                    borderBottom: "0.8px solid rgba(36,18,8,0.14)",
                    backgroundColor: "rgba(255,255,255,0.84)",
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-[1.2px]"
                    style={{
                      color: "rgba(36,18,8,0.62)",
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    Current Highlight
                  </p>
                  <p
                    className="text-xs uppercase tracking-[1.2px]"
                    style={{
                      color: "#F47C59",
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {activePlace.detail}
                  </p>
                </div>

                <div className="h-[380px] sm:h-[430px] lg:h-[560px]">
                  <iframe
                    title="Makassar Golden Hotel Location"
                    src="https://maps.google.com/maps?q=Makassar%20Golden%20Hotel%2C%20Jl.%20Pasar%20Ikan%20No.%2052%2C%20Makassar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="relative z-[2] h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div
                  className="relative z-[2] px-4 py-3"
                  style={{
                    borderTop: "0.8px solid rgba(36,18,8,0.14)",
                    backgroundColor: "rgba(255,255,255,0.74)",
                  }}
                >
                  <p
                    className="text-sm"
                    style={{
                      color: "#241208",
                      fontFamily: '"Inter", sans-serif',
                      lineHeight: "20px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {activePlace.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
