import React from "react";
import { ArrowUpRight, BedDouble, Maximize2, Wifi } from "lucide-react";

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
  return (
    <>
      <style>{`
        .rooms-panel {
          transition:
            transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1),
            border-color 300ms ease;
        }

        .rooms-panel:hover {
          transform: translateY(-4px);
          box-shadow: rgba(0,0,0,0.05) 0px 8px 20px, rgba(0,0,0,0.08) 0px 28px 48px -18px;
        }

        .rooms-image {
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .rooms-panel:hover .rooms-image {
          transform: scale(1.045);
        }

        .rooms-link {
          transition: color 300ms ease;
        }

        .rooms-link:hover {
          color: ${T.primary};
        }
      `}</style>

      <section
        style={{
          backgroundColor: T.neutral,
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(146,207,242,0.14) 0%, rgba(146,207,242,0) 44%)",
          padding: "96px 0",
          position: "relative",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
          <header className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
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
                  color: T.secondary,
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
                color: "rgba(36,18,8,0.72)",
              }}
            >
              Pilih tempat istirahat yang paling sesuai dengan ritme perjalanan
              Anda. Dari kamar yang menghadap gemerlap kota hingga suite yang
              lebih lapang untuk tinggal lebih lama, setiap ruang dirancang
              sebagai pengalaman yang terasa tenang, hangat, dan berkelas.
            </p>
          </header>

          <div className="flex flex-col gap-8">
            {ROOM_DATA.map((room, index) => {
              const reverse = index % 2 === 1;

              return (
                <article
                  key={room.name}
                  className="rooms-panel"
                  style={{
                    padding: "1px",
                    borderRadius: "2px",
                    background:
                      "linear-gradient(135deg, rgba(244,124,89,0.34) 0%, rgba(255,255,255,0.08) 50%, rgba(36,18,8,0.10) 100%)",
                    boxShadow: T.shadow,
                  }}
                >
                  <div
                    className={`grid grid-cols-1 overflow-hidden lg:grid-cols-2 ${
                      reverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                    style={{
                      backgroundColor: T.neutral,
                      borderRadius: "1px",
                      minHeight: "min(78vh, 720px)",
                    }}
                  >
                    <div className="relative min-h-[340px] lg:min-h-full">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="rooms-image absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />

                      <div
                        className="absolute inset-0"
                        style={{
                          background: reverse
                            ? "linear-gradient(90deg, rgba(36,18,8,0.08) 0%, rgba(36,18,8,0.20) 62%, rgba(36,18,8,0.54) 100%)"
                            : "linear-gradient(270deg, rgba(36,18,8,0.08) 0%, rgba(36,18,8,0.20) 62%, rgba(36,18,8,0.54) 100%)",
                        }}
                      />

                      <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
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
                        <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8">
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

                    <div className="flex min-h-full flex-col justify-between p-6 sm:p-8 lg:p-12">
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
                            fontSize: "clamp(34px, 4vw, 54px)",
                            lineHeight: 1,
                            letterSpacing: "-0.025em",
                            color: T.secondary,
                            marginBottom: "20px",
                          }}
                        >
                          {room.name}
                        </h3>

                        <p
                          className="max-w-xl"
                          style={{
                            fontFamily: T.body,
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "-0.025em",
                            color: "rgba(36,18,8,0.72)",
                            marginBottom: "28px",
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
                              color: T.secondary,
                            }}
                          >
                            Lihat Detail
                            <ArrowUpRight size={14} strokeWidth={1.7} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturedRooms;
