"use client"
import React, { useMemo, useState, useContext, useCallback } from "react"
import { useMediaQuery } from "@mui/material"
import { useRouter } from "next/navigation"
import { useLazyQuery, useMutation } from "@apollo/client"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { AnalyticsContext, getApolloClientEdu } from "../../application"
import {
  ClaimEventRewardDisplayContent,
  ClaimEventRewardDisplayDictionary,
} from "../config"
import {
  RedeemedEventRewardsInterface,
  RewardableEventInterface,
} from "../types"
import { LootBox } from "../classes/lootBox"
import { Wallet } from "@mui/icons-material"
import { WalletContext } from "./Wallet.context"
import { ProgressContext } from "./Progress.context"
import { REDEEM_EVENT_REWARDS } from "../gql"

interface ClaimEventRewardDisplayContextType {
  isModalOpen: boolean
  openClaimEventRewardDisplay: (
    claimableRewardElements: RewardableEventInterface[],
  ) => void
  exitClaimEventRewardDisplay: (exitType?: string) => void
  redeemEventRewards: (
    claimableRewardElements: RewardableEventInterface[],
  ) => Promise<RedeemedEventRewardsInterface>
  dictionary: ClaimEventRewardDisplayContent
  claimableEventRewardElements: RewardableEventInterface[]
  redeemedEventRewards: RedeemedEventRewardsInterface | null
  loadingEventRewards: boolean
  navigateToOpenLoot: () => void
}

export type RewardDisplayContextProps = {
  claimRewardsPageRoute: string
  openLootPageRoute: string
}

function useClaimEventRewardDisplayContext({
  claimRewardsPageRoute,
  openLootPageRoute,
}: RewardDisplayContextProps): ClaimEventRewardDisplayContextType {
  const { addManualCoins, addManualEssences, addManualGems, addManualTickets } =
    useContext(WalletContext)
  const { addManualExperience } = useContext(ProgressContext)
  const dictionary = ClaimEventRewardDisplayDictionary["en"]
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [claimableEventRewardElements, setClaimableEventRewardElements] =
    useState<RewardableEventInterface[]>([])
  const [redeemedEventRewards, setRedeemedEventRewards] =
    useState<RedeemedEventRewardsInterface | null>(null)
  const [loadingEventRewards, setLoadingEventRewards] = useState<boolean>(false)
  const userIsOnDesktop = useMediaQuery((theme: any) =>
    theme.breakpoints.up("laptop"),
  )
  const router = useRouter()
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const apolloClient = useMemo(() => getApolloClientEdu(), [])
  const [
    mutationRedeemEventRewards,
    {
      loading: loadingEventRewardsClaimResponse,
      error: errorEventRewardsClaimResponse,
    },
  ] = useMutation(REDEEM_EVENT_REWARDS, {
    client: apolloClient,
  })
  const { analyticsEventContext } = useContext(AnalyticsContext)

  const openClaimEventRewardModal = () => {
    registerAnalyticsEvent({
      variables: {
        event: "open-claim-rewards-modal",
        ...analyticsEventContext,
        params: null,
      },
    })
    setIsModalOpen(true)
  }

  // exitType: How did the user exit the contact? Did they exit because of a succesful submit, error, close button, etc
  const exitClaimEventRewardDisplay = (exitType?: string) => {
    // setClaimableRewardElements([])
    registerAnalyticsEvent({
      variables: {
        event: "exit-claim-reward-display",
        ...analyticsEventContext,
        params: JSON.stringify({
          type: exitType || "unknown",
        }),
      },
    })
    if (isModalOpen) {
      setIsModalOpen(false)
    } else {
      router.back()
    }
  }

  // I need to be able to track the status of reward events
  // in order to do this I need to have associated reward events that have a status of rewarded or pending which is the RewardEventInterface
  // I also need to know that the assignment has a rewardable event, if it doesnt then its not eligible for being claimed
  // i.e. its not completed yet
  // also, assignments may be submit multiple times so I need to account for this
  //   so, perhaps assignments have multiple associated reward events, and associated with the reward event
  //   is a score or something so I know what score was rewarded, if it goes up a new reward event with a smaller amount may be rewarded
  //
  // I need to track the claimable reward events and link assignments to reward events
  // in
  const openClaimEventRewardDisplay = (
    claimableRewardElements: RewardableEventInterface[],
  ) => {
    setClaimableEventRewardElements(claimableRewardElements)
    console.log({ claimableRewardElements })
    if (userIsOnDesktop === false) {
      registerAnalyticsEvent({
        variables: {
          event: "open-claim-rewards-screen",
          ...analyticsEventContext,
          params: null,
        },
      })
      router.push(claimRewardsPageRoute || "/demo/claimEventRewards")
    } else {
      openClaimEventRewardModal()
    }
  }

  const redeemEventRewards = useCallback(
    async (
      rewardElementsBeingRedeemed: RewardableEventInterface[],
    ): Promise<RedeemedEventRewardsInterface> => {
      console.log("Redeeming rewards for:", rewardElementsBeingRedeemed)

      setLoadingEventRewards(true)
      try {
        const allElementsExist = rewardElementsBeingRedeemed.every((element) =>
          claimableEventRewardElements.some(
            (claimableElement) => claimableElement.id === element.id,
          ),
        )
        const rewardableEventIds = rewardElementsBeingRedeemed.map(
          ({ id }) => id,
        )
        console.log({ rewardableEventIds })
        const response = await mutationRedeemEventRewards({
          variables: {
            rewardableEventIds,
          },
        })

        if (!response.data) {
          throw new Error("Failed to fetch reward data")
        }

        const { experienceIncrease, userLevel, rewardedCoins } =
          response.data as {
            experienceIncrease: number
            userLevel: number
            rewardedCoins: {
              id: string
              name: string
              addedCoins: number
            }[]
          }
        console.log({ redeemRewardsResponse: response })

        const FAKE_WALLET_REWARDS = {
          coins: {
            xcoins:
              (Math.floor(Math.random() * 5) + 1) *
              rewardElementsBeingRedeemed.length,
          },
          gems: {
            xgems:
              (Math.floor(Math.random() * 5) + 1) *
              rewardElementsBeingRedeemed.length,
          },
        }

        setRedeemedEventRewards({
          id,
          lootBoxes: [],
          experienceIncrease,
          walletIncrease: FAKE_WALLET_REWARDS,
        })

        if (!allElementsExist) {
          throw new Error("Some reward elements are not claimable")
        }

        // Add logic to redeem rewards here
        const rewards = {
          id: crypto.randomUUID(),
          experienceIncrease: 1 * rewardElementsBeingRedeemed.length,
          walletIncrease: {
            ...FAKE_WALLET_REWARDS,
            essences: {
              scholarship:
                (Math.floor(Math.random() * 5) + 1) *
                rewardElementsBeingRedeemed.length,
            },
            tickets: {
              weeklyLottery: 1 * rewardElementsBeingRedeemed.length,
              monthlyLottery: 1 * rewardElementsBeingRedeemed.length,
            },
          },
          lootBoxes: [LootBox.generateFake()],
        }
        setRedeemedEventRewards(rewards)
        addManualExperience(rewards.experienceIncrease)
        addManualCoins("xcoins", rewards.walletIncrease.coins.xcoins)
        addManualGems("xgems", rewards.walletIncrease.gems.xgems)
        addManualEssences(
          "scholarship",
          rewards.walletIncrease.essences.scholarship,
        )
        addManualTickets(
          "weeklyLottery",
          rewards.walletIncrease.tickets.weeklyLottery,
        )
        addManualTickets(
          "monthlyLottery",
          rewards.walletIncrease.tickets.monthlyLottery,
        )
        return rewards
      } finally {
        setLoadingEventRewards(false)
      }
    },
    [claimableEventRewardElements],
  )

  const navigateToOpenLoot = () => {
    setIsModalOpen(false)
    router.push(openLootPageRoute || "/demo/openLoot")
  }

  return {
    isModalOpen,
    openClaimEventRewardDisplay,
    exitClaimEventRewardDisplay,
    redeemEventRewards,
    claimableEventRewardElements,
    dictionary,
    redeemedEventRewards,
    loadingEventRewards,
    navigateToOpenLoot,
  }
}

export const ClaimEventRewardDisplayContext =
  React.createContext<ClaimEventRewardDisplayContextType>(null)

type EventRewardsDisplayProviderProps = {
  children: React.ReactNode
  claimRewardsPageRoute: string
  openLootPageRoute: string
}
export function ClaimEventRewardsDisplayProvider({
  children,
  claimRewardsPageRoute,
  openLootPageRoute,
}: EventRewardsDisplayProviderProps) {
  const {
    isModalOpen,
    openClaimEventRewardDisplay,
    exitClaimEventRewardDisplay,
    redeemEventRewards,
    claimableEventRewardElements,
    dictionary,
    redeemedEventRewards,
    loadingEventRewards,
    navigateToOpenLoot,
  } = useClaimEventRewardDisplayContext({
    claimRewardsPageRoute,
    openLootPageRoute,
  })

  const value: ClaimEventRewardDisplayContextType = useMemo(
    () => ({
      isModalOpen,
      openClaimEventRewardDisplay,
      exitClaimEventRewardDisplay,
      redeemEventRewards,
      dictionary,
      claimableEventRewardElements,
      redeemedEventRewards,
      loadingEventRewards,
      navigateToOpenLoot,
    }),
    [
      isModalOpen,
      openClaimEventRewardDisplay,
      exitClaimEventRewardDisplay,
      redeemEventRewards,
      dictionary,
      claimableEventRewardElements,
      redeemedEventRewards,
      loadingEventRewards,
      navigateToOpenLoot,
    ],
  )

  return (
    <ClaimEventRewardDisplayContext.Provider value={value}>
      {children}
    </ClaimEventRewardDisplayContext.Provider>
  )
}
