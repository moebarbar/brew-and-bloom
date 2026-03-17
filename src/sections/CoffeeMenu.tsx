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
      { name: 'Seasonal Muffin', description: 'Ask about today\'s flavor', price: '$4.00' },
    ],
  },
];

const CoffeeMenu = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('espresso');
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    menuRefs.current.forEach((menu) => {
      if (!menu) return;
      gsap.set(menu.children, { opacity: 0, x: -20 });
    });

    const activeMenu = menuRefs.current.find(
      (_, index) => menuData[index].id === activeCategory
    );

    if (activeMenu) {
      gsap.to(activeMenu.children, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
      });
    }
  }, [activeCategory]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-kaleo-charcoal"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #EAE4D9 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-kaleo-terracotta">
            Sip & Savor
          </span>
          <h2 className="font-display text-headline text-kaleo-cream mt-4">
            Our Menu
          </h2>
          <p className="font-body text-sm text-kaleo-cream/60 mt-4 max-w-md mx-auto">
            Crafted with care, served with passion. Every item is made with the finest ingredients.
          </p>
        </div>

        {/* Menu Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Category Navigation - Left Side */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-3">
              {menuData.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                      isActive
                        ? 'bg-kaleo-terracotta text-kaleo-cream'
                        : 'bg-kaleo-earth/50 text-kaleo-cream/70 hover:bg-kaleo-earth hover:text-kaleo-cream'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-body text-sm uppercase tracking-wider">
                      {category.title}
                    </span>
                  </button>
                );
              })}

              {/* Decorative element */}
              <div className="hidden lg:block mt-8 p-6 rounded-xl bg-kaleo-earth/30 border border-kaleo-terracotta/20">
                <p className="font-body text-xs text-kaleo-cream/50 italic">
                  "All our coffee beans are ethically sourced and roasted in small batches for maximum freshness."
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items - Right Side */}
          <div className="lg:col-span-8">
            {menuData.map((category, categoryIndex) => (
              <div
                key={category.id}
                ref={(el) => { menuRefs.current[categoryIndex] = el; }}
                className={`space-y-6 ${activeCategory === category.id ? 'block' : 'hidden'}`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-kaleo-cream/10">
                  <category.icon className="w-6 h-6 text-kaleo-terracotta" />
                  <h3 className="font-display text-2xl text-kaleo-cream">
                    {category.title}
                  </h3>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="group p-5 rounded-xl bg-kaleo-earth/30 border border-kaleo-cream/5 hover:border-kaleo-terracotta/30 transition-all duration-300 hover:bg-kaleo-earth/50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-display text-lg text-kaleo-cream group-hover:text-kaleo-terracotta transition-colors">
                              {item.name}
                            </h4>
                            {item.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-kaleo-terracotta/20 text-kaleo-terracotta rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="font-body text-xs text-kaleo-cream/50 mt-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <span className="font-display text-lg text-kaleo-terracotta flex-shrink-0">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="font-body text-xs text-kaleo-cream/40">
            * All prices subject to change. Please inform us of any allergies or dietary restrictions.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Leaf className="w-4 h-4 text-kaleo-terracotta" />
            <span className="font-body text-xs text-kaleo-cream/50">
              Vegan options available upon request
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeMenu;
