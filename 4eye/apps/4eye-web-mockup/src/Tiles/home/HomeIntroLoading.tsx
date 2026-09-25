"use client";

import "./home-intro-loading.css";

/**
 * Neutral loading state while the intro gate resolves (before localStorage
 * is read post-hydration; see `useIntroGate`). Identical on the server and
 * the first client render so hydration matches.
 *
 * Yen hosts 4eye inside a light ThemeProvider. Reading
 * `theme.palette.background.default` here painted paper-white into the HUD
 * hole. The mark is locked to void + six-band so the gate does not flash
 * the host theme.
 *
 * The comet traces the compact Home swatch in the top-center location bar.
 */
const BUTTON_CENTER_Y_PX = 24;
const BUTTON_X_OFFSET_PX = 0;
const SVG = 46;
const RECT = 34;
const RECT_R = 9;
const STROKE = 2.5;
const PERIMETER = Math.round(2 * (RECT + RECT) - 8 * RECT_R + 2 * Math.PI * RECT_R);
const COMET = Math.round(PERIMETER * 0.28);

export function HomeIntroLoading() {
  const inset = (SVG - RECT) / 2;
  return (
    <>
      <div className="home-intro-loading-fill" />
      <div
        className="home-intro-loading-comet"
        role="status"
        aria-label="Loading home"
        style={{
          top: `${BUTTON_CENTER_Y_PX}px`,
          transform: `translate(calc(-50% + ${BUTTON_X_OFFSET_PX}px), -50%)`,
          width: SVG,
          height: SVG,
        }}
      >
        <svg viewBox={`0 0 ${SVG} ${SVG}`} aria-hidden="true">
          <rect
            x={inset}
            y={inset}
            width={RECT}
            height={RECT}
            rx={RECT_R}
            className="home-intro-loading-track"
            strokeWidth={STROKE}
          />
          <rect
            x={inset}
            y={inset}
            width={RECT}
            height={RECT}
            rx={RECT_R}
            className="home-intro-loading-head"
            strokeWidth={STROKE}
            strokeDasharray={`${COMET} ${PERIMETER - COMET}`}
            style={{ ["--home-intro-perimeter" as string]: `-${PERIMETER}` }}
          />
        </svg>
      </div>
    </>
  );
}
