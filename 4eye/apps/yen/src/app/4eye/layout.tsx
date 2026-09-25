import { HudLayout } from "@4eye/web/app/(hud)/HudLayout";
import "./four-eye-shell.css";

/**
 * Server wrapper around the HUD. Re-exporting HudLayout as this file's
 * default made the whole /4eye segment a client layout, so the first
 * HTML for the product was yen's light paper until the HUD hydrated.
 * The shell paints void immediately; HudLayout still owns chrome.
 */
export default function FourEyeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="four-eye-shell">
      <HudLayout>{children}</HudLayout>
    </div>
  );
}
