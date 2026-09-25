/**
 * One switch for planner-only annotations.
 *
 * Parts of the character model — relationship notes, one-sided goals, goals
 * attributed to a named person, `privacy: "dark"` rows — were written as tools
 * for thinking, about real people, with no expectation of publication. They are
 * useful and they should keep existing. They should not render on a public
 * build.
 *
 * The rule this file exists to enforce: a surface that reads private
 * annotations must gate on `SHOW_PRIVATE_ANNOTATIONS`, and the default is off.
 * A label saying a row is hidden is not a filter, and a component-local flag is
 * one someone forgets to set when they add the next surface.
 *
 * Local planner run:
 *
 *   NEXT_PUBLIC_SHOW_PRIVATE_ANNOTATIONS=1 pnpm dev
 *
 * Deliberately reads a `NEXT_PUBLIC_` variable so the value is inlined at build
 * time and a production deploy cannot flip it at runtime.
 */
export const SHOW_PRIVATE_ANNOTATIONS =
  process.env.NEXT_PUBLIC_SHOW_PRIVATE_ANNOTATIONS === "1";
