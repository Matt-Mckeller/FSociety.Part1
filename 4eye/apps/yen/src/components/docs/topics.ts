/**
 * Shared between the server-rendered cards and the client-side filter.
 *
 * Its own module, and deliberately not `"use client"`. A function exported from
 * a client module is a *client reference* on the server — an object, not
 * something callable — so importing this from `TopicFilter` produced
 * "object is not a function" the moment a card tried to slugify its subjects.
 * Anything both sides call has to live outside the boundary.
 */

/** Subjects contain spaces; CSS `~=` matches whitespace-separated tokens. */
export const topicSlug = (topic: string) => topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export interface TopicCount {
  topic: string;
  count: number;
}
