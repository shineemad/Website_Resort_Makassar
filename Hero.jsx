import React from "react";
import { CalendarDays, Users, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {/* Placeholder background: sunset over ocean */}
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
          alt="Matahari terbenam di Pantai Losari"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-40 pt-24 text-center sm:px-6 lg:px-8">
        <h1 className="max-w-5xl font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Matahari Terbenam Terbaik di Jantung Makassar
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-200/95 sm:text-lg md:text-xl">
          Rasakan kemewahan klasik di atas ombak Pantai Losari. Makassar Golden Hotel menawarkan perpaduan sempurna antara warisan budaya dan kenyamanan modern.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-20 px-4 sm:bottom-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl rounded-xl bg-white p-4 shadow-2xl sm:p-5 lg:p-6">
          <form className="flex flex-col gap-3 md:flex-row md:items-end md:gap-4" onSubmit={(e) => e.preventDefault()}>
            <label className="flex-1">
              <span className="mb-2 inline-block text-sm font-medium text-slate-700">Check-in</span>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </label>

            <label className="flex-1">
              <span className="mb-2 inline-block text-sm font-medium text-slate-700">Check-out</span>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </label>

            <label className="flex-[1.2]">
              <span className="mb-2 inline-block text-sm font-medium text-slate-700">Tamu & Kamar</span>
              <div className="relative">
                <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="2 Dewasa, 1 Kamar"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </label>

            <button
              type="submit"
              className="inline-flex h-11 min-w-[200px] items-center justify-center gap-2 rounded-lg bg-blue-900 px-5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Cek Ketersediaan
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
