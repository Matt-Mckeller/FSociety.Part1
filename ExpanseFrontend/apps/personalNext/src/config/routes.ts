import { Route } from "expanse.ui/application"

// todo tbh idk why some have slashes and some do not, probably needs fixed
// likely switching to react router anyway
export const HOME_NAV_ROUTE = "/"
export const CONTACT_ROUTE = "/contact" // disabled for now
export const ABOUT_NAV_ROUTE = "/about-us"
export const SERVICES_NAV_ROUTE = "/software-development-services"
export const SAMPLES_NAV_ROUTE = "/software-development-samples"
export const API_NAV_ROUTE = "/api-explorer"
export const AUTH_ROUTE = "/authentication"
export const ACCOUNT_ROUTE = "/account"
export const EXPERIENCE_PREFIX = "solutions"
export const FRONTEND_CONTENT_ROUTE = "frontend-web-application-development"
export const BACKEND_CONTENT_ROUTE = "backend-web-application-development"
export const DATA_VISUALIZTION_CONTENT_ROUTE =
  "data-visualization-development-for-web-applications"
export const PRODUCT_MANAGEMENT_CONTENT_ROUTE =
  "product-management-for-web-application-development"
export const JAVASCRIPT_CONTENT_ROUTE =
  "javascript-and-typescript-development-for-web-applications"
export const REACT_CONTENT_ROUTE = "react-development-for-web-applications"
export const USER_INTERFACE_CONTENT_ROUTE =
  "user-interface-development-for-web-applications"
export const API_CONTENT_ROUTE = "api-development-for-web-applications"
export const CUSTOM_FORM_DEVELOPMENT_CONTENT_ROUTE =
  "custom-form-development-for-web-applications"

export const TERMS_ROUTE = "/terms"
export const PRIVACY_POLICY_ROUTE = "/privacy-policy"

export const Routes: Route[] = [
  {
    path: HOME_NAV_ROUTE,
    text: "Home",
    restrictions: [],
    config: {
      displayInHeader: true,
      displayInSideNav: true,
    },
  },
  {
    path: CONTACT_ROUTE,
    text: "Contact",
    restrictions: [],
    config: {
      displayInHeader: false,
      displayInSideNav: false,
    },
  },
  {
    path: EXPERIENCE_PREFIX,
    text: "Solutions",
    restrictions: [],
    nestedRoutes: [
      {
        prefix: EXPERIENCE_PREFIX,
        path: FRONTEND_CONTENT_ROUTE,
        text: "Frontend Development",
        restrictions: [],
        config: {
          navSectionTitle: "Development",
        },
      },
      {
        prefix: EXPERIENCE_PREFIX,
        path: BACKEND_CONTENT_ROUTE,
        text: "Backend Development",
        restrictions: [],
        config: {
          navSectionTitle: "Development",
        },
      },
      {
        prefix: EXPERIENCE_PREFIX,
        path: DATA_VISUALIZTION_CONTENT_ROUTE,
        text: "Data Visualizations",
        restrictions: [],
        config: {
          navSectionTitle: "Development",
        },
      },
      {
        prefix: EXPERIENCE_PREFIX,
        path: PRODUCT_MANAGEMENT_CONTENT_ROUTE,
        text: "Product Management",
        restrictions: [],
        config: {
          navSectionTitle: "Product / Leadership",
        },
      },
    ],
    config: {
      displayInHeader: true,
      displayInSideNav: true,
    },
  },
  {
    path: SAMPLES_NAV_ROUTE,
    text: "Samples",
    restrictions: [],
    config: {
      displayInHeader: true,
      displayInSideNav: true,
    },
  },
  {
    path: API_NAV_ROUTE,
    text: "API",
    restrictions: [],
    config: {
      displayInHeader: true,
      displayInSideNav: true,
    },
  },
  {
    path: AUTH_ROUTE,
    text: "Authentication",
    restrictions: [],
    config: {
      displayInHeader: false,
      displayInSideNav: false,
    },
  },
  {
    path: ACCOUNT_ROUTE,
    text: "Account",
    restrictions: ["auth"],
    config: {
      displayInHeader: false,
      displayInSideNav: false,
    },
  },

  {
    path: TERMS_ROUTE,
    text: "Terms of Service",
    restrictions: [],
    config: {
      displayInHeader: false,
      displayInSideNav: false,
    },
  },
  {
    path: PRIVACY_POLICY_ROUTE,
    text: "Privacy Policy",
    restrictions: [],
    config: {
      displayInHeader: false,
      displayInSideNav: false,
    },
  },
]
