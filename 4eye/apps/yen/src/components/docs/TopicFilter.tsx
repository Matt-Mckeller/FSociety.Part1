"use client";

/**
 * The subject rail.
 *
 * Filtering happens in CSS rather than in React. There are 517 cards on this
 * page and they are rendered on the server; hoisting them into client state to
 * hide some would ship the whole index to the browser and re-render all of it
 * on every chip press. Instead each card carries its subjects as a
 * space-separated attribute, and this writes one rule that hides the rest.
 *
 * `:has()` does the second half: a collection with nothing left showing is
 * hidden too, so the page does not fill with empty headings.
 *
 * Topic slugs, not labels, because `~=` matches whitespace-separated tokens and
 * three of the subjects have spaces in them.
 */

import * as React from "react";

import { topicSlug, type TopicCount } from "./topics";

export function TopicFilter({ topics }: { topics: TopicCount[] }) {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <div className="docs-topics">
      {active && (
        <style>{`
          .docs-card:not([data-topics~="${topicSlug(active)}"]) { display: none; }
          .docs-collection:not(:has(.docs-card[data-topics~="${topicSlug(active)}"])) { display: none; }
        `}</style>
      )}

      <span className="docs-topics-label">Subject</span>

      <button
        type="button"
        className={`docs-topic${active === null ? " on" : ""}`}
        onClick={() => setActive(null)}
        aria-pressed={active === null}
      >
        All
      </button>

      {topics.map(({ topic, count }) => (
        <button
          key={topic}
          type="button"
          className={`docs-topic${active === topic ? " on" : ""}`}
          onClick={() => setActive(active === topic ? null : topic)}
          aria-pressed={active === topic}
        >
          {topic}
          <span className="docs-topic-count">{count}</span>
        </button>
      ))}
    </div>
  );
}
