import type { FeatureIconName } from "./home-content";

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <path
          d="M8 12.5 20 6l12 6.5v14L20 33 8 26.5v-14Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="m8.5 12.8 11.5 6.5 11.5-6.5M20 19.5V32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="m15 9 12 6.5v4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function FeatureIcon({ name }: { name: FeatureIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...common}>
      {name === "store" && (
        <>
          <path d="M5 13h22l-2-7H7l-2 7Z" />
          <path d="M7 13v13h18V13M12 26v-8h8v8" />
          <path d="M5 13a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
        </>
      )}
      {name === "box" && (
        <>
          <path d="m16 4 11 6v12l-11 6-11-6V10l11-6Z" />
          <path d="m5.5 10.5 10.5 6 10.5-6M16 17v11M11 7l11 6" />
        </>
      )}
      {name === "truck" && (
        <>
          <path d="M3 8h16v14H3zM19 13h6l4 5v4h-10z" />
          <circle cx="9" cy="23" r="2.5" />
          <circle cx="24" cy="23" r="2.5" />
          <path d="M23 13v5h6" />
        </>
      )}
      {name === "bag" && (
        <>
          <path d="M6 11h20l-1.5 16h-17L6 11Z" />
          <path d="M12 12V9a4 4 0 0 1 8 0v3" />
        </>
      )}
    </svg>
  );
}
