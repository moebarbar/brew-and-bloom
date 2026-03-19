import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';

// Global components
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Marquee from './components/Marquee';

// Sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import NarrativeText from './sections/NarrativeText';
import CoffeeMenu from './sections/CoffeeMenu';
import CardStack from './sections/CardStack';
import BreathSection from './sections/BreathSection';
import StatsSection from './sections/StatsSection';
import ZigZagGrid from './sections/ZigZagGrid';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useLenis();

  useEffect(() => {
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      {/* Custom cursor — desktop only */}
      <Cursor />

      {/* Cinematic preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Main site — fades in after preloader */}
      <div
        className="relative bg-kaleo-sand"
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <Navigation />

        {/* Hero */}
        <div id="home">
          <Hero />
        </div>

        {/* Press / Awards ticker */}
        <Marquee />

        {/* Story / Narrative */}
        <div id="story">
          <NarrativeText />
        </div>

        {/* Coffee Menu */}
        <CoffeeMenu />

        {/* Card Stack gallery */}
        <div id="offerings">
          <CardStack />
        </div>

        {/* Full-bleed breath section */}
        <BreathSection />

        {/* Animated stats */}
        <StatsSection />

        {/* Zig-zag editorial grid */}
        <ZigZagGrid />

        {/* Footer / contact */}
        <div id="visit">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
