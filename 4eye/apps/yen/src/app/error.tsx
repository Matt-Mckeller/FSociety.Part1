"use client";

import { useEffect } from "react";
import "./status.css";

/*
  Route-level error boundary. Without one, a thrown render error shows the Next
  default overlay in development and a blank page in production — the worst
  possible outcome on a site being published for feedback, because the visitor
  cannot tell a broken page from a broken site.

  `digest` is the only error detail Next exposes in production builds; the
  message is stripped server-side. Showing it is what makes a bug report useful.
*/

export default function Error({
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
    <main className="status-page">
      <p className="status-code">Error</p>
      <h1 className="status-title">Something broke on this page.</h1>
      <p className="status-body">
        The rest of the site is probably fine — try again, or head back home. If it keeps
        happening, the reference below identifies this particular failure and is worth
        including if you tell me about it.
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
        <li>
          <a href="/docs" className="status-link">
            Documentation
          </a>
        </li>
      </ul>
      {error.digest && <p className="status-detail">Reference: {error.digest}</p>}
    </main>
  );
}
