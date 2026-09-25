import { Reward } from "../classes/reward"
import { Rarity, Currency } from "../types"

/*
Create sponsorship rewards in the demo data for each of the following types and variants
category: sponsorship, variantType: physicalItem, variantValue: schoolSupplies, dictionaryIndex: sampleSchoolSupplies_pencil1, name: "Pencils"
category: sponsorship, variantType: physicalItem, variantValue: toy, dictionaryIndex: sampleToys_lego1, name: "Lego Set"
category: sponsorship, variantType: physicalItem, variantValue: mug, dictionaryIndex: sampleMug_maxwell1, name: "Maxell Mug"
category: sponsorship, variantType: ticket, variantValue: zoo, dictionaryIndex: sampleZooTicket_kc1, name: "Kansas City Zoo & Aquarium"
category: sponsorship, variantType: ticket, variantValue: amusementPark, dictionaryIndex: sampleAmusementParkTicket_kc1, name: "Kansas City Worlds of Fun"
category: sponsorship, variantType: subscription, variantValue: edu, dictionaryIndex: sampleSubscription_edu_schoolhouseWorld1, name: "Schoolhouse World Invitation"
category: sponsorship, variantType: subscription, variantValue: entertainment, dictionaryIndex: sampleSubscription_entertainment_netflix, name: "1m Free Netflix"
category: sponsorship, variantType: externalGame, variantValue: gameSkin, dictionaryIndex: sampleGameSkin_fortnite1, name: "Fortnite Expanse Game Skin"
category: sponsorship, variantType: expanseFood, variantValue: cookie, dictionaryIndex: sampleExpanseFood_cookie1, name: "Expanse Chocolate Chip Cookie"
category: sponsorship, variantType: expanseFood, variantValue: wings, dictionaryIndex: sampleExpanseFood_wings1, name: "Expanse Boneless BBQ Wings"
category: sponsorship, variantType: expansePhysicalItem, variantValue: toy, dictionaryIndex: sampleExpansePhysicalItem_toy1, name: "Expanse Plush Toy"
category: sponsorship, variantType: expansePhysicalItem, variantValue: schoolSupplies, dictionaryIndex: sampleExpansePhysicalItem_schoolSupplies_backpack1, name: "Expanse Backpack"

category: sponsorship, variantType: expanseFood, variantValue: candy, dictionaryIndex: sampleExpanseCandy_candy1, name: "Expanse Candy"
category: sponsorship, variantType: expanseFood, variantValue: candyBar, dictionaryIndex: sampleExpanseCandybar_candyBar1, name: "Expanse Candy Bar"
category: sponsorship, variantType: expanseFood, variantValue: snack, dictionaryIndex: sampleExpanseSnack_popcorn1, name: "Expanse Popcorn"
category: sponsorship, variantType: expanseFood, variantValue: snack, dictionaryIndex: sampleExpanseSnack_chips1, name: "Expanse Chips"


Maybe larger rewards are for top performers? And more limited due to cost, will have to see
Candy, Candybar, Popcorn
School Rewards
Teacher Rewards
Art
These are cheaper

todo: teacher/school reward examples
*/

// Scholarship Rewards
export const scholarshipRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: 25,
    classification: {
      category: "scholarship",
      variant: "standard",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "scholarshipStandard",
    rarity: Rarity.UNCOMMON,
    tags: [],
    isTradeable: false,
  }),
]

// Sponsorship Rewards
export const sponsorshipRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: 10,
    classification: {
      category: "sponsorship",
      variant: { type: "expanseFood", value: "candy" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleExpanseCandy_candy1",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 15,
    classification: {
      category: "sponsorship",
      variant: { type: "expanseFood", value: "candyBar" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleExpanseCandybar_candyBar1",
    rarity: Rarity.UNCOMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 20,
    classification: {
      category: "sponsorship",
      variant: { type: "expanseFood", value: "snack" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleExpanseSnack_popcorn1",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 25,
    classification: {
      category: "sponsorship",
      variant: { type: "expanseFood", value: "snack" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleExpanseSnack_chips1",
    rarity: Rarity.EPIC,
    tags: [],
    isTradeable: false,
  }),
]

// Coin Rewards
export const coinRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: 100,
    classification: {
      category: "coins",
      variant: "xcoins",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
]

// Gem Rewards
export const gemRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: 15,
    classification: {
      category: "gems",
      variant: "xgems",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
]

// Experience Rewards
export const experienceRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: 200,
    classification: {
      category: "experience",
      variant: "amount",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "experience_amount",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
]

// Recognition Rewards
export const recognitionRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: "recognitionAnimation1",
    classification: {
      category: "recognition",
      variant: "animation",
      productAttributes: ["animated", "visual"],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "recognition_animation",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "recognitionText1",
    classification: {
      category: "recognition",
      variant: "text",
      productAttributes: ["progress"],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "recognition_text",
    rarity: Rarity.UNCOMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "recognitionBadge1",
    classification: {
      category: "recognition",
      variant: "badge",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "recognition_badge",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "homeworkAchiever10",
    classification: {
      category: "recognition",
      variant: "certificate",
      productAttributes: ["homework"],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "recognition_certificate",
    rarity: Rarity.EPIC,
    tags: [],
    isTradeable: false,
  }),
]

// Lottery Tickets Rewards
export const lotteryTicketsRewards: Reward[] = []

// Game Essence Rewards
export const gameEssenceRewards: Reward[] = []

// Game Equipment Rewards
export const gameEquipmentRewards: Reward[] = []

// Game Item Rewards
export const gameItemRewards: Reward[] = []

// Game Consumables Rewards
export const gameConsumablesRewards: Reward[] = []

// Game Title Rewards
export const gameTitleRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: "",
    classification: {
      category: "gameTitle",
      variant: "default",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "gameTitle_luckyDuck",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
]

// NFT Rewards
export const nftRewards: Reward[] = [
  new Reward({
    id: crypto.randomUUID(),
    value: "",
    classification: {
      category: "nft",
      variant: "default",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "nftSample_1",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: true,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "",
    classification: {
      category: "nft",
      variant: "default",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "nftSample_2",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: true,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "",
    classification: {
      category: "nft",
      variant: "default",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "nftSample_3",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: true,
  }),
]

export const LOOT_BOX_DEMO_DATA: any = [
  new Reward({
    id: crypto.randomUUID(),
    value: 5,
    classification: {
      category: "sponsorship",
      variant: { type: "giftCard", value: "standard" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "sponsorshipGiftCard_wallyworld_1",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: crypto.randomUUID(),
    classification: {
      category: "sponsorship",
      variant: { type: "subscription", value: "edu" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "sponsorshipSubscriptionUdemy",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 5,
    classification: {
      category: "sponsorship",
      variant: { type: "giftCard", value: "standard" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "sponsorshipGiftCard_starpucks_1",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: crypto.randomUUID(),
    classification: {
      category: "sponsorship",
      variant: { type: "freeMeal", value: "burger" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: undefined,
    dictionaryIndex: "sponsorshipFreeMealMcDoPlan",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: crypto.randomUUID(),
    classification: {
      category: "sponsorship",
      variant: { type: "expanseFood", value: "cookie" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "sponsorshipExpanseCookie",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: crypto.randomUUID(),
    classification: {
      category: "sponsorship",
      variant: { type: "expansePhysicalItem", value: "schoolSupplies" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "sponsorshipFreeSchoolSuppliesPencil",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: crypto.randomUUID(),
    classification: {
      category: "sponsorship",
      variant: { type: "ticket", value: "concert" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "sponsorshipTicketConcert",
    rarity: Rarity.EPIC,
    tags: [],
    isTradeable: false,
  }),

  new Reward({
    id: crypto.randomUUID(),
    value: crypto.randomUUID(),
    classification: {
      category: "sponsorship",
      variant: { type: "externalGame", value: "gameSkin" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "sampleGameSkin_fortnite1",
    rarity: Rarity.UNCOMMON,
    tags: [],
    isTradeable: false,
  }),

  new Reward({
    id: crypto.randomUUID(),
    value: 5,
    classification: {
      category: "sponsorship",
      variant: { type: "giftCard", value: "standard" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "sponsorshipGiftCard_tgt_1",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),

  new Reward({
    id: crypto.randomUUID(),
    value: "food",
    classification: {
      category: "gameConsumables",
      variant: "food",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "gameConsumables_food1",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "drink",
    classification: {
      category: "gameConsumables",
      variant: "drink",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "gameConsumables_drink1",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),

  ...nftRewards.slice(0, 1),
  new Reward({
    id: crypto.randomUUID(),
    value: "sword",
    classification: {
      category: "gameEquipment",
      variant: "sword",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "gameEquipment_Sword1",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
]
// may or may not be used
export const WALLET_DEMO_DATA = [
  new Reward({
    id: crypto.randomUUID(),
    value: "fire",
    classification: {
      category: "gameEssence",
      variant: "fire",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "gameEssence_fire",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "water",
    classification: {
      category: "gameEssence",
      variant: "water",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "gameEssence_water",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),

  new Reward({
    id: crypto.randomUUID(),
    value: 5,
    classification: {
      category: "lotteryTickets",
      variant: "weeklyLottery",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "lotteryTickets_weekly",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 5,
    classification: {
      category: "lotteryTickets",
      variant: "monthlyLottery",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "lotteryTickets_monthly",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),
]
export const INVENTORY_LOOT_DEMO_DATA = [
  new Reward({
    id: crypto.randomUUID(),
    value: 100,
    classification: {
      category: "scholarship",
      variant: "standard",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "scholarshipStandardWorthyUniversity",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),
  ...sponsorshipRewards,
  new Reward({
    id: crypto.randomUUID(),
    value: "shield",
    classification: {
      category: "gameEquipment",
      variant: "shield",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "gameEquipment_shield1",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "potion",
    classification: {
      category: "gameItem",
      variant: "potion",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "gameItem_potion1",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: "scroll",
    classification: {
      category: "gameItem",
      variant: "scroll",
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: undefined,
    dictionaryIndex: "gameItem_scroll1",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),
]
export const STORE_DEMO_DATA = [
  new Reward({
    id: crypto.randomUUID(),
    value: 10,
    classification: {
      category: "sponsorship",
      variant: { type: "physicalItem", value: "schoolSupplies" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleSchoolSupplies_pencil1",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 15,
    classification: {
      category: "sponsorship",
      variant: { type: "physicalItem", value: "toy" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleToys_lego1",
    rarity: Rarity.UNCOMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 20,
    classification: {
      category: "sponsorship",
      variant: { type: "physicalItem", value: "mug" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleMug_maxwell1",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 25,
    classification: {
      category: "sponsorship",
      variant: { type: "ticket", value: "zoo" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleZooTicket_kc1",
    rarity: Rarity.EPIC,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 30,
    classification: {
      category: "sponsorship",
      variant: { type: "ticket", value: "amusementPark" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleAmusementParkTicket_kc1",
    rarity: Rarity.LEGENDARY,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 35,
    classification: {
      category: "sponsorship",
      variant: { type: "subscription", value: "edu" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleSubscription_edu_schoolhouseWorld1",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 40,
    classification: {
      category: "sponsorship",
      variant: { type: "subscription", value: "entertainment" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleSubscription_entertainment_netflix",
    rarity: Rarity.UNCOMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 45,
    classification: {
      category: "sponsorship",
      variant: { type: "externalGame", value: "gameSkin" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleGameSkin_fortnite1",
    rarity: Rarity.RARE,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 50,
    classification: {
      category: "sponsorship",
      variant: { type: "expanseFood", value: "cookie" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleExpanseFood_cookie1",
    rarity: Rarity.EPIC,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 55,
    classification: {
      category: "sponsorship",
      variant: { type: "expanseFood", value: "wings" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleExpanseFood_wings1",
    rarity: Rarity.LEGENDARY,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 60,
    classification: {
      category: "sponsorship",
      variant: { type: "expansePhysicalItem", value: "toy" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleExpansePhysicalItem_toy1",
    rarity: Rarity.COMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: 65,
    classification: {
      category: "sponsorship",
      variant: { type: "expansePhysicalItem", value: "schoolSupplies" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),
    currency: Currency.USD,
    dictionaryIndex: "sampleExpansePhysicalItem_schoolSupplies_backpack1",
    rarity: Rarity.UNCOMMON,
    tags: [],
    isTradeable: false,
  }),
  new Reward({
    id: crypto.randomUUID(),
    value: undefined,
    classification: {
      category: "sponsorship",
      variant: { type: "physicalItem", value: "toy" },
      productAttributes: [],
    },
    uniqueRewardId: crypto.randomUUID(),

    currency: Currency.USD,
    dictionaryIndex: "sponsorship_physicalItem_tshirt1",
    rarity: Rarity.UNCOMMON,
    tags: [],
    isTradeable: false,
  }),
]

// ?
export const REDEEMED_LOOT_DEMO_DATA = []

const ALL_DEMO_DATA = [
  ...INVENTORY_LOOT_DEMO_DATA,
  ...STORE_DEMO_DATA,
  ...LOOT_BOX_DEMO_DATA,
  ...WALLET_DEMO_DATA,
  // ...gameTitleRewards,
  // ...nftRewards,
  // ...scholarshipRewards,
  // ...gemRewards,
  // ...experienceRewards,
  // ...lotteryTicketsRewards,
  // ...gameEssenceRewards,
  // ...gameEquipmentRewards,
  // ...gameItemRewards,
  // ...gameConsumablesRewards,
]
export const DEMO_DICTIONARY_INDEXES = ALL_DEMO_DATA.map(
  (reward) => reward.dictionaryIndex,
)
export const DEMO_DICTIONARY_INDEXES_AND_CLASSIFICATION = ALL_DEMO_DATA.map(
  (reward) => ({
    dictionaryIndex: reward.dictionaryIndex,
    classification: reward.classification,
  }),
)

// console.log({ DEMO_DICTIONARY_INDEXES_AND_CLASSIFICATION })
// console.log(JSON.stringify({ DEMO_DICTIONARY_INDEXES_AND_CLASSIFICATION }))
