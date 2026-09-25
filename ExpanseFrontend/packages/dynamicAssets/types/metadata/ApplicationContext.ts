/**
 * Application contexts for animations
 */
export const APPLICATION_CONTEXTS = {
  EDUCATION: "education",
  WORK: "work",
  GAMIFICATION: "gamification",
  LIFE: "life",
  WEB_CONTENT: "web-content",
} as const

export type ApplicationContext =
  (typeof APPLICATION_CONTEXTS)[keyof typeof APPLICATION_CONTEXTS]
