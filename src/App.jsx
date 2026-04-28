import Hero from "./Hero.jsx";
import About from "./About.jsx";
import FeaturedRooms from "./FeaturedRooms.jsx";
import Facilities from "./Facilities.jsx";
import Location from "./Location.jsx";

function App() {
  return (
    /*
     * Card-stack overlay pattern:
     * 1. Hero wrapper = sticky + height 100vh → Hero DIAM di viewport
     * 2. About wrapper = relative + z-index 10 → About naik dari bawah menutupi Hero
     * NOTE: parent TIDAK boleh pakai overflow:hidden — akan mematikan sticky
     */
    <div style={{ isolation: "isolate" }}>
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

      <div
        style={{
          position: "relative",
          zIndex: 10,
          borderRadius: "0px",
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
      </div>
    </div>
  );
}

export default App;
