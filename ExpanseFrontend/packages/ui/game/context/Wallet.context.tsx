"use client"
import { UserContext } from "expanse.ui/user"
import React, {
  useContext,
  useMemo,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from "react"
import { useQuery, useSubscription } from "@apollo/client"
import {
  CoinInterface,
  CoinVariant,
  EssenceVariant,
  GemVariant,
  LotteryTicketsVariant,
} from "expanse.ui/game"
import { getApolloClient, getApolloClientEdu } from "../../application"
import { GET_WALLET } from "../gql/wallet"

type WalletContextType = {
  coins: { [key in CoinVariant | string]?: CoinInterface }
  gems: { [key in GemVariant]?: number }
  tickets: { [key in LotteryTicketsVariant]?: number }
  essences: { [key in EssenceVariant]?: number }
  refetchWallet: () => Promise<void>
  addManualCoins: (variant: CoinVariant, amount: number) => void
  addManualGems: (variant: GemVariant, amount: number) => void
  addManualTickets: (variant: LotteryTicketsVariant, amount: number) => void
  addManualEssences: (variant: EssenceVariant, amount: number) => void
}

export const WalletContext = React.createContext<WalletContextType>(null)

type WalletProviderProps = {
  children: ReactNode
}
export const WalletProvider = ({ children }: WalletProviderProps) => {
  // Note: Will want to track changes through the backend to support multiple applications, and devices, shared state and scalability.
  // Keep this built in such a way that it can be

  const { user } = useContext(UserContext)
  const userIsAuthenticated: boolean = !!(user && user.id)
  const [coins, setCoins] = useState<{
    [key in CoinVariant | string]?: CoinInterface
  }>({})

  const handleAddManualCoins = useCallback(
    (variant: CoinVariant, amount: number) => {
      setCoins((prevCoins) => ({
        ...prevCoins,
        [variant]: (prevCoins[variant] || 0) + amount,
      }))
    },
    [],
  )

  const handleAddManualGems = useCallback(
    (variant: GemVariant, amount: number) => {
      setGems((prevGems) => ({
        ...prevGems,
        [variant]: (prevGems[variant] || 0) + amount,
      }))
    },
    [],
  )

  const handleAddManualTickets = useCallback(
    (variant: LotteryTicketsVariant, amount: number) => {
      setTickets((prevTickets) => ({
        ...prevTickets,
        [variant]: (prevTickets[variant] || 0) + amount,
      }))
    },
    [],
  )

  const handleAddManualEssences = useCallback(
    (variant: EssenceVariant, amount: number) => {
      setEssences((prevEssences) => ({
        ...prevEssences,
        [variant]: (prevEssences[variant] || 0) + amount,
      }))
    },
    [],
  )

  const apolloClient = useMemo(() => getApolloClientEdu(), [])

  const {
    loading: loadingWallet,
    error: errorWallet,
    data: walletData,
    refetch: refetchWallet,
  } = useQuery(GET_WALLET, {
    client: apolloClient,
  })

  useEffect(() => {
    const walletWithIdIndexes = {
      coins: {},
    }
    if (walletData) {
      walletData.wallet.coins.forEach((coin) => {
        walletWithIdIndexes["coins"][coin.coinId] = coin
      })
    }
    if (JSON.stringify(walletWithIdIndexes.coins) !== JSON.stringify(coins)) {
      setCoins(walletWithIdIndexes.coins)
    }
    // todo when do i refresh lol
  }, [walletData])

  const [gems, setGems] = useState<{ [key in GemVariant]?: number }>({
    xgems: 17,
  })
  const [tickets, setTickets] = useState<{
    [key in LotteryTicketsVariant]?: number
  }>({ weeklyLottery: 1, monthlyLottery: 1 })
  const [essences, setEssences] = useState<{
    [key in EssenceVariant]?: number
  }>({ scholarship: 23 })
  const values = useMemo(
    () => ({
      coins,
      gems,
      tickets,
      essences,
      refetchWallet,
      addManualCoins: handleAddManualCoins,
      addManualGems: handleAddManualGems,
      addManualTickets: handleAddManualTickets,
      addManualEssences: handleAddManualEssences,
    }),
    [
      coins,
      gems,
      tickets,
      essences,
      setCoins,
      setGems,
      setTickets,
      setEssences,
    ],
  )

  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  )
}
