import React from "react";
import { MapPin } from "lucide-react";

const nearbyAttractions = [
  {
    name: "Pantai Losari",
    detail: "Tepat di depan hotel",
  },
  {
    name: "Masjid Terapung Amirul Mukminin",
    detail: "5 menit jalan kaki",
  },
  {
    name: "Pusat Oleh-Oleh Somba Opu",
    detail: "5 menit jalan kaki",
  },
  {
    name: "Benteng Rotterdam",
    detail: "7 menit jalan kaki",
  },
  {
    name: "Trans Studio Makassar",
    detail: "15 menit berkendara",
  },
];

function Location() {
  return (
    <section id="location" className="bg-white py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="text-left">
            <p
              className="text-sm font-semibold uppercase tracking-[1.2px]"
              style={{
                color: "#F47C59",
                fontFamily: '"Inter", sans-serif',
                lineHeight: "16px",
              }}
            >
              Lokasi Strategis
            </p>

            <h2
              className="mt-3 text-3xl lg:text-4xl"
              style={{
                color: "#241208",
                fontFamily: '"Instrument Serif", serif',
                fontWeight: 200,
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Di Pusat Pesona Makassar.
            </h2>

            <p
              className="mt-4"
              style={{
                color: "rgba(36,18,8,0.72)",
                fontFamily: '"Inter", sans-serif',
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: "-0.025em",
                maxWidth: "60ch",
              }}
            >
              Hanya sejengkal dari berbagai destinasi ikonik, pusat kuliner, dan
              hiburan. Lokasi kami adalah titik awal terbaik untuk menjelajahi
              keindahan kota.
            </p>

            <ul className="mt-8 space-y-4">
              {nearbyAttractions.map((place) => (
                <li
                  key={place.name}
                  className="flex items-start gap-3"
                  style={{
                    borderBottom: "0.8px solid rgba(36,18,8,0.10)",
                    paddingBottom: "12px",
                  }}
                >
                  <span
                    className="mt-[2px] inline-flex h-7 w-7 shrink-0 items-center justify-center"
                    style={{
                      border: "0.8px solid rgba(36,18,8,0.18)",
                      borderRadius: "2px",
                      backgroundColor: "rgba(244,124,89,0.08)",
                    }}
                  >
                    <MapPin
                      size={14}
                      strokeWidth={1.8}
                      className="text-[#241208]"
                    />
                  </span>

                  <div>
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
                      className="text-sm"
                      style={{
                        color: "rgba(36,18,8,0.56)",
                        fontFamily: '"Inter", sans-serif',
                        lineHeight: "20px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {place.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="h-[400px] overflow-hidden rounded-2xl shadow-2xl lg:h-[500px]"
            style={{
              border: "0.8px solid rgba(36,18,8,0.16)",
              boxShadow:
                "rgba(0,0,0,0.035) 0px 2.8px 2.2px, rgba(0,0,0,0.047) 0px 6.7px 5.3px, rgba(0,0,0,0.06) 0px 12.5px 10px, rgba(0,0,0,0.07) 0px 22.3px 17.9px, rgba(0,0,0,0.086) 0px 41.8px 33.4px, rgba(0,0,0,0.12) 0px 100px 80px",
            }}
          >
            <iframe
              title="Makassar Golden Hotel Location"
              src="https://maps.google.com/maps?q=Makassar%20Golden%20Hotel%2C%20Jl.%20Pasar%20Ikan%20No.%2052%2C%20Makassar&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
