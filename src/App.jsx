import { useEffect, useState } from "react";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import FeaturedRooms from "./FeaturedRooms.jsx";
import Facilities from "./Facilities.jsx";
import Location from "./Location.jsx";
import Testimonials from "./Testimonials.jsx";
import FinaleInterlude from "./FinaleInterlude.jsx";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import Cursor from "./Cursor.jsx";

function App() {
  const [showGrain, setShowGrain] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const pointerFineQuery = window.matchMedia("(pointer: fine)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const updateGrainVisibility = () => {
      const shouldShow =
        !reducedMotionQuery.matches &&
        pointerFineQuery.matches &&
        desktopQuery.matches;
      setShowGrain(shouldShow);
    };

    updateGrainVisibility();

    const addListener = (query, handler) => {
      if (query.addEventListener) {
        query.addEventListener("change", handler);
      } else {
        query.addListener(handler);
      }
    };

    const removeListener = (query, handler) => {
      if (query.removeEventListener) {
        query.removeEventListener("change", handler);
      } else {
        query.removeListener(handler);
      }
    };

    addListener(reducedMotionQuery, updateGrainVisibility);
    addListener(pointerFineQuery, updateGrainVisibility);
    addListener(desktopQuery, updateGrainVisibility);

    return () => {
      removeListener(reducedMotionQuery, updateGrainVisibility);
      removeListener(pointerFineQuery, updateGrainVisibility);
      removeListener(desktopQuery, updateGrainVisibility);
    };
  }, []);

  return (
    <div style={{ isolation: "isolate" }}>
      {/* ── Global fixed: Navbar + Cursor + Grain ── */}
      <Navbar />
      <Cursor />

      {/* Film-grain overlay — atmospheric depth */}
      {showGrain ? (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9997,
            pointerEvents: "none",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            opacity: 0.02,
            mixBlendMode: "overlay",
          }}
        />
      ) : null}

      {/* ── Hero: sticky, behind content ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 0,
        }}
      >
        <Hero />
      </div>

      {/* ── Content sections: rise over Hero on scroll ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          borderTop: "0.8px solid rgba(36,18,8,0.22)",
          boxShadow:
            "rgba(0,0,0,0.035) 0px 2.8px 2.2px, rgba(0,0,0,0.047) 0px 6.7px 5.3px, rgba(0,0,0,0.06) 0px 12.5px 10px, rgba(0,0,0,0.07) 0px 22.3px 17.9px, rgba(0,0,0,0.086) 0px 41.8px 33.4px, rgba(0,0,0,0.12) 0px 100px 80px",
          overflow: "hidden",
        }}
      >
        <About />
        <FeaturedRooms />
        <Facilities />
        <Location />
        <Testimonials />
        <FinaleInterlude />
        <Footer />
      </div>
    </div>
  );
}

export default App;
