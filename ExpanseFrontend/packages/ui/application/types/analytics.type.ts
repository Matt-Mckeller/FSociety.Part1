type ExpanseAuthEvent =
  | "open-auth"
  | "update-auth-screen"
  | "forgot-password-success"
  | "successful-sign-up"
  | "successful-login"
  | "reset-password-success"
  | "forgot-password-success"
  | "verify-passcode-password-success"
  | "verify-passcode-password-success"
  | "successful-logout"
  | "clicked-auth-form-submit"
  | "open-signup-modal"
  | "exit-auth"
  | "click-logout-side-drawer"
  | "resend-forgot-password-verify-screen"
  | "clicked-verify-reset-passcode-form-submit"
  | "click-handle-logout-side-drawer"
type ExpanseNavigationEvent =
  | "page-load"
  | "popstate"
  | "logo-home-navigation"
  | "side-drawer-navigate"
  | "page-header-navigation"
type ExpanseLayoutInteractionEvents =
  | "theme-dark-mode-toggle"
  | "theme-light-mode-toggle"
  | "toggle-profile-menu-list"
  | "close-profile-menu-list"
  | "toggle-profile-menu-list"
  | "toggle-drawer-open"
  | "keydown-profile-list"
type ExpanseServicesPageInteractionEvents =
  | "toggle-services-active-points-view"
  | "update-points-of-complexity-slider"
  | "auth-cta-services-1"
  | "auth-cta-services-2"
  | "see-more-matthew-details-click"
type ExpanseInteractionEvent = "auth-cta-click"
type ExpanseSamplesPageInteractionEvents = "auth-cta-samples-1"
type ExpanseContactEvents =
  | "contact-cta-click"
  | "contact-calendly-click"
  | "landing-hero-calendly-click"
  | "contact-edu-click"

export type ExpanseAnalyticsEvent =
  | ExpanseAuthEvent
  | ExpanseLayoutInteractionEvents
  | ExpanseServicesPageInteractionEvents
  | ExpanseNavigationEvent
  | ExpanseInteractionEvent
  | ExpanseSamplesPageInteractionEvents
  | ExpanseContactEvents
