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
  const itemRefs = useRef([]);

  const activePlace = useMemo(
    () => nearbyAttractions[activeIndex] ?? nearbyAttractions[0],
    [activeIndex]
  );

  useEffect(() => {
    const observers = itemRefs.current
      .filter(Boolean)
      .map((node, index) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveIndex(index);
              }
            });
          },
          {
            root: null,
            threshold: 0.65,
          }
        );

        observer.observe(node);
        return observer;
      });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section
      id="location"
      className="relative overflow-hidden bg-[#FCF9F6] py-18 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 12% 10%, rgba(244,124,89,0.14), transparent 72%), radial-gradient(40% 35% at 88% 82%, rgba(36,18,8,0.08), transparent 74%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="text-left">
            <p
              className="text-xs font-semibold uppercase tracking-[1.2px]"
              style={{
                color: "#F47C59",
                fontFamily: '"Inter", sans-serif',
                lineHeight: "16px",
              }}
            >
              Location Narrative
            </p>

            <h2
              className="mt-3 max-w-[16ch] text-4xl sm:text-5xl lg:text-[56px]"
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

            <p
              className="mt-5 max-w-[56ch]"
              style={{
                color: "rgba(36,18,8,0.72)",
                fontFamily: '"Inter", sans-serif',
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "-0.025em",
              }}
            >
              Scroll daftar destinasi berikut untuk membaca cerita singkat tiap
              titik. Di sisi kanan, peta tetap berada pada posisi yang stabil
              agar Anda bisa memetakan perjalanan tanpa kehilangan konteks.
            </p>

            <ul className="mt-10 space-y-6 lg:space-y-8">
              {nearbyAttractions.map((place, index) => {
                const isActive = index === activeIndex;

                return (
                  <li
                    key={place.name}
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                    className="relative rounded-[2px] p-4 transition-all duration-300"
                    style={{
                      border: "0.8px solid rgba(36,18,8,0.14)",
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.84)"
                        : "rgba(252,249,246,0.65)",
                      boxShadow: isActive
                        ? "rgba(0,0,0,0.032) 0px 2.3px 1.8px, rgba(0,0,0,0.042) 0px 5.6px 4.3px, rgba(0,0,0,0.054) 0px 10.5px 8px, rgba(0,0,0,0.062) 0px 18.7px 14.3px"
                        : "none",
                      transform: isActive ? "translateY(-2px)" : "translateY(0)",
                    }}
                  >
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
                              color: isActive ? "#F47C59" : "rgba(36,18,8,0.55)",
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

          <div className="lg:pt-8">
            <div className="lg:sticky lg:top-24">
              <div
                className="overflow-hidden rounded-[2px]"
                style={{
                  border: "0.8px solid rgba(36,18,8,0.16)",
                  boxShadow:
                    "rgba(0,0,0,0.035) 0px 2.8px 2.2px, rgba(0,0,0,0.047) 0px 6.7px 5.3px, rgba(0,0,0,0.06) 0px 12.5px 10px, rgba(0,0,0,0.07) 0px 22.3px 17.9px, rgba(0,0,0,0.086) 0px 41.8px 33.4px, rgba(0,0,0,0.12) 0px 100px 80px",
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3"
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
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div
                  className="px-4 py-3"
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
