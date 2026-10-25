import type { HomeContent, Language } from "./home-content";

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
      <div className="closing-pattern" aria-hidden="true" />
      <span className="closing-flower" aria-hidden="true">
        ✳
      </span>
      <div className="closing-copy">
        <h2>{copy.bottomTitle}</h2>
        <p>{copy.bottomText}</p>
      </div>
      <a className="button button-light" href="#top">
        {copy.bottomCta}
        <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>
      </a>
    </section>
  );
}
