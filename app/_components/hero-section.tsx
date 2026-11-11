import type { HomeContent, Language } from "./home-content";
import Link from "next/link";

type HeroSectionProps = {
  copy: HomeContent;
  language: Language;
};

export default function HeroSection({ copy, language }: HeroSectionProps) {
  return (
    <section className="hero-section page-width" id="top">
      <div className="hero-copy">
        <p className="ui-kicker hero-kicker">
          <span aria-hidden="true" className="status-dot" />
          {copy.heroEyebrow}
        </p>
        <h1 className="hero-title">
          {copy.heroTitle} <span>{copy.heroAccent}</span>
        </h1>
        <p className="hero-description">{copy.heroText}</p>
        <div className="hero-actions">
          <Link className="ui-button ui-button--primary" href="/register">
            {copy.primaryCta}
            <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>
          </Link>
          <a className="ui-button ui-button--secondary" href="#how-it-works">
            {copy.secondaryCta}
          </a>
        </div>
        <p className="hero-note">
          <span className="font-data">NETWORK / 01</span>
          <span>{copy.socialProof}</span>
        </p>
      </div>

      <section
        aria-labelledby="network-panel-title"
        className="network-panel ui-panel"
        id="how-it-works"
      >
        <header className="network-panel-header">
          <div>
            <p className="ui-kicker">
              <span className="font-data">SUPPLYFLOW / ROUTE</span>
            </p>
            <h2 id="network-panel-title">{copy.cardTitle}</h2>
          </div>
          <span className="network-index font-data">01—04</span>
        </header>

        <div className="network-journey">
          <div className="network-role">
            <span className="network-role-marker" aria-hidden="true">
              01
            </span>
            <span>{copy.roles[0]}</span>
          </div>
          <span className="network-connector" aria-hidden="true" />
          <div className="network-role">
            <span className="network-role-marker" aria-hidden="true">
              02
            </span>
            <span>{copy.roles[1]}</span>
          </div>
          <span className="network-connector" aria-hidden="true" />
          <div className="network-role">
            <span className="network-role-marker" aria-hidden="true">
              03
            </span>
            <span>{copy.roles[2]}</span>
          </div>
          <span className="network-connector" aria-hidden="true" />
          <div className="network-role">
            <span className="network-role-marker network-role-marker--accent" aria-hidden="true">
              04
            </span>
            <span>{copy.roles[3]}</span>
          </div>
        </div>

        <div className="network-order">
          <div className="network-order-heading">
            <span className="ui-kicker">{copy.cardStatus}</span>
            <span className="network-order-id font-data">{copy.cardNumber}</span>
          </div>
          <div className="network-order-status">
            <span className="network-status-indicator" aria-hidden="true">
              ✓
            </span>
            <span>{copy.cardArrival}</span>
            <time className="font-data">{copy.cardDate}</time>
          </div>
        </div>
        <span className="network-cross network-cross--top" aria-hidden="true" />
        <span className="network-cross network-cross--bottom" aria-hidden="true" />
      </section>
    </section>
  );
}
