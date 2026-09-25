"use client";

import { useEffect } from "react";
import "./status.css";

/*
  Replaces the root layout when that layout itself throws. `error.tsx` cannot
  cover this case — it sits inside the layout. Without this file a provider
  fault (theme, locale) is a blank document, which looks like the process
  never started.
*/

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <main className="status-page">
          <p className="status-code">Error</p>
          <h1 className="status-title">yen failed to render.</h1>
          <p className="status-body">
            This is a layout-level failure, not a single page. Try again; if it
            keeps happening the reference below is what to send.
          </p>
          <ul className="status-links">
            <li>
              <button type="button" onClick={reset} className="status-link status-link--primary">
                Try again
              </button>
            </li>
            <li>
              <a href="/" className="status-link">
                Home
              </a>
            </li>
          </ul>
          {error.digest && <p className="status-detail">Reference: {error.digest}</p>}
        </main>
      </body>
    </html>
  );
}
