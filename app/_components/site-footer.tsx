import type { HomeContent, Language } from "./home-content";
import { BrandMark } from "./home-icons";

type SiteFooterProps = {
  copy: HomeContent;
  language: Language;
};

export default function SiteFooter({ copy, language }: SiteFooterProps) {
  return (
    <footer className="site-footer page-width" id="about">
      <a className="brand footer-brand" href="#top">
        <BrandMark />
        <span className="brand-name">
          Supply<span>Flow</span>
        </span>
      </a>
      <p>© 2026 SupplyFlow. {copy.footer}</p>
      <span className="footer-note">
        {language === "ar" ? "معًا، لكل خطوة." : "Together, every step."}
      </span>
    </footer>
  );
}
