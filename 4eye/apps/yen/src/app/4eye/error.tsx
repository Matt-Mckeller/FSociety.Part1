"use client";

/*
  Nested boundary so a runtime fault inside the 4eye HUD does not replace
  yen's own chrome. Compile errors still have to be fixed at the source —
  webpack shares one compiler — but a thrown render no longer looks like
  the whole site is down.
*/
export { default } from "../error";
