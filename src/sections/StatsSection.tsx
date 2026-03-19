import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 2015, suffix: '', label: 'Established' },
  { number: 47, suffix: 'K+', label: 'Happy Customers' },
  { number: 12, suffix: '', label: 'Origin Countries' },
  { number: 100, suffix: '%', label: 'Ethically Sourced' },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Set initial state for items
    itemsRef.current.forEach(el => {
      if (el) gsap.set(el, { opacity: 0, y: 30 });
    });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        // Animate items in
        itemsRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out',
          });
        });

        // Animate counters
        countersRef.current.forEach((el, i) => {
          if (!el) return;
          const stat = stats[i];
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.number,
            duration: 2.2,
            delay: i * 0.12,
            ease: 'power2.out',
            onUpdate() {
              if (el) el.textContent = Math.round(obj.val).toString();
            },
            onComplete() {
              if (el) el.textContent = stat.number.toString();
            },
          });
        });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 bg-kaleo-earth overflow-hidden">
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #F0E4CC 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Subtle horizontal rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-kaleo-cream/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Label */}
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-kaleo-terracotta text-center mb-16">
          By the numbers
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="text-center group"
            >
              {/* Number */}
              <div
                className="font-display text-kaleo-cream"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', lineHeight: 1 }}
              >
                <span
                  ref={(el) => { countersRef.current[i] = el; }}
                  className="tabular-nums"
                >
                  0
                </span>
                <span className="text-kaleo-terracotta">{stat.suffix}</span>
              </div>

              {/* Divider */}
              <div className="w-8 h-px bg-kaleo-terracotta/40 mx-auto mt-5 mb-3 transition-all duration-500 group-hover:w-16 group-hover:bg-kaleo-terracotta" />

              {/* Label */}
              <p className="font-body text-[10px] text-kaleo-cream/40 uppercase tracking-[0.18em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
