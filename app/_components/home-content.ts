export type Language = "ar" | "en";
export type FeatureIconName = "store" | "box" | "truck" | "bag";

export type HomeFeature = {
  number: string;
  title: string;
  text: string;
  icon: FeatureIconName;
};

export type HomeContent = {
  nav: [string, string, string];
  login: string;
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroText: string;
  primaryCta: string;
  secondaryCta: string;
  socialProof: string;
  cardTitle: string;
  cardStatus: string;
  cardNumber: string;
  cardArrival: string;
  cardDate: string;
  roles: [string, string, string, string];
  sectionEyebrow: string;
  sectionTitle: string;
  sectionText: string;
  features: HomeFeature[];
  bottomTitle: string;
  bottomText: string;
  bottomCta: string;
  footer: string;
  direction: "rtl" | "ltr";
};

export const homeContent: Record<Language, HomeContent> = {
  ar: {
    nav: ["كيف تعمل", "مميزاتنا", "عن المنصة"],
    login: "تسجيل الدخول",
    heroEyebrow: "سلسلة توريد أذكى، من مكان واحد",
    heroTitle: "كل ما تحتاجه تجارتك،",
    heroAccent: "في مكان واحد.",
    heroText:
      "من التاجر إلى المورد، ومن شركة النقل إلى المتسوق — نربط الجميع بتجربة أسهل وأسرع.",
    primaryCta: "ابدأ رحلتك",
    secondaryCta: "اكتشف كيف تعمل",
    socialProof: "كل أطراف تجارتك، على نفس المسار",
    cardTitle: "رحلتك التجارية",
    cardStatus: "الشحنة في الطريق",
    cardNumber: "طلب #SC-2048",
    cardArrival: "الوصول المتوقع",
    cardDate: "اليوم، ٤:٣٠ م",
    roles: ["المتجر", "المورد", "النقل", "المتسوق"],
    sectionEyebrow: "منظومة واحدة، فرص أكثر",
    sectionTitle: "تجارة مترابطة من أول خطوة لآخر ميل",
    sectionText:
      "ودّع تشتت العمليات. مكان واحد يجمع الأشخاص والخدمات التي تحرّك تجارتك كل يوم.",
    features: [
      {
        number: "01",
        title: "للتجار",
        text: "اعرض منتجاتك، أدر طلباتك، ووصل لعملاء جدد بكل سهولة.",
        icon: "store",
      },
      {
        number: "02",
        title: "للموردين",
        text: "وسّع شبكة توزيعك وتواصل مع التجار الباحثين عن منتجاتك.",
        icon: "box",
      },
      {
        number: "03",
        title: "لشركات النقل",
        text: "استقبل طلبات التوصيل وتابع الشحنات من الاستلام حتى التسليم.",
        icon: "truck",
      },
      {
        number: "04",
        title: "للمتسوقين",
        text: "اكتشف منتجات متنوعة، اطلب بثقة، وتابع مشترياتك لحظة بلحظة.",
        icon: "bag",
      },
    ],
    bottomTitle: "تجارتك تستحق أن تكون أبسط.",
    bottomText: "ابدأ اليوم، وخلي كل خطوة في مكانها الصحيح.",
    bottomCta: "اكتشف المنصة",
    footer: "كل الحقوق محفوظة.",
    direction: "rtl",
  },
  en: {
    nav: ["How it works", "Why us", "About"],
    login: "Log in",
    heroEyebrow: "A smarter supply chain, all in one place",
    heroTitle: "Everything your business needs,",
    heroAccent: "in one place.",
    heroText:
      "From merchants and suppliers to delivery partners and shoppers — bringing everyone together for a smoother way to trade.",
    primaryCta: "Get started",
    secondaryCta: "See how it works",
    socialProof: "Every part of your business, moving together",
    cardTitle: "Your order journey",
    cardStatus: "On its way",
    cardNumber: "Order #SC-2048",
    cardArrival: "Estimated arrival",
    cardDate: "Today, 4:30 PM",
    roles: ["Store", "Supplier", "Delivery", "Shopper"],
    sectionEyebrow: "One ecosystem. More opportunity.",
    sectionTitle: "Connected commerce, from first click to last mile",
    sectionText:
      "Leave scattered processes behind. One place for the people and services that move your business forward.",
    features: [
      {
        number: "01",
        title: "For merchants",
        text: "Showcase your products, manage orders, and reach new customers with ease.",
        icon: "store",
      },
      {
        number: "02",
        title: "For suppliers",
        text: "Grow your distribution network and connect with merchants looking for your products.",
        icon: "box",
      },
      {
        number: "03",
        title: "For delivery partners",
        text: "Receive delivery requests and follow every shipment from pickup to drop-off.",
        icon: "truck",
      },
      {
        number: "04",
        title: "For shoppers",
        text: "Explore more, shop with confidence, and follow every order in real time.",
        icon: "bag",
      },
    ],
    bottomTitle: "Your business deserves simpler.",
    bottomText: "Start today, and bring every step together.",
    bottomCta: "Explore the platform",
    footer: "All rights reserved.",
    direction: "ltr",
  },
};
