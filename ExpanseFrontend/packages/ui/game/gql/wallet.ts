import { gql } from "@apollo/client"

export const CURRENCY_SUBSCRIPTION = gql`
  subscription OnCurrencyChange($userID: string!) {
    currencyChanged(user: $userID) {
      userID
      coins
      gems
    }
  }
`

export const GET_WALLET = gql`
  query GetWallet {
    wallet {
      coins {
        coinId
        quantity
        name
        coinIconText
        schoolId
        classId
        courseId
      }
    }
  }
`
