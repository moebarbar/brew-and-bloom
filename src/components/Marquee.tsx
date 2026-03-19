const awards = [
  'Best Coffee Shop 2024 — Portland Magazine',
  'Top 10 Cafés — Eater PDX',
  "Editor's Pick — Coffee Lovers Quarterly",
  'Best Atmosphere — Willamette Week',
  'Sustainability Award — Green Portland 2024',
  'Local Fan Favorite — PDX Monthly',
  'Best Single Origin — NW Coffee Awards',
];

const Marquee = () => {
  // Duplicate for seamless loop
  const items = [...awards, ...awards];

  return (
    <div className="relative w-full py-4 bg-kaleo-earth overflow-hidden border-y border-kaleo-cream/5">
      <div className="animate-marquee flex items-center gap-0">
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-body text-[11px] text-kaleo-cream/60 uppercase tracking-[0.18em] px-8 whitespace-nowrap">
              {item}
            </span>
            <span className="text-kaleo-terracotta text-[8px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
