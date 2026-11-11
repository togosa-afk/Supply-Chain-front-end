import type { HomeContent, Language } from "./home-content";
import Brand from "./brand";

type SiteFooterProps = {
  copy: HomeContent;
  language: Language;
};

export default function SiteFooter({ copy, language }: SiteFooterProps) {
  return (
    <footer className="site-footer page-width" id="about">
      <Brand />
      <p>
        <span className="font-data">© 2026</span> SupplyFlow. {copy.footer}
      </p>
      <span className="footer-note">
        {language === "ar" ? "معًا، لكل خطوة." : "Together, every step."}
      </span>
    </footer>
  );
}
