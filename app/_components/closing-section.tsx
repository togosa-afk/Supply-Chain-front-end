import type { HomeContent, Language } from "./home-content";
import Link from "next/link";

type ClosingSectionProps = {
  copy: HomeContent;
  language: Language;
};

export default function ClosingSection({
  copy,
  language,
}: ClosingSectionProps) {
  return (
    <section className="closing-section page-width" id="get-started">
      <div className="closing-copy">
        <p className="ui-kicker">
          <span className="font-data">NEXT STEP / 01</span>
        </p>
        <h2>{copy.bottomTitle}</h2>
        <p>{copy.bottomText}</p>
      </div>
      <Link className="ui-button ui-button--secondary" href="/register">
        {copy.bottomCta}
        <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>
      </Link>
    </section>
  );
}
