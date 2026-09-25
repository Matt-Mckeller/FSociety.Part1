import React from "react"
import { Box } from "@mui/system"
import router from "next/router"

export const useRouteAccessChecker = ({
  doRedirect,
}: {
  doRedirect: boolean
}) => ({ allowed: true, response: null })
export const hasRouteAccess = ({ doRedirect }: { doRedirect: boolean }) => ({
  allowed: true,
  response: null,
})
// TODO

//   const privateRoutes = PRIVATE_ROUTES.map((route) => route.path)
//   const accessDeniedComponent = <Box>Access denied.</Box>
//   const response: { allowed: boolean, response: null | React.ReactElement } = { allowed: true, response: null }
//   console.log({ privateRoutes })
//   if (privateRoutes.includes(router.pathname)) {
//     console.log('restricted route')
//     const routeRules = PRIVATE_ROUTES.find((route) => route.path === router.pathname)
//     console.log({ routeRules })

//     // CHECK AUTH RESTRICTIONS
//     if (routeRules && routeRules.restrictions.includes('auth')) {
//       if (!user?.id) {
//         response.allowed = false
//         console.log('User needs to authenticate to attempt to access the requested route.')
//         if (!doRedirect) {
//           response.response = accessDeniedComponent
//         } else {
//           router.push(AUTH_NAV_ROUTE)
//         }
//       }
//     }
//   }
//   return response
