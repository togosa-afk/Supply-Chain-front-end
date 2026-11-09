import Link from "next/link";
import { useState } from "react";
import Brand from "./brand";
import type { Language, HomeContent } from "./home-content";
import ThemeToggle from "./theme-toggle";

type HomeHeaderProps = {
  language: Language;
  copy: HomeContent;
  onLanguageChange: () => void;
};

export default function HomeHeader({
  language,
  copy,
  onLanguageChange,
}: HomeHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner page-width">
        <Brand />

        <button
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen
              ? language === "ar"
                ? "إغلاق القائمة"
                : "Close menu"
              : language === "ar"
                ? "فتح القائمة"
                : "Open menu"
          }
          className="menu-toggle"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <span aria-hidden="true">{isMenuOpen ? "×" : "☰"}</span>
        </button>

        <nav
          aria-label={language === "ar" ? "التنقل الرئيسي" : "Main navigation"}
          className={`site-nav${isMenuOpen ? " site-nav--open" : ""}`}
          id="primary-navigation"
        >
          <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
            {copy.nav[0]}
          </a>
          <a href="#features" onClick={() => setIsMenuOpen(false)}>
            {copy.nav[1]}
          </a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>
            {copy.nav[2]}
          </a>
        </nav>

        <div className="site-actions">
          <button
            className="language-toggle"
            type="button"
            onClick={onLanguageChange}
            aria-label={
              language === "ar" ? "Switch to English" : "التبديل إلى العربية"
            }
          >
            <span aria-hidden="true">文</span>
            {language === "ar" ? "English" : "العربية"}
          </button>
          <ThemeToggle />
          <Link className="ui-button ui-button--secondary ui-button--small" href="/login">
            {copy.login}
          </Link>
          <Link className="ui-button ui-button--primary ui-button--small header-cta" href="/register">
            {language === "ar" ? "إنشاء حساب" : "Create account"}
          </Link>
        </div>
      </div>
    </header>
  );
}
