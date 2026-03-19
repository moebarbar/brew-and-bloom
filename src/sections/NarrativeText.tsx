import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { narrativeTextConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const StarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

// Word-by-word scroll-driven highlight reveal
const WordReveal = ({ text, className }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = Array.from(container.querySelectorAll<HTMLSpanElement>('.word'));
    gsap.set(words, { opacity: 0.1 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom 25%',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        words.forEach((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          const wp = gsap.utils.clamp(0, 1, (progress - start) / (end - start));
          gsap.set(word, { opacity: 0.1 + wp * 0.9 });
        });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <p ref={containerRef} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="word inline" style={{ opacity: 0.1, marginRight: '0.3em', willChange: 'opacity' }}>
          {word}
        </span>
      ))}
    </p>
  );
};

const NarrativeText = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const star = starRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    if (!star || !headline || !sub) return;

    gsap.set([star, headline, sub], { opacity: 0, y: 24 });

    const triggers: ScrollTrigger[] = [];

    triggers.push(ScrollTrigger.create({
      trigger: star,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(star, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.7)' });
      },
    }));

    triggers.push(ScrollTrigger.create({
      trigger: headline,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.to(headline, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' });
      },
    }));

    triggers.push(ScrollTrigger.create({
      trigger: sub,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(sub, { opacity: 1, y: 0, duration: 1, delay: 0.1, ease: 'power3.out' });
      },
    }));

    return () => { triggers.forEach(t => t.kill()); };
  }, []);

  if (!narrativeTextConfig.line1 && !narrativeTextConfig.line2 && !narrativeTextConfig.line3) return null;

  return (
    <section ref={sectionRef} className="relative w-full py-32 md:py-52 lg:py-60 bg-kaleo-sand overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-kaleo-terracotta/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-kaleo-terracotta/5 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-8 text-center">
        {/* Spinning star */}
        <div ref={starRef} className="flex justify-center mb-16" style={{ willChange: 'transform, opacity' }}>
          <StarIcon className="w-7 h-7 text-kaleo-terracotta spin-slow" />
        </div>

        {/* Large headline */}
        <p
          ref={headlineRef}
          className="font-display text-kaleo-earth"
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            willChange: 'transform, opacity',
          }}
        >
          {narrativeTextConfig.line1}
        </p>

        {/* Italic sub */}
        <p
          ref={subRef}
          className="font-display text-kaleo-earth/65 italic max-w-2xl mx-auto mt-8"
          style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.75rem)', lineHeight: 1.3, willChange: 'transform, opacity' }}
        >
          {narrativeTextConfig.line2}
        </p>

        {/* Word-reveal body text */}
        <div className="mt-16 md:mt-20">
          <WordReveal
            text={narrativeTextConfig.line3}
            className="font-body text-sm md:text-base text-kaleo-earth max-w-2xl mx-auto leading-loose tracking-wide"
          />
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-5 mt-20">
          <div className="w-16 h-px bg-kaleo-terracotta/25" />
          <StarIcon className="w-3 h-3 text-kaleo-terracotta/40" />
          <div className="w-16 h-px bg-kaleo-terracotta/25" />
        </div>
      </div>
    </section>
  );
};

export default NarrativeText;
