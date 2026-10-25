import type { CSSProperties } from "react";
import type { HomeContent } from "./home-content";
import { FeatureIcon } from "./home-icons";

export default function FeaturesSection({ copy }: { copy: HomeContent }) {
  return (
    <section className="features-section page-width" id="features">
      <div className="section-heading">
        <span className="section-eyebrow">{copy.sectionEyebrow}</span>
        <h2>{copy.sectionTitle}</h2>
        <p>{copy.sectionText}</p>
      </div>

      <div className="feature-grid">
        {copy.features.map((feature, index) => (
          <article
            className="feature-card"
            key={feature.number}
            style={{ "--card-index": index } as CSSProperties}
          >
            <div className="feature-card-top">
              <span className="feature-icon">
                <FeatureIcon name={feature.icon} />
              </span>
              <span className="feature-number">{feature.number}</span>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
            <span className="feature-arrow" aria-hidden="true">
              ↗
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
