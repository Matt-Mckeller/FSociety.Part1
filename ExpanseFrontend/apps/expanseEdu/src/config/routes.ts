import { Route } from "expanse.ui/application"

// todo tbh idk why some have slashes and some do not, probably needs fixed
// likely switching to react router anyway
export const HOME_NAV_ROUTE = "/"
export const CONTACT_ROUTE = "/contact" // disabled for now
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
  // {
  //   path: TERMS_ROUTE,
  //   text: "Terms of Service",
  //   restrictions: [],
  //   config: {
  //     displayInHeader: false,
  //     displayInSideNav: false,
  //   },
  // },
  // {
  //   path: PRIVACY_POLICY_ROUTE,
  //   text: "Privacy Policy",
  //   restrictions: [],
  //   config: {
  //     displayInHeader: false,
  //     displayInSideNav: false,
  //   },
  // },
]
