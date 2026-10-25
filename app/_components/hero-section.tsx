import type { HomeContent, Language } from "./home-content";
import { FeatureIcon } from "./home-icons";

type HeroSectionProps = {
  copy: HomeContent;
  language: Language;
};

export default function HeroSection({ copy, language }: HeroSectionProps) {
  return (
    <section className="hero page-width" id="top">
      <div className="hero-copy">
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          {copy.heroEyebrow}
        </span>
        <h1>
          {copy.heroTitle} <span>{copy.heroAccent}</span>
        </h1>
        <p className="hero-description">{copy.heroText}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#get-started">
            {copy.primaryCta}
            <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>
          </a>
          <a className="button button-quiet" href="#how-it-works">
            <span className="play-icon" aria-hidden="true">
              ▶
            </span>
            {copy.secondaryCta}
          </a>
        </div>
        <div className="social-proof">
          <div className="avatar-stack" aria-hidden="true">
            <span>م</span>
            <span>ت</span>
            <span>ش</span>
            <span>س</span>
          </div>
          <span>{copy.socialProof}</span>
        </div>
      </div>

      <div
        className="hero-art"
        id="how-it-works"
        aria-label={copy.cardTitle}
      >
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="art-spark spark-one" aria-hidden="true">
          ✦
        </div>
        <div className="art-spark spark-two" aria-hidden="true">
          ✳
        </div>
        <div className="delivery-card">
          <div className="delivery-card-head">
            <div>
              <span className="card-kicker">{copy.cardTitle}</span>
              <strong>{copy.cardNumber}</strong>
            </div>
            <span className="card-menu" aria-hidden="true">
              •••
            </span>
          </div>
          <div className="route-map">
            <div className="route-line" />
            <span className="route-pin pin-start">
              <span />
            </span>
            <span className="route-pin pin-end">
              <span />
            </span>
            <div className="route-label label-start">{copy.roles[0]}</div>
            <div className="route-label label-end">{copy.roles[3]}</div>
            <div className="route-van" aria-hidden="true">
              <FeatureIcon name="truck" />
            </div>
          </div>
          <div className="delivery-status">
            <div className="status-icon" aria-hidden="true">
              ✓
            </div>
            <div className="status-copy">
              <strong>{copy.cardStatus}</strong>
              <span>{copy.cardArrival}</span>
            </div>
            <strong className="arrival-time">{copy.cardDate}</strong>
          </div>
        </div>
        <div className="floating-note note-top">
          <span className="note-icon supplier-icon" aria-hidden="true">
            ↗
          </span>
          <span>
            <strong>{copy.roles[1]}</strong>
            <small>Connected</small>
          </span>
          <span className="online-dot" />
        </div>
        <div className="floating-note note-bottom">
          <span className="note-icon shopper-icon" aria-hidden="true">
            ✳
          </span>
          <span>
            <strong>{copy.roles[2]}</strong>
            <small>On schedule</small>
          </span>
          <span className="online-dot" />
        </div>
      </div>
    </section>
  );
}
