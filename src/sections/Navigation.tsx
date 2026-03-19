import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Offerings', href: '#offerings' },
  { label: 'Visit Us', href: '#visit' },
];

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: progress, transformOrigin: 'left center' });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-kaleo-sand/95 backdrop-blur-md shadow-xs py-4'
            : 'bg-transparent py-6'
        }`}
      >
        {/* Scroll progress bar */}
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 right-0 h-px origin-left"
          style={{ backgroundColor: '#8C7B6B', transform: 'scaleX(0)' }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group"
            >
              <span
                className={`font-display text-xl transition-colors duration-300 ${
                  isScrolled ? 'text-kaleo-earth' : 'text-kaleo-cream'
                }`}
              >
                Brew & Bloom
              </span>
            </a>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-10">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`link-underline font-body text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${
                    isScrolled ? 'text-kaleo-earth/80 hover:text-kaleo-earth' : 'text-kaleo-cream/80 hover:text-kaleo-cream'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Reserve CTA — desktop */}
            <a
              href="#visit"
              onClick={(e) => handleNavClick(e, '#visit')}
              className={`hidden md:inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border transition-all duration-300 ${
                isScrolled
                  ? 'border-kaleo-earth/30 text-kaleo-earth hover:bg-kaleo-earth hover:text-kaleo-cream'
                  : 'border-kaleo-cream/40 text-kaleo-cream hover:bg-kaleo-cream hover:text-kaleo-earth'
              }`}
            >
              Visit Us
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isScrolled ? 'text-kaleo-earth' : 'text-kaleo-cream'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-kaleo-charcoal/98 backdrop-blur-lg transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-10 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Decorative star */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-kaleo-terracotta spin-slow mb-4">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>

        {menuItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="font-display text-4xl text-kaleo-cream hover:text-kaleo-terracotta transition-colors duration-300"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {item.label}
          </a>
        ))}

        <div className="mt-6 w-12 h-px bg-kaleo-terracotta/30" />
        <p className="font-body text-[10px] text-kaleo-cream/30 uppercase tracking-[0.3em]">
          Artisan Coffee · Portland
        </p>
      </div>
    </>
  );
};

export default Navigation;
