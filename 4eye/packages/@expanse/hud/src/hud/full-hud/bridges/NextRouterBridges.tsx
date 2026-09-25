import {
  NextPathnameSync,
  NextRouterNavigationBridge,
  type NextRouterLike,
} from "@expanse/map"

export interface NextRouterBridgesProps {
  nextRouter?: NextRouterLike
  pathname?: string
  routerMethod?: "push" | "replace"
}

/**
 * Mounts the optional Next.js router bridges. Renders nothing in
 * demo / storybook mode where neither `nextRouter` nor `pathname` is
 * provided.
 */
export function NextRouterBridges({
  nextRouter,
  pathname,
  routerMethod = "push",
}: NextRouterBridgesProps) {
  const isNextMode = !!(nextRouter || pathname)
  if (!isNextMode) return null

  return (
    <>
      {nextRouter && (
        <NextRouterNavigationBridge
          router={nextRouter}
          method={routerMethod}
          pathname={pathname}
        />
      )}
      {pathname && <NextPathnameSync pathname={pathname} />}
    </>
  )
}
