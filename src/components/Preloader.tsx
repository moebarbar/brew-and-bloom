import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const logo = logoRef.current;
    const line = lineRef.current;
    const tagline = taglineRef.current;
    const panel1 = panel1Ref.current;
    const panel2 = panel2Ref.current;

    if (!preloader || !logo || !line || !tagline || !panel1 || !panel2) return;

    gsap.set([logo, tagline], { y: 40, opacity: 0 });
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });

    const tl = gsap.timeline({ delay: 0.1 });

    tl
      .to(line, { scaleX: 1, duration: 0.9, ease: 'power3.inOut', opacity: 1 })
      .to(logo, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .to(tagline, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to({}, { duration: 1.2 })
      .to([logo, line, tagline], {
        opacity: 0,
        y: -15,
        duration: 0.5,
        ease: 'power2.inOut',
      })
      .to([panel1, panel2], {
        yPercent: -100,
        duration: 1.1,
        ease: 'power4.inOut',
        stagger: 0.08,
        onComplete,
      }, '-=0.1');

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[10000] pointer-events-none">
      {/* Two-panel split exit */}
      <div ref={panel1Ref} className="absolute inset-x-0 top-0 h-1/2 bg-kaleo-charcoal" />
      <div ref={panel2Ref} className="absolute inset-x-0 bottom-0 h-1/2 bg-kaleo-charcoal" />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
        <div ref={logoRef} className="text-center">
          <p
            className="text-kaleo-cream select-none"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
              letterSpacing: '0.04em',
              lineHeight: 1,
              fontWeight: 300,
            }}
          >
            Brew & Bloom
          </p>
        </div>

        <div
          ref={lineRef}
          className="w-28 h-px"
          style={{ backgroundColor: '#8C7B6B' }}
        />

        <p
          ref={taglineRef}
          className="font-body text-kaleo-cream/40 text-[10px] uppercase tracking-[0.45em]"
        >
          Artisan Coffee · Portland
        </p>
      </div>
    </div>
  );
};

export default Preloader;
