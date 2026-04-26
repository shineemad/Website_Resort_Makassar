import Hero from "./Hero.jsx";
import About from "./About.jsx";
import FeaturedRooms from "./FeaturedRooms.jsx";

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
          /* Rounded top corners + shadow untuk efek premium overlay */
          borderRadius: "16px 16px 0 0",
          boxShadow:
            "0 -12px 48px rgba(10,5,2,0.30), 0 -2px 8px rgba(10,5,2,0.18)",
          overflow: "hidden",
        }}
      >
        <About />
        <FeaturedRooms />
      </div>
    </div>
  );
}

export default App;
