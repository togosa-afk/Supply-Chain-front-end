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
    <div className="site-shell" lang={language} dir={copy.direction}>
      <a className="skip-link" href="#main-content">
        {language === "ar" ? "تجاوز إلى المحتوى" : "Skip to content"}
      </a>
      <div className="hero-shell">
        <HomeHeader
          language={language}
          copy={copy}
          onLanguageChange={toggleLanguage}
        />
      </div>
      <main className="landing" id="main-content">
        <HeroSection copy={copy} language={language} />
        <FeaturesSection copy={copy} />
        <ClosingSection copy={copy} language={language} />
      </main>
      <SiteFooter copy={copy} language={language} />
    </div>
  );
}
