import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('cursor-none');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: 'none' });
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      gsap.set(ring, { x: ringX, y: ringY });
      rafRef.current = requestAnimationFrame(animate);
    };

    const expand = () => {
      gsap.to(ring, { scale: 2.5, duration: 0.35, ease: 'power2.out', borderColor: 'rgba(140,123,107,0.8)' });
      gsap.to(dot, { scale: 0, duration: 0.25 });
    };

    const shrink = () => {
      gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power2.out', borderColor: 'rgba(140,123,107,0.5)' });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    };

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-expand]').forEach(el => {
        el.addEventListener('mouseenter', expand);
        el.addEventListener('mouseleave', shrink);
      });
    };

    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove('cursor-none');
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          backgroundColor: '#8C7B6B',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9999]"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          border: '1px solid rgba(140,123,107,0.5)',
        }}
      />
    </>
  );
};

export default Cursor;
