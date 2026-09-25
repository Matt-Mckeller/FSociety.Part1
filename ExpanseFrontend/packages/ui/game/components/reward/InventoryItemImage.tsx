import { Box, Paper } from "@mui/material"
import {
  Classification,
  InventoryItemInterface,
  RewardInterface,
} from "../../types"
import { useInventoryItemDictionary, useRewardDictionary } from "../../hooks"
import { CoinStackIcon, ExperienceIcon, GemIcon } from "expanse.ui/theme"
import LocalActivityIcon from "@mui/icons-material/LocalActivity"
import FlareIcon from "@mui/icons-material/Flare"
import Image from "next/image"
interface Props {
  item: InventoryItemInterface
  width?: number
  height?: number
}
export const InventoryItemImage = ({
  item,
  width = 200,
  height = 200,
}: Props) => {
  const {
    dictionaryEntry,
    category,
    dictionaryType,
    variant,
    variantValue, // only returned for certain reward types, i.e. sponsorship that has many subtypes for variants
    dictionaryIndex,
  } = useInventoryItemDictionary(item)

  const UnknownItem = () => <div>Unknown Item</div>
  const NoImageComponent = () => <div>Still determining image</div>
  const getDictionaryImageComponent = () => {
    if (dictionaryType === "individual") {
      if (dictionaryEntry.assetType === "image") {
        return (
          <Image
            src={dictionaryEntry.assetValue}
            alt={dictionaryEntry.alt}
            fill={true}
          />
        )
      }
      return <NoImageComponent></NoImageComponent>
    }
    throw new Error(
      "Shouldnt be trying to get dictionary image component for default reward types",
    )
  }

  // todo update these to each have their own individual handlers
  // i.e. coins should handle its display, and game equipment should handle its own display
  // these will likely have tooltips and some may have animations or other functionality etc
  // and/or download buttons for nfts etc, some code exists for this
  const categoryVariantComponentMap = {
    scholarship: getDictionaryImageComponent,
    // scholarship: {
    //   standard: <NoImageComponent />,
    // },
    sponsorship: getDictionaryImageComponent,
    // sponsorship: {
    //   physicalItem: getDictionaryImageComponent,
    //   giftCard: getDictionaryImageComponent,
    //   freeMeal: getDictionaryImageComponent,
    //   ticket: getDictionaryImageComponent,
    //   subscription: getDictionaryImageComponent,
    //   externalGame: getDictionaryImageComponent,
    //   expanseFood: getDictionaryImageComponent,
    //   expansePhysicalItem: getDictionaryImageComponent,
    // },
    gameEquipment: getDictionaryImageComponent,
    gameItem: getDictionaryImageComponent,
    gameConsumables: getDictionaryImageComponent,
    gameTitle: getDictionaryImageComponent,
    nft: getDictionaryImageComponent,
    recognition: getDictionaryImageComponent,
  }

  if (dictionaryEntry === undefined) {
    console.error("Unknown dictionary entry", { dictionaryIndex })
  }
  // Will also need to update this when updating the above handling of the mapping
  const ImageComponent =
    dictionaryEntry === undefined ? (
      <UnknownItem />
    ) : Object.keys(categoryVariantComponentMap).includes(category) ? (
      categoryVariantComponentMap[category]()
    ) : (
      <NoImageComponent />
    )

  return (
    // Position relative is needed for the image to be able to be positioned by nextjs
    <Box sx={{ width, height, p: 4, position: "relative" }}>
      {ImageComponent}
    </Box>
  )
}
