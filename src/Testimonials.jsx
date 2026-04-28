import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Budi S.",
    type: "Liburan Keluarga",
    review:
      "Pemandangan sunset dari balkon kamar sangat luar biasa. Benar-benar lokasi terbaik di Pantai Losari. Fasilitasnya klasik namun terawat dengan sangat baik.",
  },
  {
    name: "Anita W.",
    type: "Pasangan",
    review:
      "Hotel bersejarah dengan pelayanan yang sangat ramah dan profesional. Sarapannya bervariasi dan enak. Sangat direkomendasikan untuk staycation.",
  },
  {
    name: "David L.",
    type: "Perjalanan Bisnis",
    review:
      "Lokasi sangat strategis, malam hari tinggal jalan kaki keluar mencari kuliner khas Makassar. Tidur sangat nyaman, akses ke pusat kota juga cepat.",
  },
];

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 lg:py-24"
      style={{ backgroundColor: "#f7f4ef" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-sm font-semibold uppercase tracking-[1.2px]"
            style={{
              color: "#F47C59",
              fontFamily: '"Inter", sans-serif',
              lineHeight: "16px",
            }}
          >
            Kata Mereka
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
            Pengalaman Menginap yang Berkesan.
          </h2>

          <p
            className="mx-auto mt-4 max-w-2xl"
            style={{
              color: "rgba(36,18,8,0.72)",
              fontFamily: '"Inter", sans-serif',
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "20px",
              letterSpacing: "-0.025em",
            }}
          >
            Jangan hanya mendengar dari kami. Lihat apa yang dikatakan para tamu
            tentang momen tak terlupakan mereka di Makassar Golden Hotel.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
              style={{
                border: "0.8px solid rgba(36,18,8,0.08)",
                boxShadow:
                  "rgba(0,0,0,0.035) 0px 2.8px 2.2px, rgba(0,0,0,0.047) 0px 6.7px 5.3px, rgba(0,0,0,0.06) 0px 12.5px 10px, rgba(0,0,0,0.07) 0px 22.3px 17.9px, rgba(0,0,0,0.05) 0px 24px 24px -12px",
              }}
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-current text-yellow-400"
                    strokeWidth={1.8}
                  />
                ))}
              </div>

              <p
                style={{
                  color: "#3f2c20",
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "15px",
                  fontWeight: 400,
                  lineHeight: "28px",
                  letterSpacing: "-0.02em",
                }}
              >
                "{review.review}"
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "rgba(244,124,89,0.12)",
                    color: "#241208",
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "20px",
                  }}
                >
                  {review.name.charAt(0)}
                </div>

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{
                      color: "#241208",
                      fontFamily: '"Inter", sans-serif',
                      lineHeight: "20px",
                    }}
                  >
                    {review.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(36,18,8,0.5)",
                      fontFamily: '"Inter", sans-serif',
                      lineHeight: "16px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {review.type}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
