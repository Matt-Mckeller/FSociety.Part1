import React from "react"
import type { Preview, Decorator } from "@storybook/react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { MockedProvider } from "@apollo/client/testing"
import { AnalyticsContext } from "../../../packages/ui/application/context/Analytics.context"
import { REGISTER_ANALYTICS_EVENT } from "../../../packages/ui/application/gql"
import { AuthMockProvider, AuthFormScreen } from "../src/mocks/auth-context"
import { MockRoutesProvider } from "../src/mocks/routes-context"
import { MockGameProvider } from "../src/mocks/game-context"
import "../src/styles.css"

// Import auth GraphQL mutations for mocking
import { SUBMIT_SIGN_IN } from "../../../packages/ui/auth/gql/submit-sign-in"
import { SUBMIT_SIGN_UP } from "../../../packages/ui/auth/gql/submit-sign-up"
import { SUBMIT_LOGOUT } from "../../../packages/ui/auth/gql/submit-logout"
import { SUBMIT_FORGOT_PASSWORD } from "../../../packages/ui/auth/gql/submit-forgot-password"
import { SUBMIT_VERIFY_RESET_PASSWORD_PASSCODE } from "../../../packages/ui/auth/gql/submit-verify-reset-password-passcode"
import { SUBMIT_RESET_PASSWORD } from "../../../packages/ui/auth/gql/submit-reset-password"

// Import contact GQL and mock provider
import { SUBMIT_CONTACT } from "../../../packages/ui/contact/gql/submit-contact"
import { MockContactProvider } from "../src/mocks/contact-context"

// Import the actual theme configs from expanse.ui/theme
import {
  lightThemePalette,
  lightThemeShadows,
  expanseLightComponents,
  darkThemePalette,
  darkThemeEmptyShadowArray,
  expanseDarkComponents,
  blueLightThemePalette,
  blueLightComponents,
  blueDarkThemePalette,
  blueDarkComponents,
  redLightThemePalette,
  redLightComponents,
  redDarkThemePalette,
  redDarkComponents,
  greenLightThemePalette,
  greenLightComponents,
  greenDarkThemePalette,
  greenDarkComponents,
  orangeLightThemePalette,
  orangeLightComponents,
  orangeDarkThemePalette,
  orangeDarkComponents,
  tealLightThemePalette,
  tealLightComponents,
  tealDarkThemePalette,
  tealDarkComponents,
  breakpoints,
  getComponents,
  mixins,
  spacing,
  typography,
  zIndex,
} from "../../../packages/ui/theme/configs"

// Import i18n configuration and decorator
import { withI18n, withDirection } from "../src/i18n/decorators"
import {
  localeConfigs,
  timezoneConfigs,
  currencyConfigs,
  type Locale,
  type Timezone,
  type Currency,
} from "../src/i18n"

// Mock response for analytics mutation - this handles any analytics event
const createAnalyticsMock = () => ({
  request: {
    query: REGISTER_ANALYTICS_EVENT,
  },
  variableMatcher: () => true, // Match any variables
  result: {
    data: {
      registerAnalyticsEvent: {
        success: true,
        id: "mock-analytics-id",
      },
    },
  },
})

// Create multiple mocks since each call consumes one mock
const analyticsMocks = Array(100)
  .fill(null)
  .map(() => createAnalyticsMock())

// ============================================================================
// Auth GraphQL Mocks
// ============================================================================

// Mock JWT token for successful auth responses
const mockJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSJ9LCJpYXQiOjE2MTYxNjE2MTYsImV4cCI6MTYxNjE2NTIxNn0.mock-signature"

const createSignInMock = () => ({
  request: { query: SUBMIT_SIGN_IN },
  variableMatcher: () => true,
  result: { data: { signIn: { success: true, jwt: mockJwt } } },
})

const createSignUpMock = () => ({
  request: { query: SUBMIT_SIGN_UP },
  variableMatcher: () => true,
  result: { data: { signUp: { success: true, jwt: mockJwt } } },
})

const createLogoutMock = () => ({
  request: { query: SUBMIT_LOGOUT },
  variableMatcher: () => true,
  result: { data: { logout: { success: true } } },
})

const createForgotPasswordMock = () => ({
  request: { query: SUBMIT_FORGOT_PASSWORD },
  variableMatcher: () => true,
  result: { data: { forgotPassword: { success: true } } },
})

const createVerifyPasscodeMock = () => ({
  request: { query: SUBMIT_VERIFY_RESET_PASSWORD_PASSCODE },
  variableMatcher: () => true,
  result: { data: { verifyResetPasswordPasscode: { success: true } } },
})

const createResetPasswordMock = () => ({
  request: { query: SUBMIT_RESET_PASSWORD },
  variableMatcher: () => true,
  result: { data: { resetPassword: { success: true, jwt: mockJwt } } },
})

// ============================================================================
// Contact GraphQL Mocks
// ============================================================================

const createContactSubmitMock = () => ({
  request: { query: SUBMIT_CONTACT },
  variableMatcher: () => true,
  result: {
    data: {
      registerContact: {
        success: true,
      },
    },
  },
})

// Create arrays of auth mocks
const authMocks = [
  ...Array(20).fill(null).map(() => createSignInMock()),
  ...Array(20).fill(null).map(() => createSignUpMock()),
  ...Array(20).fill(null).map(() => createLogoutMock()),
  ...Array(10).fill(null).map(() => createForgotPasswordMock()),
  ...Array(10).fill(null).map(() => createVerifyPasscodeMock()),
  ...Array(10).fill(null).map(() => createResetPasswordMock()),
]

// Create arrays of contact mocks
const contactMocks = [
  ...Array(20).fill(null).map(() => createContactSubmitMock()),
]

// Combined mocks for MockedProvider
const allMocks = [...analyticsMocks, ...authMocks, ...contactMocks]

// Mock value for AnalyticsContext
const mockAnalyticsContextValue = {
  analyticsSessionId: "storybook-session-id",
  analyticsEventContext: {
    pageUrl: "http://localhost:6006",
    eventTimestamp: new Date().toISOString(),
    sessionId: "storybook-session-id",
    metrics: {},
    deviceContext: {
      deviceTypeByUserAgent: "desktop",
      deviceTypeByScreenWidth: "desktop",
      screenSize: "1920x1080",
      innerSize: "1920x1080",
    },
  },
}

// Theme configurations mapping color names to palette/components
const themeConfigs = {
  purple: {
    light: {
      palette: lightThemePalette,
      shadows: lightThemeShadows,
      components: expanseLightComponents,
    },
    dark: {
      palette: darkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: expanseDarkComponents,
    },
  },
  blue: {
    light: {
      palette: blueLightThemePalette,
      shadows: lightThemeShadows,
      components: blueLightComponents,
    },
    dark: {
      palette: blueDarkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: blueDarkComponents,
    },
  },
  red: {
    light: {
      palette: redLightThemePalette,
      shadows: lightThemeShadows,
      components: redLightComponents,
    },
    dark: {
      palette: redDarkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: redDarkComponents,
    },
  },
  green: {
    light: {
      palette: greenLightThemePalette,
      shadows: lightThemeShadows,
      components: greenLightComponents,
    },
    dark: {
      palette: greenDarkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: greenDarkComponents,
    },
  },
  orange: {
    light: {
      palette: orangeLightThemePalette,
      shadows: lightThemeShadows,
      components: orangeLightComponents,
    },
    dark: {
      palette: orangeDarkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: orangeDarkComponents,
    },
  },
  teal: {
    light: {
      palette: tealLightThemePalette,
      shadows: lightThemeShadows,
      components: tealLightComponents,
    },
    dark: {
      palette: tealDarkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: tealDarkComponents,
    },
  },
}

// Create theme using the real expanse.ui theme configs
const createAppTheme = (
  mode: "light" | "dark",
  colorName: keyof typeof themeConfigs,
) => {
  const config = themeConfigs[colorName]?.[mode] || themeConfigs.purple[mode]
  return createTheme({
    spacing,
    palette: config.palette,
    mixins,
    typography,
    components: getComponents(
      config.palette,
      config.shadows,
      config.components,
    ),
    shadows: config.shadows,
    zIndex,
    breakpoints,
  })
}

// Pre-create all theme combinations
const themes: Record<string, ReturnType<typeof createTheme>> = {}
const modes: Array<"light" | "dark"> = ["light", "dark"]
const colorNames = Object.keys(themeConfigs) as Array<keyof typeof themeConfigs>

modes.forEach((mode) => {
  colorNames.forEach((color) => {
    themes[`${color}-${mode}`] = createAppTheme(mode, color)
  })
})

/**
 * MUI Theme Decorator
 * Wraps all stories with MUI ThemeProvider and CssBaseline
 */
const withMuiTheme: Decorator = (Story, context) => {
  const mode = context.globals.mode || "light"
  const colorTheme = context.globals.colorTheme || "purple"
  const themeKey = `${colorTheme}-${mode}`
  const theme = themes[themeKey] || themes["purple-light"]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          padding: "1rem",
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Story />
      </div>
    </ThemeProvider>
  )
}

/**
 * Apollo Mock Provider Decorator
 * Wraps stories with MockedProvider for GraphQL queries (includes auth mocks)
 */
const withApolloMock: Decorator = (Story) => {
  return (
    <MockedProvider mocks={allMocks} addTypename={false}>
      <Story />
    </MockedProvider>
  )
}

/**
 * Analytics Context Provider Decorator
 * Provides mock analytics context for components that use it
 */
const withAnalyticsContext: Decorator = (Story) => {
  return (
    <AnalyticsContext.Provider value={mockAnalyticsContextValue}>
      <Story />
    </AnalyticsContext.Provider>
  )
}

/**
 * Auth Context Provider Decorator
 * Wraps stories with all auth-related context providers.
 * Configure via story parameters:
 * - parameters.auth.isAuthenticated: boolean
 * - parameters.auth.initialScreen: AuthFormScreen
 * - parameters.auth.modalOpen: boolean
 */
const withAuthContext: Decorator = (Story, context) => {
  const authParams = context.parameters?.auth || {}

  return (
    <AuthMockProvider
      isAuthenticated={authParams.isAuthenticated ?? false}
      initialScreen={authParams.initialScreen ?? AuthFormScreen.SignUp}
      modalOpen={authParams.modalOpen ?? false}
      initialEmail={authParams.initialEmail ?? ""}
      initialFullName={authParams.initialFullName ?? ""}
    >
      <Story />
    </AuthMockProvider>
  )
}

/**
 * Routes Context Provider Decorator
 * Provides mock routes for components that use RoutesContext
 */
const withRoutesContext: Decorator = (Story) => {
  return (
    <MockRoutesProvider>
      <Story />
    </MockRoutesProvider>
  )
}

/**
 * Game Context Provider Decorator
 * Provides mock game contexts for components that use game-related contexts.
 * Configure via story parameters:
 * - parameters.game.mockWallet: Partial wallet context
 * - parameters.game.mockExperience: Partial experience context
 * - parameters.game.mockProgress: Partial progress context
 * - parameters.game.mockInventory: Partial inventory context
 * - parameters.game.mockProfile: Partial profile context
 * - parameters.game.isAuthenticated: boolean
 */
const withGameContext: Decorator = (Story, context) => {
  const gameParams = context.parameters?.game || {}

  return (
    <MockGameProvider
      mockWallet={gameParams.mockWallet}
      mockExperience={gameParams.mockExperience}
      mockProgress={gameParams.mockProgress}
      mockInventory={gameParams.mockInventory}
      mockProfile={gameParams.mockProfile}
      isAuthenticated={gameParams.isAuthenticated ?? true}
    >
      <Story />
    </MockGameProvider>
  )
}

/**
 * Contact Context Provider Decorator
 * Provides mock contact contexts for contact-related components.
 * Configure via story parameters:
 * - parameters.contact.isModalOpen: boolean
 * - parameters.contact.initialFormValues: { fullName, email, phoneNumber, description }
 */
const withContactContext: Decorator = (Story, context) => {
  const contactParams = context.parameters?.contact || {}

  return (
    <MockContactProvider
      isModalOpen={contactParams.isModalOpen ?? false}
      initialFormValues={contactParams.initialFormValues ?? {}}
    >
      <Story />
    </MockContactProvider>
  )
}

const preview: Preview = {
  decorators: [withContactContext, withAuthContext, withRoutesContext, withGameContext, withAnalyticsContext, withApolloMock, withI18n, withDirection, withMuiTheme],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Enable backgrounds addon with custom values
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: lightThemePalette.background.default },
        { name: "dark", value: darkThemePalette.background.default },
        { name: "twitter", value: "#00aced" },
        { name: "facebook", value: "#3b5998" },
      ],
    },
    // Configure story ordering - Theme at top for brand showcase
    options: {
      storySort: {
        order: [
          "Theme",
          [
            "Characters",
            [
              "PushingProgress Animation",
              "Overview",
              "*",
            ],
            "*",
          ],
          "Game",
          "ExpanseEdu",
          "4eye",
          "4up",
          "*",
        ],
      },
    },
  },
  globalTypes: {
    mode: {
      name: "Mode",
      description: "Light or Dark mode",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "☀️ Light", icon: "sun" },
          { value: "dark", title: "🌙 Dark", icon: "moon" },
        ],
        showName: false,
        dynamicTitle: true,
      },
    },
    colorTheme: {
      name: "Color Theme",
      description: "Theme color palette",
      defaultValue: "purple",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "purple", title: "💜 Purple" },
          { value: "blue", title: "💙 Blue" },
          { value: "red", title: "❤️ Red" },
          { value: "green", title: "💚 Green" },
          { value: "orange", title: "🧡 Orange" },
          { value: "teal", title: "🩵 Teal" },
        ],
        showName: false,
        dynamicTitle: true,
      },
    },
    // Text direction control
    direction: {
      name: "Direction",
      description: "Text direction (LTR/RTL)",
      defaultValue: "auto",
      toolbar: {
        icon: "menu",
        items: [
          { value: "auto", title: "🔄 Auto (from locale)" },
          { value: "ltr", title: "➡️ LTR (Left-to-Right)" },
          { value: "rtl", title: "⬅️ RTL (Right-to-Left)" },
        ],
        showName: false,
        dynamicTitle: true,
      },
    },
    // Internationalization controls
    locale: {
      name: "Locale",
      description: "Language and region for formatting",
      defaultValue: "en-US",
      toolbar: {
        icon: "globe",
        items: Object.values(localeConfigs).map((config) => ({
          value: config.code,
          title: `${config.flag} ${config.nativeName}`,
        })),
        showName: false,
        dynamicTitle: true,
      },
    },
    timezone: {
      name: "Timezone",
      description: "Timezone for date/time display",
      defaultValue: "local",
      toolbar: {
        icon: "time",
        items: Object.values(timezoneConfigs).map((config) => ({
          value: config.id,
          title: `${config.icon} ${config.abbr} (${config.utcOffset})`,
        })),
        showName: false,
        dynamicTitle: true,
      },
    },
    currency: {
      name: "Currency",
      description: "Currency for price display",
      defaultValue: "USD",
      toolbar: {
        icon: "credit",
        items: Object.values(currencyConfigs).map((config) => ({
          value: config.code,
          title: `${config.icon} ${config.code} (${config.symbol})`,
        })),
        showName: false,
        dynamicTitle: true,
      },
    },
  },
}

export default preview
