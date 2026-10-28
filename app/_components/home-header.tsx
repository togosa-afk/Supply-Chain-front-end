import type { Language, HomeContent } from "./home-content";
import { BrandMark } from "./home-icons";
import Link from "next/link";

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
  return (
    <header className="site-header page-width">
      <a className="brand" href="#top" aria-label="Supply Chain Monitor">
        <BrandMark />
        <span className="brand-name">
          Supply<span>Flow</span>
        </span>
      </a>

      <nav
        className="desktop-nav"
        aria-label={language === "ar" ? "التنقل الرئيسي" : "Main navigation"}
      >
        <a href="#how-it-works">{copy.nav[0]}</a>
        <a href="#features">{copy.nav[1]}</a>
        <a href="#about">{copy.nav[2]}</a>
      </nav>

      <div className="header-actions">
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
        <Link className="login-link" href={'/login'}>
          {copy.login}
        </Link>
      </div>
    </header>
  );
}
