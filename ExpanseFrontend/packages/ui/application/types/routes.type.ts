export type RouteRestrictions = "local" | "auth"

export type RouteConfig = {
  displayInHeader: boolean
  displayInSideNav: boolean
}
export type NestedRouteConfig = {
  displayInHeader: boolean
  displayInSideNav: boolean
  // Used to group routes together and apply titles to the desktop nav menu in nestableNavLink
  // Methodology maybe updated in future
  navSectionTitle: string
}

export type StandardRoute = {
  path: string
  text: string
  restrictions: RouteRestrictions[]
  config: RouteConfig
}
export type NestedRoute = StandardRoute & {
  prefix?: string
}
// todo change types but fucking going to switch to react router anyway
export type RouteWithNesting = StandardRoute & {
  nestedRoutes: NestedRoute[]
  config: NestedRouteConfig
}

export type Route = StandardRoute | RouteWithNesting

export function isRouteWithNesting(
  route: Route,
): route is RouteWithNesting & { config: RouteConfig } {
  return "nestedRoutes" in route
}
