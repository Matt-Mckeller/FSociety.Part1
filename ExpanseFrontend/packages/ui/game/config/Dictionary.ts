export type ClaimEventRewardDisplayContent = {
  title: string
  openLootButton: string
  finishedButton: string
}
export const ClaimEventRewardDisplayDictionary: {
  [key: string]: ClaimEventRewardDisplayContent
} = {
  en: {
    title: "Your Rewards!",
    openLootButton: "Open Loot",
    finishedButton: "Return",
  },
}

export type ManageRewaradsDisplayContent = {
  name: string
  namePlaceholder: string
  description: string
  descriptionPlaceholder: string
  cost: string
  maxPurchaseQuantity: string
  maxPurchaseQuantityPlaceholder: string
}

export const ManageRewaradsDictionary: {
  [key: string]: ManageRewaradsDisplayContent
} = {
  en: {
    name: "Name",
    namePlaceholder: "Enter reward name",
    description: "Description ( Optional )",
    descriptionPlaceholder: "Enter reward description",
    cost: "Reward Cost ( Rarity )",
    maxPurchaseQuantity: "Max Purchase Quantity",
    maxPurchaseQuantityPlaceholder: "Enter max purchase quantity",
  },
}
