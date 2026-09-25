"use client"
import { Box } from "@mui/system"
import {
  ExperienceProvider,
  EventsTempProvider,
  WalletProvider,
  InventoryProvider,
  ClaimEventRewardsDisplayProvider,
  ClaimEventRewardDisplayModal,
  ProgressProvider,
  ProfileProvider,
} from "expanse.ui/game"
import { GameDrawer } from "expanse.ui/theme"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProfileProvider>
      <WalletProvider>
        <InventoryProvider>
          <ProgressProvider>
            <ClaimEventRewardsDisplayProvider
              claimRewardsPageRoute="/demo/claimEventRewards"
              openLootPageRoute="/demo/openLoot"
            >
              <EventsTempProvider>
                <ClaimEventRewardDisplayModal />
                <Box position="absolute">
                  <GameDrawer></GameDrawer>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  flexGrow={1}
                  width="100%"
                  pl={`${240 - 24}px`} // For the drawer
                >
                  <Box position="absolute">
                    <GameDrawer></GameDrawer>
                  </Box>
                  {children}
                </Box>
              </EventsTempProvider>
            </ClaimEventRewardsDisplayProvider>
          </ProgressProvider>
        </InventoryProvider>
      </WalletProvider>
    </ProfileProvider>
  )
}
