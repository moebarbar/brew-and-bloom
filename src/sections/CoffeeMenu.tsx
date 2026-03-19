import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Croissant, Leaf, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tags?: string[];
}

interface MenuCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    id: 'espresso',
    title: 'Espresso Bar',
    icon: Coffee,
    items: [
      { name: 'Classic Espresso', description: 'Double shot of our house blend', price: '$3.50', tags: ['Hot'] },
      { name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: '$4.50', tags: ['Hot'] },
      { name: 'Cortado', description: 'Equal parts espresso and warm milk', price: '$4.00', tags: ['Hot'] },
      { name: 'Flat White', description: 'Silky microfoam over double espresso', price: '$4.75', tags: ['Hot'] },
      { name: 'Nitro Cold Brew', description: '24-hour steeped, nitrogen-infused', price: '$5.50', tags: ['Cold'] },
    ],
  },
  {
    id: 'specialty',
    title: 'Signature Lattes',
    icon: Sparkles,
    items: [
      { name: 'Lavender Honey', description: 'House-made lavender syrup with local honey', price: '$6.00', tags: ['Popular'] },
      { name: 'Maple Bourbon', description: 'Vermont maple with a hint of bourbon vanilla', price: '$6.00' },
      { name: 'Golden Turmeric', description: 'Anti-inflammatory blend with oat milk', price: '$6.50', tags: ['Vegan'] },
      { name: 'Cardamom Rose', description: 'Middle Eastern inspired, subtly floral', price: '$6.00' },
      { name: 'Salted Caramel', description: 'House caramel with sea salt flakes', price: '$5.75', tags: ['Best Seller'] },
    ],
  },
  {
    id: 'alternative',
    title: 'Alternatives',
    icon: Leaf,
    items: [
      { name: 'Matcha Latte', description: 'Ceremonial grade matcha from Japan', price: '$5.50', tags: ['Vegan'] },
      { name: 'Chai Latte', description: 'House-spiced black tea blend', price: '$5.00' },
      { name: 'Golden Milk', description: 'Turmeric, ginger, cinnamon & coconut milk', price: '$5.50', tags: ['Vegan', 'Caffeine-Free'] },
      { name: 'Hot Chocolate', description: 'Belgian dark chocolate, whipped cream', price: '$5.00' },
    ],
  },
  {
    id: 'pastries',
    title: 'Fresh Pastries',
    icon: Croissant,
    items: [
      { name: 'Butter Croissant', description: 'Flaky, golden, baked fresh daily', price: '$4.00', tags: ['Fresh Daily'] },
      { name: 'Almond Bear Claw', description: 'Filled with almond cream', price: '$5.50' },
      { name: 'Cinnamon Roll', description: 'House cream cheese frosting', price: '$5.00', tags: ['Popular'] },
      { name: 'Lemon Poppy Scone', description: 'Bright, buttery, perfect with tea', price: '$4.50' },
      { name: 'Seasonal Muffin', description: "Ask about today's flavor", price: '$4.00' },
    ],
  },
];

const CoffeeMenu = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCategory, setActiveCategory] = useState('espresso');

  // Move the sliding indicator to the active tab
  const moveIndicator = (index: number) => {
    const tab = tabRefs.current[index];
    const bar = tabBarRef.current;
    const indicator = indicatorRef.current;
    if (!tab || !bar || !indicator) return;

    const tabRect = tab.getBoundingClientRect();
    const barRect = bar.getBoundingClientRect();
    gsap.to(indicator, {
      x: tabRect.left - barRect.left,
      width: tabRect.width,
      duration: 0.45,
      ease: 'power3.out',
    });
  };

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    gsap.set(header.children, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(header.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        });
        // Init indicator position after reveal
        setTimeout(() => moveIndicator(0), 400);
      },
    });

    return () => { trigger.kill(); };
  }, []);

  // Animate menu items when category changes
  useEffect(() => {
    menuRefs.current.forEach((menu) => {
      if (!menu) return;
      gsap.set(Array.from(menu.children), { opacity: 0, y: 16 });
    });

    const activeIndex = menuData.findIndex(c => c.id === activeCategory);
    const activeMenu = menuRefs.current[activeIndex];
    if (activeMenu) {
      gsap.to(Array.from(activeMenu.children), {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.07,
        ease: 'power2.out',
      });
    }

    moveIndicator(activeIndex);
  }, [activeCategory]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 bg-kaleo-charcoal"
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #F0E4CC 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-kaleo-terracotta">
            Sip & Savor
          </span>
          <h2 className="font-display text-kaleo-cream mt-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05 }}>
            Our Menu
          </h2>
          <p className="font-body text-sm text-kaleo-cream/50 mt-4 max-w-sm mx-auto leading-relaxed">
            Crafted with care, served with passion.
          </p>
        </div>

        {/* Tab bar with sliding underline indicator */}
        <div className="mb-14">
          <div ref={tabBarRef} className="relative flex gap-1 md:gap-0 overflow-x-auto pb-px scrollbar-hide">
            {/* Sliding indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-px bg-kaleo-terracotta pointer-events-none"
              style={{ width: 0, transform: 'translateX(0)' }}
            />

            {menuData.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2.5 px-5 md:px-8 py-3.5 whitespace-nowrap border-b transition-all duration-300 flex-1 justify-center ${
                    isActive
                      ? 'text-kaleo-cream border-transparent'
                      : 'text-kaleo-cream/35 border-kaleo-cream/8 hover:text-kaleo-cream/70'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-body text-[11px] uppercase tracking-[0.15em]">
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Full-width border */}
          <div className="h-px bg-kaleo-cream/8" />
        </div>

        {/* Menu items */}
        {menuData.map((category, catIdx) => (
          <div
            key={category.id}
            ref={(el) => { menuRefs.current[catIdx] = el; }}
            className={activeCategory === category.id ? 'block' : 'hidden'}
          >
            {category.items.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className="group flex items-start justify-between gap-6 py-6 border-b border-kaleo-cream/8 hover:border-kaleo-terracotta/30 transition-colors duration-300 cursor-default"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="font-display text-xl md:text-2xl text-kaleo-cream group-hover:text-kaleo-terracotta transition-colors duration-300">
                      {item.name}
                    </h4>
                    {item.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] uppercase tracking-wider border border-kaleo-terracotta/40 text-kaleo-terracotta rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-body text-[13px] text-kaleo-cream/40 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Dotted separator */}
                <div className="hidden md:block flex-1 border-b border-dashed border-kaleo-cream/10 mt-4 mx-4" />

                <span className="font-display text-xl text-kaleo-terracotta flex-shrink-0 mt-0.5">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        ))}

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-kaleo-cream/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] text-kaleo-cream/30 italic">
            * Prices subject to change. Please inform us of any allergies.
          </p>
          <div className="flex items-center gap-2">
            <Leaf className="w-3.5 h-3.5 text-kaleo-terracotta/60" />
            <span className="font-body text-[11px] text-kaleo-cream/40 uppercase tracking-[0.15em]">
              Vegan options available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeMenu;
