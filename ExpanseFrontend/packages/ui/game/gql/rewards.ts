import { gql } from "@apollo/client"

export const CREATE_REWARD = gql`
  mutation CreateReward($reward: NewRewardInput!) {
    createReward(reward: $reward) {
      id
      name
      category
      variant
      description
      cost
      limitMaxPurchase
      maxPurchaseQuantity
    }
  }
`

export const GET_MY_CREATED_REWARDS = gql`
  query GetRewards {
    myCreatedRewards {
      id
      name
      category
      variant
      description
      cost
      limitMaxPurchase
      maxPurchaseQuantity
      sharedIdentityIds
      classStoreId
      createdAt
      updatedAt
      coinId
    }
  }
`
export const GET_MY_OWNED_REWARDS = gql`
  query GetRewards {
    myOwnedRewards {
      id
      name
      category
      variant
      description
      quantity
      limitMaxPurchase
      maxPurchaseQuantity
      classStoreId
      createdAt
      updatedAt
      coinId
    }
  }
`

export const GET_CLASSROOM_STORE_REWARDS = gql`
  query GetMyClassroomStoreRewards {
    myClassroomStoreRewards {
      id
      elId
      name
      storeRewards {
        id
        name
        description
        cost
        limitMaxPurchase
        maxPurchaseQuantity
        category
        variant
      }
    }
  }
`

export const BUY_STORE_REWARD = gql`
  mutation BuyStoreReward($input: BuyStoreRewardInput!) {
    buyStoreReward(reward: $input)
  }
`

export const DELETE_STORE_REWARD_OPTION = gql`
  mutation DeleteStoreRewardOption($input: DeleteStoreRewardOptionInput!) {
    deleteStoreRewardOption(deleteStoreRewardOptionInput: $input)
  }
`
export const REDEEM_EVENT_REWARDS = gql`
  mutation RedeemEventRewards($rewardableEventIds: [String!]!) {
    redeemEventRewards(rewardableEventIds: $rewardableEventIds) {
      experienceIncrease
      userLevel
      rewardedCoins {
        id
        name
        addedCoins
      }
    }
  }
`
