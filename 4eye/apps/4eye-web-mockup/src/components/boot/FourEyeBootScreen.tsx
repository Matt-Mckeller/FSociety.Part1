import "./four-eye-boot.css";

/**
 * Nested 4eye identity as a loading mark: aura diamonds, white plate,
 * cyan perception ring, orange limit triangle. CSS + SVG only — a
 * loading.tsx that imported MUI had to compile the material barrel
 * before it could admit the page was still loading.
 */
export function FourEyeBootScreen({
  fill = false,
  label = "Loading 4eye",
}: {
  fill?: boolean;
  label?: string;
}) {
  const className = fill
    ? "four-eye-boot four-eye-boot--fill"
    : "four-eye-boot four-eye-boot--tile";

  return (
    <div className={className} role="status" aria-label={label}>
      <svg
        className="four-eye-boot-mark"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <rect
          x="22"
          y="22"
          width="56"
          height="56"
          rx="2"
          fill="none"
          stroke="var(--layer-aura)"
          strokeWidth="1.2"
          transform="rotate(45 50 50)"
        />
        <rect
          x="28"
          y="28"
          width="44"
          height="44"
          rx="2"
          fill="none"
          stroke="var(--layer-aura)"
          strokeWidth="1"
        />
        <circle cx="50" cy="50" r="18" fill="var(--layer-plate)" />
        <circle
          className="four-eye-boot-ring"
          cx="50"
          cy="50"
          r="11"
          fill="none"
          stroke="var(--layer-band)"
          strokeWidth="1.4"
          strokeDasharray="18 51"
          strokeLinecap="round"
        />
        <polygon
          points="50,42 56.2,54 43.8,54"
          fill="var(--layer-pupil)"
        />
      </svg>
      <p className="four-eye-boot-label">{label}</p>
    </div>
  );
}
