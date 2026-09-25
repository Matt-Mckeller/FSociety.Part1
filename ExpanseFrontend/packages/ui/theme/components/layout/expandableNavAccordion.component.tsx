"use client"
/* 
  Intended to be used in a side drawer as an expansion panel with nav menu
*/
import { styled } from "@mui/material/styles"
import { SxProps, Theme } from "@mui/system"
import {
  Link,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material"
import React, { useContext } from "react"
import { NestedRoute, removeNonLetters } from "expanse.ui/application"
import { ExpandMore } from "@mui/icons-material"
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation"
import {
  AnalyticsContext,
  REGISTER_ANALYTICS_EVENT,
} from "expanse.ui/application"
import { useMutation } from "@apollo/client"

const PREFIX = "ExpanseNavLink"
const classes = {
  whiteRipple: `${PREFIX}-whiteRipple`,
}
const NavLinkStyled: any = styled(Link, {
  shouldForwardProp: (prop) => prop !== "boldweight",
})(({ theme, boldweight }: any) => ({
  color: theme.palette.text.primary,
  fontWeight: boldweight ? "500" : "400",
  cursor: "pointer",
}))

const StyledAccordion = styled(Accordion)(() => ({}))

interface LinkInputProps {
  // path: string
  text?: string
  // Used to determine if the active dot is displayed
  // I.e. /services for /services/frontend-development
  justifyContent?: string
  useDotBelow?: boolean
  onNavigate?: () => void
  eventName: string
  logEvent?: boolean
  nestedRoutes: NestedRoute[]
  // todo figure out the best mui type for adding only the styling properties, the ones
  // I was experimenting with were too many added params
  sx?: SxProps<Theme>
}

export function ExpandableNavAccordion({
  // path,
  onNavigate: onNavigateCallback,
  eventName,
  text = "Default",
  justifyContent = "center",
  useDotBelow = false,
  logEvent = true,
  nestedRoutes = [],
  ...props
}: LinkInputProps) {
  const router = useRouter()
  const routerPath = usePathname()

  const hasActiveNestedRoute = nestedRoutes.reduce(
    (accumulator, nestedRoute: NestedRoute) => {
      if (accumulator === true) {
        return true
      }

      const navPath = `/${nestedRoute.prefix}/${nestedRoute.path}`
      return navPath === routerPath
    },
    false,
  )

  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const performNavigate: any = (e: any, nestedRoute) => {
    e.preventDefault()
    const navPath = `/${nestedRoute.prefix}/${nestedRoute.path}`
    if (logEvent) {
      registerAnalyticsEvent({
        variables: {
          event: eventName || "navigate",
          ...analyticsEventContext,
          params: null,
        },
      })
    }
    router.push(navPath)
    if (onNavigateCallback) {
      onNavigateCallback()
    }
  }

  return (
    <Accordion
      sx={{
        // Overrides to make the panel fit in to a side drawer naturally
        boxShadow: "none",
        margin: 0,
        padding: 0,
        minHeight: "unset",
        width: "100%",
        ["& .MuiAccordionSummary-content"]: {
          margin: 0,
        },
        ["& .MuiButtonBase-root"]: {
          minHeight: "unset",
        },
        ["& .Mui-expanded"]: {
          minHeight: "unset !important",
          margin: "0 !important",
        },

        // Background overrides because this is displayed in a drawer and the drawer
        // has an elevated background, this did not fit in without these changes
        backgroundColor: "transparent",
        backgroundImage: "none",
      }}
      defaultExpanded={hasActiveNestedRoute}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          margin: 0,
          padding: 0,
          fontWeight: hasActiveNestedRoute ? "700" : null,
        }}
      >
        {text?.toUpperCase()}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          margin: 0,
          padding: 0,
          paddingLeft: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {nestedRoutes.map((nestedRoute: NestedRoute) => {
          const navPath = `/${nestedRoute.prefix}/${nestedRoute.path}`
          const isCurrentPage = navPath === routerPath
          return (
            <NavLinkStyled
              type="button"
              onClick={(e) => performNavigate(e, nestedRoute)}
              sx={props?.sx}
              key={`nestedRouteExpandableLink-${removeNonLetters(nestedRoute.text)}`}
              boldweight={isCurrentPage}
            >
              {nestedRoute.text}
            </NavLinkStyled>
          )
        })}
      </AccordionDetails>
    </Accordion>
  )
}
