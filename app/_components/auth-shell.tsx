import type { ReactNode } from "react";
import Link from "next/link";
import Brand from "./brand";
import ThemeToggle from "./theme-toggle";

export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
  alternate,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  alternate: ReactNode;
}) {
  return (
    <main className="auth-page" id="main-content" lang="en" dir="ltr">
      <div className="auth-frame">
        <header className="auth-header">
          <Brand />
          <div className="auth-header-actions">
            <Link className="auth-back-link" href="/">
              <span aria-hidden="true">←</span> Back to home
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <div className="auth-layout">
          <section aria-labelledby="auth-intro-title" className="auth-intro">
            <p className="ui-kicker">
              <span aria-hidden="true" className="status-dot" />
              {eyebrow}
            </p>
            <h1 id="auth-intro-title">{title}</h1>
            <p className="auth-intro-copy">{description}</p>
            <div className="auth-visual" aria-hidden="true">
              <span className="auth-visual-cross auth-visual-cross--one" />
              <span className="auth-visual-cross auth-visual-cross--two" />
              <div className="auth-route">
                <span className="auth-route-node" />
                <span className="auth-route-line" />
                <span className="auth-route-node" />
              </div>
              <span className="auth-visual-label">NETWORK / 01</span>
            </div>
            <div className="auth-points">
              <span>01 / Connected partners</span>
              <span>02 / Clear shipment flow</span>
              <span>03 / One shared network</span>
            </div>
          </section>

          <section aria-labelledby="auth-form-title" className="auth-card">
            <div className="auth-card-heading">
              <span className="ui-kicker">ACCOUNT ACCESS</span>
              <h2 id="auth-form-title">{eyebrow}</h2>
            </div>
            {children}
            <div className="auth-alternate">{alternate}</div>
          </section>
        </div>

        <footer className="auth-footer">
          <span>SUPPLYFLOW / CONNECTED COMMERCE</span>
          <span>© 2026 SupplyFlow</span>
        </footer>
      </div>
    </main>
  );
}
