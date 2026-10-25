"use client";

import { useState } from "react";
import ClosingSection from "./closing-section";
import { homeContent, type Language } from "./home-content";
import FeaturesSection from "./features-section";
import HeroSection from "./hero-section";
import HomeHeader from "./home-header";
import SiteFooter from "./site-footer";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("ar");
  const copy = homeContent[language];

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === "ar" ? "en" : "ar"));
  }

  return (
    <main className="landing" lang={language} dir={copy.direction}>
      <div className="hero-shell">
        <HomeHeader
          language={language}
          copy={copy}
          onLanguageChange={toggleLanguage}
        />
        <HeroSection copy={copy} language={language} />
        <div className="hero-bottom-glow" />
      </div>

      <FeaturesSection copy={copy} />
      <ClosingSection copy={copy} language={language} />
      <SiteFooter copy={copy} language={language} />
    </main>
  );
}
