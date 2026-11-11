import type { HomeContent } from "./home-content";
import { FeatureIcon } from "./home-icons";

export default function FeaturesSection({ copy }: { copy: HomeContent }) {
  return (
    <section className="features-section page-width" id="features">
      <header className="section-heading">
        <p className="ui-kicker">
          <span className="font-data">ROLES / 04</span>
          <span aria-hidden="true" className="section-rule" />
          {copy.sectionEyebrow}
        </p>
        <h2>{copy.sectionTitle}</h2>
        <p className="section-description">{copy.sectionText}</p>
      </header>

      <div className="feature-grid" role="list">
        {copy.features.map((feature) => (
          <article className="feature-card ui-panel" key={feature.number} role="listitem">
            <div className="feature-card-meta">
              <span className="feature-icon" aria-hidden="true">
                <FeatureIcon name={feature.icon} />
              </span>
              <span className="feature-number font-data">
                / {feature.number}
              </span>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
