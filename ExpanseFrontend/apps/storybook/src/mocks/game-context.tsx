/**
 * Mock providers for Game components in Storybook.
 * Provides all required game contexts with configurable states.
 */
import React, { useMemo } from "react"

// Import game contexts
import {
  WalletContext,
  InventoryContext,
  ExperienceContext,
  ProgressContext,
  ProfileContext,
  EventsTempContext,
  ClaimEventRewardDisplayContext,
} from "../../../../packages/ui/game/context"

// Import types from game
import { ExperienceContextInterface } from "../../../../packages/ui/game/types"

// Import ProgressContextInterface from the context file
import { ProgressContextInterface } from "../../../../packages/ui/game/context/Progress.context"

// Import User context since game contexts depend on it
import { UserContext } from "../../../../packages/ui/user"

// Import mock user utilities from shared user-context
import { createMockGameUser } from "./user-context"

// ============================================================================
// Default Mock Values
// ============================================================================

export const mockWalletDefault = {
  coins: {
    xcoins: { coinId: "xcoins", quantity: 1500, name: "XCoins", coinIconText: "X", schoolId: "", classId: "" },
  },
  gems: {
    xgems: 75,
  },
  tickets: {
    weeklyLottery: 3,
  },
  essences: {
    fire: 10,
  },
  refetchWallet: async () => console.log("[Storybook] refetchWallet"),
  addManualCoins: (_variant: any, _amount: any) =>
    console.log("[Storybook] addManualCoins"),
  addManualGems: (_variant: any, _amount: any) =>
    console.log("[Storybook] addManualGems"),
  addManualTickets: (_variant: any, _amount: any) =>
    console.log("[Storybook] addManualTickets"),
  addManualEssences: (_variant: any, _amount: any) =>
    console.log("[Storybook] addManualEssences"),
}

export const mockExperienceDefault: ExperienceContextInterface = {
  currentLevel: 12,
  currentLevelExperience: 450,
  totalExperienceForCurrentLevel: 1000,
  totalExperienceEarned: 5450,
  previousLevel: 11,
  nextLevel: 13,
  experiencePercentage: 45,
  addManualExperience: (_amount: number) =>
    console.log("[Storybook] addManualExperience"),
}

export const mockProgressDefault: ProgressContextInterface = {
  progressPercentage: 65,
  progressLevel: 12,
  addManualExperience: (_amount: number) =>
    console.log("[Storybook] addManualExperience"),
}

export const mockInventoryDefault = {
  inventory: [] as any[],
  ownedRewards: [] as any[],
  unopenedLootBoxes: [] as any[],
  openedLootBoxes: [] as any[],
  lootBoxRewardsBeingAccepted: [] as any[],
  openBox: (_ids: string[]) => {
    console.log("[Storybook] openBox")
    return [] as any[]
  },
  onFinishedAcceptingLoot: () =>
    console.log("[Storybook] onFinishedAcceptingLoot"),
  addManualLootBox: () => console.log("[Storybook] addManualLootBox"),
  refetchOwnedRewards: () => console.log("[Storybook] refetchOwnedRewards"),
}

export const mockProfileDefault = {
  classes: [],
  classesTaught: [],
  classesStudied: [],
  loadingClasses: false,
  displayName: "Mock Player",
  fetchAllStudentAssignments: () =>
    console.log("[Storybook] fetchAllStudentAssignments"),
  allAssignments: [],
  fetchSubmissionsAndRewardableEventsForMyAssignments: async () => [],
  loadingSubmissionsAndRewardableEventsForMyAssignments: false,
  loadingAssignmentsForMyClasses: false,
  submissions: [],
  rewardableEvents: [],
  submissionsAndRewardableEventsMap: {},
}

export const mockEventsTempDefault = {
  rewardEvents: [],
  handleAddEvent: (_event: string) =>
    console.log("[Storybook] handleAddEvent"),
}

export const mockClaimEventRewardDisplayDefault = {
  isModalOpen: false,
  openClaimEventRewardDisplay: (_elements: any[]) =>
    console.log("[Storybook] openClaimEventRewardDisplay"),
  exitClaimEventRewardDisplay: (_exitType?: string) =>
    console.log("[Storybook] exitClaimEventRewardDisplay"),
  redeemEventRewards: async () =>
    ({
      lootBoxes: [],
      experienceIncrease: 0,
      walletIncrease: { coins: {}, gems: {}, essences: {}, tickets: {} },
    }) as any,
  dictionary: {
    title: "Claim Your Rewards!",
    openLootButton: "Open Loot",
    finishedButton: "Return",
  },
  claimableEventRewardElements: [],
  redeemedEventRewards: null,
  loadingEventRewards: false,
  navigateToOpenLoot: () => console.log("[Storybook] navigateToOpenLoot"),
}

// ============================================================================
// Individual Context Providers (for granular control)
// ============================================================================

interface MockWalletProviderProps {
  children: React.ReactNode
  value?: Partial<typeof mockWalletDefault>
}

export function MockWalletProvider({
  children,
  value = {},
}: MockWalletProviderProps) {
  const contextValue = useMemo(
    () => ({ ...mockWalletDefault, ...value }) as any,
    [value],
  )
  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}

interface MockExperienceProviderProps {
  children: React.ReactNode
  value?: Partial<ExperienceContextInterface>
}

export function MockExperienceProvider({
  children,
  value = {},
}: MockExperienceProviderProps) {
  const contextValue = useMemo(
    () => ({ ...mockExperienceDefault, ...value }),
    [value],
  )
  return (
    <ExperienceContext.Provider value={contextValue}>
      {children}
    </ExperienceContext.Provider>
  )
}

interface MockProgressProviderProps {
  children: React.ReactNode
  value?: Partial<ProgressContextInterface>
}

export function MockProgressProvider({
  children,
  value = {},
}: MockProgressProviderProps) {
  const contextValue = useMemo(
    () => ({ ...mockProgressDefault, ...value }),
    [value],
  )
  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  )
}

interface MockInventoryProviderProps {
  children: React.ReactNode
  value?: Partial<typeof mockInventoryDefault>
}

export function MockInventoryProvider({
  children,
  value = {},
}: MockInventoryProviderProps) {
  const contextValue = useMemo(
    () => ({ ...mockInventoryDefault, ...value }) as any,
    [value],
  )
  return (
    <InventoryContext.Provider value={contextValue}>
      {children}
    </InventoryContext.Provider>
  )
}

interface MockProfileProviderProps {
  children: React.ReactNode
  value?: Partial<typeof mockProfileDefault>
}

export function MockProfileProvider({
  children,
  value = {},
}: MockProfileProviderProps) {
  const contextValue = useMemo(
    () => ({ ...mockProfileDefault, ...value }) as any,
    [value],
  )
  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  )
}

// ============================================================================
// Combined Game Provider (wraps all game contexts)
// ============================================================================

export interface MockGameProviderProps {
  children: React.ReactNode
  mockWallet?: Partial<typeof mockWalletDefault>
  mockExperience?: Partial<ExperienceContextInterface>
  mockProgress?: Partial<ProgressContextInterface>
  mockInventory?: Partial<typeof mockInventoryDefault>
  mockProfile?: Partial<typeof mockProfileDefault>
  isAuthenticated?: boolean
}

/**
 * Comprehensive mock provider for all game-related contexts.
 * Respects the context dependency hierarchy:
 * UserContext -> WalletContext -> InventoryContext -> ExperienceContext/ProgressContext
 */
export function MockGameProvider({
  children,
  mockWallet = {},
  mockExperience = {},
  mockProgress = {},
  mockInventory = {},
  mockProfile = {},
  isAuthenticated = true,
}: MockGameProviderProps) {
  const user = isAuthenticated ? createMockGameUser() : null

  const userContextValue = useMemo(
    () => ({
      accountNavRoute: "/account",
      user,
      initializeUser: () => {},
      updateUser: () => {},
      clearUser: () => {},
    }),
    [user],
  )

  const walletValue = useMemo(
    () => ({ ...mockWalletDefault, ...mockWallet }) as any,
    [mockWallet],
  )

  const inventoryValue = useMemo(
    () => ({ ...mockInventoryDefault, ...mockInventory }) as any,
    [mockInventory],
  )

  const experienceValue = useMemo(
    () => ({ ...mockExperienceDefault, ...mockExperience }),
    [mockExperience],
  )

  const progressValue = useMemo(
    () => ({ ...mockProgressDefault, ...mockProgress }),
    [mockProgress],
  )

  const profileValue = useMemo(
    () => ({ ...mockProfileDefault, ...mockProfile }) as any,
    [mockProfile],
  )

  const eventsTempValue = useMemo(() => mockEventsTempDefault as any, [])

  const claimEventValue = useMemo(
    () => mockClaimEventRewardDisplayDefault as any,
    [],
  )

  return (
    <UserContext.Provider value={userContextValue}>
      <WalletContext.Provider value={walletValue}>
        <InventoryContext.Provider value={inventoryValue}>
          <ExperienceContext.Provider value={experienceValue}>
            <ProgressContext.Provider value={progressValue}>
              <ProfileContext.Provider value={profileValue}>
                <EventsTempContext.Provider value={eventsTempValue}>
                  <ClaimEventRewardDisplayContext.Provider
                    value={claimEventValue}
                  >
                    {children}
                  </ClaimEventRewardDisplayContext.Provider>
                </EventsTempContext.Provider>
              </ProfileContext.Provider>
            </ProgressContext.Provider>
          </ExperienceContext.Provider>
        </InventoryContext.Provider>
      </WalletContext.Provider>
    </UserContext.Provider>
  )
}

// Re-export types for story customization
export type { ExperienceContextInterface, ProgressContextInterface }
