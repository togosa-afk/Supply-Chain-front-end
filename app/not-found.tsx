import Link from "next/link";
import Brand from "./_components/brand";
import ThemeToggle from "./_components/theme-toggle";

export default function NotFound() {
  return (
    <main className="empty-page" id="main-content">
      <header className="empty-header">
        <Brand />
        <ThemeToggle />
      </header>
      <section className="empty-panel ui-panel">
        <p className="ui-kicker">
          <span className="font-data">ERROR / 404</span>
        </p>
        <h1>Page not found</h1>
        <p>The address may be outdated, or the page may have moved.</p>
        <Link className="ui-button ui-button--primary" href="/">
          Return home
        </Link>
      </section>
    </main>
  );
}
