import {
  LootBoxRewardTypes,
  ScholarshipVariant,
  PhysicalItemVariant,
  GiftCardVariant,
  FreeMealVariant,
  TicketVariant,
  SubscriptionVariant,
  ExternalGameVariant,
  ExpanseFoodVariant,
  ExpansePhysicalItemVariant,
  CoinVariant,
  GemVariant,
  ExperienceVariant,
  RecognitionVariant,
  LotteryTicketsVariant,
  EssenceVariant,
  GameEquipmentVariant,
  GameItemVariant,
  GameConsumablesVariant,
  GameTitleVariant,
  NftVariant,
} from "../types"

// typing to be fixed later idk, pain in the ass

type IndividualEntryCategoryVariantData = {
  [dictionaryIndex: string]: {
    [key: string]: string
    assetType: "image" | "component"
    assetValue: string
    alt: string
  }
}

type DefaultEntryVariantData = {
  [key: string]: string
}

export interface RewardContentDefaults {
  [key: string]: {
    coins: {
      [key in CoinVariant]: DefaultEntryVariantData | undefined
    }
    gems: {
      [key in GemVariant]: DefaultEntryVariantData | undefined
    }
    experience: {
      [key in ExperienceVariant]: DefaultEntryVariantData | undefined
    }
    lotteryTickets: {
      [key in LotteryTicketsVariant]: DefaultEntryVariantData | undefined
    }
    gameEssence: {
      [key in EssenceVariant]: DefaultEntryVariantData | undefined
    }
    // recognition: {
    //   [key in RecognitionVariant]: CategoryVariantData
    // }
  }
}
export interface RewardContentIndividualEntries {
  [key: string]: {
    scholarship: {
      [key in ScholarshipVariant]:
        | IndividualEntryCategoryVariantData
        | undefined
    }
    sponsorship: {
      physicalItem: {
        [key in PhysicalItemVariant]:
          | IndividualEntryCategoryVariantData
          | undefined
      }
      giftCard: {
        [key in GiftCardVariant]: IndividualEntryCategoryVariantData | undefined
      }
      freeMeal: {
        [key in FreeMealVariant]: IndividualEntryCategoryVariantData | undefined
      }
      ticket: {
        [key in TicketVariant]: IndividualEntryCategoryVariantData | undefined
      }
      subscription: {
        [key in SubscriptionVariant]:
          | IndividualEntryCategoryVariantData
          | undefined
      }
      externalGame: {
        [key in ExternalGameVariant]:
          | IndividualEntryCategoryVariantData
          | undefined
      }
      expanseFood: {
        [key in ExpanseFoodVariant]:
          | IndividualEntryCategoryVariantData
          | undefined
      }
      expansePhysicalItem: {
        [key in ExpansePhysicalItemVariant]:
          | IndividualEntryCategoryVariantData
          | undefined
      }
    }
    gameEquipment: {
      [key in GameEquipmentVariant]:
        | IndividualEntryCategoryVariantData
        | undefined
    }
    gameItem: {
      [key in GameItemVariant]: IndividualEntryCategoryVariantData | undefined
    }
    gameConsumables: {
      [key in GameConsumablesVariant]:
        | IndividualEntryCategoryVariantData
        | undefined
    }
    gameTitle: {
      [key in GameTitleVariant]: IndividualEntryCategoryVariantData | undefined
    }
    nft: {
      [key in NftVariant]: IndividualEntryCategoryVariantData | undefined
    }
    recognition: {
      [key in RecognitionVariant]:
        | IndividualEntryCategoryVariantData
        | undefined
    }
  }
}

export const RewardDictionaryIndividualEntries: RewardContentIndividualEntries =
  {
    en: {
      gameEquipment: {
        shield: {
          gameEquipment_shield1: {
            name: "Example Shield1",
            description: "A sturdy shield for protection.",
            assetType: "image",
            assetValue:
              "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
            alt: "Example Shield1 Image",
          },
        },
        sword: {
          gameEquipment_Sword1: {
            name: "Example Sword1",
            description: "A sharp sword for combat.",
            assetType: "image",
            assetValue:
              "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
            alt: "Example Sword1 Image",
          },
        },
      },
      gameItem: {
        potion: {
          gameItem_potion1: {
            name: "Potion 1",
            description: "A potion to restore health.",
            assetType: "image",
            assetValue:
              "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
            alt: "Potion 1 Image",
          },
        },
        scroll: {
          gameItem_scroll1: {
            name: "Scroll 1",
            description: "A scroll containing power ups.",
            assetType: "image",
            assetValue:
              "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
            alt: "Scroll 1 Image",
          },
        },
      },
      scholarship: {
        standard: {
          scholarshipStandardWorthyUniversity: {
            name: "Worthy University Scholarship",
            description: "A scholarship for Worthy University students.",
            assetType: "image",
            assetValue:
              "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
            alt: "Worthy University Scholarship Image",
          },
        },
      },
      sponsorship: {
        physicalItem: {
          tshirt: {
            "sponsorship-physicalItem-tshirt1": {
              name: "T-shirt 1",
              description: "A sponsored t-shirt.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "T-shirt 1 Image",
            },
          },
          mug: {
            sampleMug_maxwell1: {
              name: "Maxwell Mug",
              description: "A sponsored Maxwell mug.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Maxwell Mug Image",
            },
          },
          schoolSupplies: {
            sponsorship_physicalItem_schoolSupplies: {
              name: "School Supplies",
              description: "Sponsored school supplies.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "School Supplies Image",
            },
            sampleSchoolSupplies_pencil1: {
              name: "Pencils",
              description: "A set of sponsored pencils.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Pencils Image",
            },
          },
          toy: {
            sponsorship_expansePhysicalItem_toy: {
              name: "Toy",
              description: "A sponsored toy item.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Toy Image",
            },
            sampleToys_lego1: {
              name: "Lego Set",
              description: "A sponsored Lego set.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Lego Set Image",
            },
          },
          backpack: undefined,
        },
        giftCard: {
          standard: {
            sponsorshipGiftCard_wallyworld_1: {
              name: "Wallyworld Gift Card",
              description: "A gift card for Wallyworld.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Wallyworld Gift Card Image",
            },
            sponsorshipGiftCard_starpucks_1: {
              name: "Starpucks Gift Card",
              description: "A gift card for Starpucks.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Starpucks Gift Card Image",
            },
            sponsorshipGiftCard_tgt_1: {
              name: "Tgt Gift Card",
              description: "A gift card for Tgt.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Tgt Gift Card Image",
            },
          },
        },
        freeMeal: {
          pizza: {
            sponsorship_freeMeal_pizza: {
              name: "Free Meal - Pizza",
              description: "A free pizza meal.",
              assetType: "image",
              assetValue: "/assets/rewards/Pizza_300x300.jpg",
              alt: "Free Meal - Pizza Image",
            },
          },
          burger: {
            sponsorshipFreeMealMcDoPlan: {
              name: "McDoPlan's Free Meal",
              description: "A free meal at McDoPlan's.",
              assetType: "image",
              assetValue: "/assets/rewards/Hamburger_300x300.jpeg",
              alt: "McDoPlan's Free Meal Image",
            },
          },
        },
        expanseFood: {
          cookie: {
            sponsorshipExpanseCookie: {
              name: "Expanse Cookie",
              description: "A delicious expanse cookie.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Cookie Image",
            },
            sampleExpanseFood_cookie1: {
              name: "Expanse Chocolate Chip Cookie",
              description: "A delicious expanse chocolate chip cookie.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Chocolate Chip Cookie Image",
            },
          },
          cake: {
            sponsorship_expanseFood_cake: {
              name: "Expanse Cake",
              description: "A delicious expanse cake.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Cake Image",
            },
          },
          wings: {
            sponsorship_expanseFood_wings: {
              name: "Expanse Wings",
              description: "Delicious expanse wings.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Wings Image",
            },
            sampleExpanseFood_wings1: {
              name: "Expanse Boneless BBQ Wings",
              description: "Delicious expanse boneless BBQ wings.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Boneless BBQ Wings Image",
            },
          },
          pizza: {
            sponsorship_expanseFood_pizza: {
              name: "Expanse Pizza",
              description: "A delicious expanse pizza.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Pizza Image",
            },
          },
          candy: {
            sampleExpanseCandy_candy1: {
              name: "Expanse Candy",
              description: "A delicious expanse candy.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Candy Image",
            },
          },
          candyBar: {
            sampleExpanseCandybar_candyBar1: {
              name: "Expanse Candy Bar",
              description: "A delicious expanse candy bar.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Candy Bar Image",
            },
          },
          snack: {
            sampleExpanseSnack_popcorn1: {
              name: "Expanse Popcorn",
              description: "A delicious expanse popcorn.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Popcorn Image",
            },
            sampleExpanseSnack_chips1: {
              name: "Expanse Chips",
              description: "A delicious expanse chips.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Chips Image",
            },
          },
        },
        expansePhysicalItem: {
          toy: {
            sponsorship_expansePhysicalItem_toy: {
              name: "Toy",
              description: "A sponsored toy item.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Toy Image",
            },
            sampleExpansePhysicalItem_toy1: {
              name: "Expanse Plush Toy",
              description: "A sponsored expanse plush toy.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Plush Toy Image",
            },
          },
          schoolSupplies: {
            sponsorshipFreeSchoolSuppliesPencil: {
              name: "Free School Supplies - Pencil",
              description: "Sponsored school supplies - Pencil.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Free School Supplies - Pencil Image",
            },
            sampleExpansePhysicalItem_schoolSupplies_backpack1: {
              name: "Expanse Backpack",
              description: "A sponsored expanse backpack.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Expanse Backpack Image",
            },
          },
        },
        ticket: {
          event: {
            sponsorship_ticket_event: {
              name: "Event Ticket",
              description: "A ticket to an event.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Event Ticket Image",
            },
          },
          activity: {
            sponsorship_ticket_activity: {
              name: "Activity Ticket",
              description: "A ticket to an activity.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Activity Ticket Image",
            },
          },
          zoo: {
            sponsorship_ticket_zoo: {
              name: "Zoo Ticket",
              description: "A ticket to the zoo.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Zoo Ticket Image",
            },
            sampleZooTicket_kc1: {
              name: "Kansas City Zoo & Aquarium",
              description: "A ticket to the Kansas City Zoo & Aquarium.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Kansas City Zoo & Aquarium Ticket Image",
            },
          },
          amusementPark: {
            sponsorship_ticket_amusementPark: {
              name: "Amusement Park Ticket",
              description: "A ticket to an amusement park.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Amusement Park Ticket Image",
            },
            sampleAmusementParkTicket_kc1: {
              name: "Kansas City Worlds of Fun",
              description: "A ticket to Kansas City Worlds of Fun.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Kansas City Worlds of Fun Ticket Image",
            },
          },
          concert: {
            sponsorshipTicketConcert: {
              name: "Concert Ticket",
              description: "A ticket to a concert.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Concert Ticket Image",
            },
          },
        },
        subscription: {
          standard: {},
          edu: {
            sponsorshipSubscriptionUdemy: {
              name: "Udemy Class",
              description: "A free class on udemy.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Udemy Class Image",
            },
            sampleSubscription_edu_schoolhouseWorld1: {
              name: "Schoolhouse World Invitation",
              description: "An invitation to Schoolhouse World.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Schoolhouse World Invitation Image",
            },
          },
          other: undefined,
          game: undefined,
          entertainment: {
            sampleSubscription_entertainment_netflix: {
              name: "1m Free Netflix",
              description: "One month free Netflix subscription.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Netflix Subscription Image",
            },
          },
        },
        externalGame: {
          gameSkin: {
            sampleGameSkin_fortnite1: {
              name: "Fortnite Expanse Game Skin",
              description: "A Fortnite Expanse game skin.",
              assetType: "image",
              assetValue:
                "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
              alt: "Fortnite Expanse Game Skin Image",
            },
          },
          other: undefined,
        },
      },
      gameConsumables: {
        food: {
          gameConsumables_food1: {
            name: "Food",
            description: "Food consumables.",
            assetType: "image",
            assetValue:
              "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
            alt: "Food Consumables Image",
          },
        },
        drink: {
          gameConsumables_drink1: {
            name: "Drink",
            description: "Drink consumables.",
            assetType: "image",
            assetValue:
              "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
            alt: "Drink Consumables Image",
          },
        },
      },
      nft: {
        default: {
          nftSample_1: {
            name: "Purple Kitty",
            description: "A purple cat.",
            assetType: "image",
            assetValue:
              "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
            alt: "Purple cat artwork",
          },
          nftSample_2: {
            name: "Purple Tree",
            description: "A purple tree.",
            assetType: "image",
            assetValue:
              "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
            alt: "Purple tree artwork",
          },
          nftSample_3: {
            name: "Purple Backpack",
            description: "A purple backpack.",
            assetType: "image",
            assetValue:
              "https://storage.googleapis.com/expanse-public-assets/ImagePlaceholder.jpg",
            alt: "Purple backpack artwork",
          },
        },
      },
    },
  }

export const RewardDictionaryDefaults: RewardContentDefaults = {
  en: {
    gameEssence: {
      fire: {
        name: "Fire Essence",
        description: "Essence of fire element.",
      },
      water: {
        name: "Water Essence",
        description: "Essence of water element.",
      },
      scholarship: {
        name: "Scholarship Essence",
        description: "Essence for scholarships.",
      },
    },
    lotteryTickets: {
      weeklyLottery: {
        name: "Weekly Lottery Ticket",
        description: "A ticket for the weekly lottery.",
      },
      monthlyLottery: {
        name: "Monthly Lottery Ticket",
        description: "A ticket for the monthly lottery.",
      },
    },

    coins: {
      xcoins: {
        name: "Coins",
        description: "In-game currency coins.",
      },
    },
    gems: {
      xgems: {
        name: "Gems",
        description: "In-game currency gems.",
      },
      diamonds: {
        name: "Diamonds",
        description: "In-game currency diamonds.",
      },
      rubys: {
        name: "Rubys",
        description: "In-game currency rubys.",
      },
      emeralds: {
        name: "Emeralds",
        description: "In-game currency emeralds.",
      },
    },
    experience: {
      amount: {
        name: "Experience",
        description: "Experience points.",
      },
    },
  },
}
