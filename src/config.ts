// Site-wide configuration
export interface SiteConfig {
  language: string;
  siteName: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteName: "Brew & Bloom",
  siteDescription: "Artisan coffee shop serving ethically sourced, freshly roasted coffee in a warm, welcoming atmosphere.",
};

// Hero Section
export interface HeroConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  subtitle: string;
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.jpg",
  backgroundAlt: "Warm coffee shop interior with natural light",
  title: "Brew & Bloom",
  subtitle: "WHERE EVERY CUP TELLS A STORY",
};

// Narrative Text Section
export interface NarrativeTextConfig {
  line1: string;
  line2: string;
  line3: string;
}

export const narrativeTextConfig: NarrativeTextConfig = {
  line1: "Crafted with passion, served with love",
  line2: "From bean to cup, we honor every step of the journey",
  line3: "SINCE 2015, WE HAVE BEEN DEDICATED TO SOURCING THE FINEST ETHICALLY-GROWN COFFEE BEANS FROM SMALL-SCALE FARMERS AROUND THE WORLD. OUR MASTER ROASTERS BRING OUT THE UNIQUE CHARACTER OF EACH ORIGIN, CREATING EXCEPTIONAL COFFEE EXPERIENCES THAT WARM THE SOUL AND INSPIRE CONNECTION.",
};

// ZigZag Grid Section
export interface ZigZagGridItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse: boolean;
}

export interface ZigZagGridConfig {
  sectionLabel: string;
  sectionTitle: string;
  items: ZigZagGridItem[];
}

export const zigZagGridConfig: ZigZagGridConfig = {
  sectionLabel: "OUR STORY",
  sectionTitle: "The Art of Coffee",
  items: [
    {
      id: "craft",
      title: "Masterful Craftsmanship",
      subtitle: "THE PERFECT POUR",
      description: "Our skilled baristas train for months to perfect the art of espresso extraction and milk steaming. Every latte, cappuccino, and pour-over is crafted with precision and care, ensuring that each cup meets our exacting standards of excellence.",
      image: "/grid-barista.jpg",
      imageAlt: "Barista pouring latte art",
      reverse: false,
    },
    {
      id: "space",
      title: "A Space to Breathe",
      subtitle: "YOUR SECOND HOME",
      description: "Step into our thoughtfully designed space where comfort meets aesthetics. Whether you're seeking a quiet corner for focused work, a cozy nook for intimate conversations, or a communal table to meet fellow coffee lovers, Brew & Bloom offers the perfect atmosphere for every moment.",
      image: "/grid-cozy.jpg",
      imageAlt: "Cozy coffee shop corner with armchair",
      reverse: true,
    },
    {
      id: "origin",
      title: "From Farm to Cup",
      subtitle: "ETHICALLY SOURCED",
      description: "We partner directly with small-scale farmers in Ethiopia, Colombia, Guatemala, and Sumatra who share our commitment to quality and sustainability. By paying fair prices and investing in their communities, we ensure that every bean we roast contributes to a better future for coffee-growing regions.",
      image: "/grid-plantation.jpg",
      imageAlt: "Coffee plantation at sunrise",
      reverse: false,
    },
  ],
};

// Breath Section
export interface BreathSectionConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  subtitle: string;
  description: string;
}

export const breathSectionConfig: BreathSectionConfig = {
  backgroundImage: "/breath-bg.jpg",
  backgroundAlt: "Coffee shop exterior at dusk",
  title: "Find Your Moment",
  subtitle: "PAUSE. BREATHE. SIP.",
  description: "In the heart of the city, we offer a sanctuary where time slows down. Let the aroma of freshly roasted coffee transport you to a place of calm and contentment. Here, every visit is an opportunity to reconnect with yourself and others over something truly special.",
};

// Card Stack Section
export interface CardStackItem {
  id: number;
  image: string;
  title: string;
  description: string;
  rotation: number;
}

export interface CardStackConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  cards: CardStackItem[];
}

export const cardStackConfig: CardStackConfig = {
  sectionTitle: "Our Signature Offerings",
  sectionSubtitle: "CURATED FOR YOU",
  cards: [
    {
      id: 1,
      image: "/card-latte.jpg",
      title: "Artisan Lattes",
      description: "Silky steamed milk meets perfectly extracted espresso, finished with beautiful latte art that makes every cup a masterpiece.",
      rotation: -2,
    },
    {
      id: 2,
      image: "/card-pastry.jpg",
      title: "Fresh Pastries",
      description: "Handcrafted daily by our in-house baker, our croissants, muffins, and scones are the perfect companions to your favorite brew.",
      rotation: 1,
    },
    {
      id: 3,
      image: "/card-beans.jpg",
      title: "Single Origin Beans",
      description: "Take the Brew & Bloom experience home with our selection of freshly roasted single-origin beans, available for purchase in-store.",
      rotation: -1,
    },
  ],
};

// Footer Section
export interface FooterContactItem {
  type: "email" | "phone";
  label: string;
  value: string;
  href: string;
}

export interface FooterSocialItem {
  platform: string;
  href: string;
}

export interface FooterConfig {
  heading: string;
  description: string;
  ctaText: string;
  contact: FooterContactItem[];
  locationLabel: string;
  address: string[];
  socialLabel: string;
  socials: FooterSocialItem[];
  logoText: string;
  copyright: string;
  links: { label: string; href: string }[];
}

export const footerConfig: FooterConfig = {
  heading: "Come Say Hello",
  description: "We'd love to welcome you to Brew & Bloom. Stop by for your morning ritual, an afternoon pick-me-up, or an evening wind-down. Great coffee and warm conversation await.",
  ctaText: "Get Directions",
  contact: [
    {
      type: "email",
      label: "hello@brewandbloom.com",
      value: "hello@brewandbloom.com",
      href: "mailto:hello@brewandbloom.com",
    },
    {
      type: "phone",
      label: "(555) 234-5678",
      value: "+15552345678",
      href: "tel:+15552345678",
    },
  ],
  locationLabel: "Location",
  address: ["123 Artisan Avenue", "Portland, OR 97201"],
  socialLabel: "Follow Us",
  socials: [
    {
      platform: "instagram",
      href: "https://instagram.com/brewandbloom",
    },
    {
      platform: "facebook",
      href: "https://facebook.com/brewandbloom",
    },
  ],
  logoText: "Brew & Bloom",
  copyright: "© 2026 Brew & Bloom Coffee. All rights reserved.",
  links: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};
