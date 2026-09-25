import "./yen-boot.css";

export function YenBootScreen({
  fill = true,
  label = "Loading yen",
}: {
  fill?: boolean;
  label?: string;
}) {
  return (
    <div
      className={fill ? "yen-boot yen-boot--fill" : "yen-boot"}
      role="status"
      aria-label={label}
    >
      <p className="yen-boot-word">yen</p>
      <div className="yen-boot-track" aria-hidden="true">
        <span className="yen-boot-bar" />
      </div>
      <p className="yen-boot-note">{label}</p>
    </div>
  );
}
