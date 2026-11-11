import Link from "next/link";

export default function Brand({
  href = "/",
  compact = false,
}: {
  href?: string;
  compact?: boolean;
}) {
  return (
    <Link
      aria-label="SupplyFlow home"
      className={`ui-brand${compact ? " ui-brand--compact" : ""}`}
      href={href}
    >
      <span className="ui-brand-mark" aria-hidden="true">
        <svg fill="none" viewBox="0 0 32 32">
          <path
            d="M5 10 16 4l11 6v12l-11 6L5 22V10Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="m5.5 10.4 10.5 6 10.5-6M16 16.4v11"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </span>
      {!compact && (
        <span className="ui-brand-word" translate="no">
          SupplyFlow
        </span>
      )}
    </Link>
  );
}
