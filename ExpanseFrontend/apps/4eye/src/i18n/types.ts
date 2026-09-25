/**
 * i18n Type Definitions
 *
 * All translation content is strongly typed for type safety and autocomplete.
 */

/**
 * Common UI translations (buttons, labels, etc.)
 */
export interface CommonTranslations {
  navigation: {
    home: string
    contact: string
    terms: string
    privacyPolicy: string
  }
  actions: {
    submit: string
    cancel: string
    learnMore: string
    getStarted: string
    contactUs: string
  }
  footer: {
    copyright: string
    allRightsReserved: string
  }
}

/**
 * Home page content translations
 */
export interface HomeTranslations {
  intro: {
    title: string
    body: string
  }
  purpose: {
    title: string
    items: Array<{
      label: string
      description: string
    }>
  }
  problemSolutionStory: Array<{
    title: string
    paragraphs: string[]
  }>
  advantages: {
    title: string
    items: Array<{
      label: string
      description: string
    }>
  }
  audience: {
    title: string
    body: string
  }
  additionalGoals: {
    title: string
    details: Array<{
      label: string
      body: string
    }>
  }
  gamificationEngagement: {
    title: string
    body: string
    animation: {
      left: string
      right: string
      center: string[]
    }
  }
  curtains: {
    title: string
    body: string
  }
  contact: {
    title: string
    buttonText: string
  }
  thankYou: {
    text: string
  }
}

/**
 * Contact page translations
 */
export interface ContactTranslations {
  pageTitle: string
  form: {
    name: string
    email: string
    message: string
    submit: string
  }
  success: {
    title: string
    message: string
  }
  error: {
    title: string
    message: string
  }
}

/**
 * Complete translations structure
 */
export interface Translations {
  common: CommonTranslations
  home: HomeTranslations
  contact: ContactTranslations
}

/**
 * Type for translation keys (for use with next-intl)
 */
export type TranslationKey = keyof Translations
