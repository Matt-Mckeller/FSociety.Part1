/**
 * Mock providers for Auth components in Storybook.
 * Provides all required contexts with configurable states.
 */
import React, { useMemo, useState } from "react"
import { AlertColor } from "@mui/material"

// Import the actual contexts to provide mock values
import { UserContext, User } from "../../../../packages/ui/user"
import { LayoutContext } from "../../../../packages/ui/application/context/Layout.context"
import {
  AuthSessionContext,
  AuthDisplayContext,
  AuthFormsContext,
} from "../../../../packages/ui/auth"
import { AuthFormScreen } from "../../../../packages/ui/auth/types/enums"

// ============================================================================
// Mock User
// ============================================================================

// Create a proper User instance for the authenticated state
export const createMockUser = (): User => {
  return new User({
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    active: true,
    role: { id: 1, name: "user" },
    sessions: { expires: Date.now() + 3600000, createdAt: Date.now() },
    lastLogIn: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}

// ============================================================================
// Mock User Context Provider
// ============================================================================

interface MockUserProviderProps {
  children: React.ReactNode
  isAuthenticated?: boolean
}

export function MockUserProvider({
  children,
  isAuthenticated = false,
}: MockUserProviderProps) {
  const [user, setUser] = useState<User | null>(
    isAuthenticated ? createMockUser() : null,
  )

  const value = useMemo(
    () => ({
      accountNavRoute: "/account",
      user,
      initializeUser: (u: any) => setUser(u),
      updateUser: (updates: any) => setUser((prev) => ({ ...prev, ...updates })),
      clearUser: () => setUser(null),
    }),
    [user],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// ============================================================================
// Mock Layout Context Provider
// ============================================================================

interface MockLayoutProviderProps {
  children: React.ReactNode
}

export function MockLayoutProvider({ children }: MockLayoutProviderProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [alertType, setAlertType] = useState<AlertColor>("success")

  const value = useMemo(
    () => ({
      // Drawer
      drawerOpen: false,
      setDrawerOpen: (v: boolean) => console.log("[Storybook] setDrawerOpen:", v),

      // Snackbar
      snackbarMessage,
      snackbarOpen,
      alertType,
      showSnackbarError: (msg: string) => {
        console.log("[Storybook] showSnackbarError:", msg)
        setAlertType("error")
        setSnackbarMessage(msg)
        setSnackbarOpen(true)
      },
      showSnackbarSuccess: (msg: string) => {
        console.log("[Storybook] showSnackbarSuccess:", msg)
        setAlertType("success")
        setSnackbarMessage(msg)
        setSnackbarOpen(true)
      },
      closeSnackbar: () => setSnackbarOpen(false),
      closeAlert: () => setSnackbarOpen(false),

      // Loading
      loading: false,
      currentLoadingProcessIDs: [] as string[],
      addLoadingProcessID: (id: string) =>
        console.log("[Storybook] addLoadingProcessID:", id),
      removeLoadingProcessID: (id: string) =>
        console.log("[Storybook] removeLoadingProcessID:", id),
    }),
    [snackbarMessage, snackbarOpen, alertType],
  )

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

// ============================================================================
// Mock Auth Session Context Provider
// ============================================================================

interface MockAuthSessionProviderProps {
  children: React.ReactNode
  isAuthenticated?: boolean
}

export function MockAuthSessionProvider({
  children,
  isAuthenticated = false,
}: MockAuthSessionProviderProps) {
  const value = useMemo(
    () => ({
      jwt: isAuthenticated ? "mock.jwt.token" : null,
      handleSuccessfulLogin: (jwt: string) => {
        console.log("[Storybook] handleSuccessfulLogin:", jwt)
        return true
      },
      handleLogout: () => {
        console.log("[Storybook] handleLogout")
      },
      userIsAuthenticated: isAuthenticated,
    }),
    [isAuthenticated],
  )

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  )
}

// ============================================================================
// Mock Auth Forms Context Provider
// ============================================================================

interface MockAuthFormsProviderProps {
  children: React.ReactNode
  initialEmail?: string
  initialFullName?: string
}

export function MockAuthFormsProvider({
  children,
  initialEmail = "",
  initialFullName = "",
}: MockAuthFormsProviderProps) {
  const [email, setEmail] = useState(initialEmail)
  const [fullName, setFullName] = useState(initialFullName)
  const [password, setPassword] = useState("")
  const [resetPasscode, setResetPasscode] = useState("")
  const [agreeToPrivacyPolicyAndTerms, setAgreeToPrivacyPolicyAndTerms] =
    useState(false)

  const value = useMemo(
    () => ({
      email,
      setEmail,
      fullName,
      setFullName,
      password,
      setPassword,
      resetPasscode,
      setResetPasscode,
      agreeToPrivacyPolicyAndTerms,
      setAgreeToPrivacyPolicyAndTerms,
    }),
    [email, fullName, password, resetPasscode, agreeToPrivacyPolicyAndTerms],
  )

  return (
    <AuthFormsContext.Provider value={value}>
      {children}
    </AuthFormsContext.Provider>
  )
}

// ============================================================================
// Mock Auth Display Context Provider
// ============================================================================

interface MockAuthDisplayProviderProps {
  children: React.ReactNode
  initialScreen?: AuthFormScreen
  modalOpen?: boolean
}

export function MockAuthDisplayProvider({
  children,
  initialScreen = AuthFormScreen.SignUp,
  modalOpen = false,
}: MockAuthDisplayProviderProps) {
  const [currentScreen, setCurrentScreen] = useState(initialScreen)
  const [authModalIsOpen, setAuthModalIsOpen] = useState(modalOpen)

  const modalTitle = () => {
    switch (currentScreen) {
      case AuthFormScreen.SignUp:
        return "Sign Up"
      case AuthFormScreen.SignIn:
        return "Sign In"
      case AuthFormScreen.ForgotPassword:
        return "Forgot Password?"
      case AuthFormScreen.VerifyResetPasscode:
        return "Enter Verification Code"
      case AuthFormScreen.ResetPassword:
        return "Password Reset"
      case AuthFormScreen.SignUpSuccess:
        return "Victory!"
      case AuthFormScreen.ResetPasswordSuccess:
        return "Update Successful!"
      default:
        return "Auth Modal Title"
    }
  }

  const value = useMemo(
    () => ({
      // Navigation
      displaySignInNav: true,
      displaySignUpNav: true,
      displayUserInNav: false,
      handleAuthNavigation: (authNavType?: string) => {
        console.log("[Storybook] handleAuthNavigation:", authNavType)
        if (authNavType === "signIn") {
          setCurrentScreen(AuthFormScreen.SignIn)
          setAuthModalIsOpen(true)
        } else if (authNavType === "signUp") {
          setCurrentScreen(AuthFormScreen.SignUp)
          setAuthModalIsOpen(true)
        }
      },

      // Screen management
      currentScreen,
      setCurrentScreen: (screen: AuthFormScreen) => {
        console.log("[Storybook] setCurrentScreen:", screen)
        setCurrentScreen(screen)
      },
      modalTitle,
      authModalIsOpen,
      openAuth: (screen?: AuthFormScreen) => {
        console.log("[Storybook] openAuth:", screen)
        if (screen) setCurrentScreen(screen)
        setAuthModalIsOpen(true)
      },
      exitAuth: () => {
        console.log("[Storybook] exitAuth")
        setAuthModalIsOpen(false)
      },
      openAuthModal: () => {
        console.log("[Storybook] openAuthModal")
        setAuthModalIsOpen(true)
      },
    }),
    [currentScreen, authModalIsOpen],
  )

  return (
    <AuthDisplayContext.Provider value={value}>
      {children}
    </AuthDisplayContext.Provider>
  )
}

// ============================================================================
// Combined Auth Mock Provider
// ============================================================================

export interface AuthMockProviderProps {
  children: React.ReactNode
  isAuthenticated?: boolean
  initialScreen?: AuthFormScreen
  modalOpen?: boolean
  initialEmail?: string
  initialFullName?: string
}

/**
 * Combined mock provider that wraps all auth-related contexts.
 * Use this in Storybook decorators for auth components.
 */
export function AuthMockProvider({
  children,
  isAuthenticated = false,
  initialScreen = AuthFormScreen.SignUp,
  modalOpen = false,
  initialEmail = "",
  initialFullName = "",
}: AuthMockProviderProps) {
  return (
    <MockUserProvider isAuthenticated={isAuthenticated}>
      <MockLayoutProvider>
        <MockAuthSessionProvider isAuthenticated={isAuthenticated}>
          <MockAuthFormsProvider
            initialEmail={initialEmail}
            initialFullName={initialFullName}
          >
            <MockAuthDisplayProvider
              initialScreen={initialScreen}
              modalOpen={modalOpen}
            >
              {children}
            </MockAuthDisplayProvider>
          </MockAuthFormsProvider>
        </MockAuthSessionProvider>
      </MockLayoutProvider>
    </MockUserProvider>
  )
}

// Export enums for story usage
export { AuthFormScreen }
