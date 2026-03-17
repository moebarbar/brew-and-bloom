import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';

// Sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import NarrativeText from './sections/NarrativeText';
import CoffeeMenu from './sections/CoffeeMenu';
import CardStack from './sections/CardStack';
import BreathSection from './sections/BreathSection';
import ZigZagGrid from './sections/ZigZagGrid';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set document language if configured
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }

    // Refresh ScrollTrigger after all content is loaded
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    // Also refresh after a short delay to ensure images are loaded
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <div className="relative bg-kaleo-sand">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <div id="home">
        <Hero />
      </div>

      {/* Narrative Text Section */}
      <div id="story">
        <NarrativeText />
      </div>

      {/* Coffee Menu Section */}
      <CoffeeMenu />

      {/* Card Stack Parallax Gallery */}
      <div id="offerings">
        <CardStack />
      </div>

      {/* BREATH Video Mask Section */}
      <BreathSection />

      {/* Zig-Zag Grid Section */}
      <ZigZagGrid />

      {/* Footer */}
      <div id="visit">
        <Footer />
      </div>
    </div>
  );
}

export default App;
