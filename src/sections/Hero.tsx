import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const floatA = useRef<HTMLDivElement>(null);
  const floatB = useRef<HTMLDivElement>(null);
  const floatC = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const charsEl = charsRef.current;
    const subtitle = subtitleRef.current;
    const scrollCue = scrollCueRef.current;
    const line = lineRef.current;

    if (!section || !image || !overlay || !charsEl || !subtitle || !scrollCue || !line) return;

    const chars = Array.from(charsEl.querySelectorAll<HTMLSpanElement>('.char'));

    // Initial states
    gsap.set(chars, { y: '110%', opacity: 0 });
    gsap.set(subtitle, { y: 24, opacity: 0 });
    gsap.set(scrollCue, { opacity: 0 });
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(image, { scale: 1.18, opacity: 0 });

    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl
      .to(image, { scale: 1.06, opacity: 1, duration: 2.2, ease: 'power2.out' })
      .to(chars, { y: '0%', opacity: 1, duration: 1.1, stagger: 0.045, ease: 'power4.out' }, '-=1.7')
      .to(line, { scaleX: 1, duration: 0.8 }, '-=0.5')
      .to(subtitle, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
      .to(scrollCue, { opacity: 1, duration: 0.6 }, '-=0.2');

    // Floating decorative elements
    if (floatA.current) gsap.to(floatA.current, { y: -22, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    if (floatB.current) gsap.to(floatB.current, { y: 18, duration: 4.1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 });
    if (floatC.current) gsap.to(floatC.current, { y: -14, x: 6, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });

    // Scroll-driven parallax
    const triggers: ScrollTrigger[] = [];

    triggers.push(ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(image, { y: self.progress * 180 });
        gsap.set(charsEl, { y: self.progress * -80, opacity: 1 - self.progress * 2 });
        gsap.set(subtitle, { y: self.progress * -40, opacity: 1 - self.progress * 3 });
        gsap.set(overlay, { opacity: self.progress * 0.45 });
      },
    }));

    return () => {
      triggers.forEach(t => t.kill());
      tl.kill();
    };
  }, []);

  if (!heroConfig.title && !heroConfig.backgroundImage) return null;

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden">
      {/* Background image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full" style={{ willChange: 'transform' }}>
        <img
          src={heroConfig.backgroundImage}
          alt={heroConfig.backgroundAlt}
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Static dark veil for text legibility */}
      <div className="absolute inset-0 bg-kaleo-charcoal/35" />

      {/* Scroll-driven darkening overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-kaleo-charcoal opacity-0" style={{ willChange: 'opacity' }} />

      {/* Bottom fog → matches page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-kaleo-sand to-transparent" />

      {/* Decorative floating shapes */}
      <div ref={floatA} className="absolute top-[18%] left-[7%] w-4 h-4 rounded-full border border-kaleo-cream/25 pointer-events-none" style={{ willChange: 'transform' }} />
      <div ref={floatB} className="absolute top-[40%] right-[9%] w-2 h-2 rounded-full bg-kaleo-cream/15 pointer-events-none" style={{ willChange: 'transform' }} />
      <div ref={floatC} className="absolute bottom-[28%] left-[12%] w-px h-20 bg-kaleo-cream/15 pointer-events-none" style={{ willChange: 'transform' }} />
      <div className="absolute top-[25%] right-[18%] w-8 h-px bg-kaleo-cream/15 pointer-events-none" />

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {/* Title with per-character overflow-hidden */}
        <div className="overflow-hidden">
          <h1
            ref={charsRef}
            className="font-display text-kaleo-cream tracking-tight select-none"
            style={{
              fontSize: 'clamp(4rem, 15vw, 13rem)',
              lineHeight: 0.88,
              textShadow: '0 4px 60px rgba(0,0,0,0.35)',
              willChange: 'transform, opacity',
            }}
          >
            {heroConfig.title.split('').map((char, i) => (
              <span key={i} className="char inline-block" style={{ willChange: 'transform, opacity' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Decorative horizontal line */}
        <div
          ref={lineRef}
          className="mt-8 w-24 h-px bg-kaleo-cream/40"
          style={{ willChange: 'transform' }}
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-kaleo-cream/75 text-[10px] md:text-[11px] uppercase tracking-[0.45em] mt-6"
          style={{ willChange: 'transform, opacity' }}
        >
          {heroConfig.subtitle}
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ willChange: 'opacity' }}
      >
        <span className="font-body text-kaleo-cream/40 text-[9px] uppercase tracking-[0.35em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-kaleo-cream/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
