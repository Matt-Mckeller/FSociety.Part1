import { Metadata } from "next"
import { Box } from "@mui/system"
import { BusinessCardFront } from "../../modules/marketing/print/BusinessCardFront"
import { BusinessCardBackV1 } from "../../modules/marketing/print/BusinessCardBackV1"
import { BusinessCardBackV2 } from "../../modules/marketing/print/BusinessCardBackV2"
import {
  ReactAdV1Html2Canvas,
  SquareImageAdLayout_V1,
} from "../../modules/marketing/ads/SquareImageAdLayout_V1"
import { SquareImageAdLayout_V2 } from "../../modules/marketing/ads/SquareImageAdLayout_V2"

export const metadata: Metadata = {
  title: "Marketing Playground",
}
export default function Marketing() {
  return "wip"
  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Box width={100}></Box>
      {/* <ReactAdV1Html2Canvas></ReactAdV1Html2Canvas> */}
      {/* <ReactAdV2Google /> */}
      <BusinessCardBackV1 />
      <BusinessCardBackV2 />
      <BusinessCardFront />
      {/* <LinkedInBanner /> */}
      {/* <CanvasFilter /> */}
      <SquareImageAdLayout_V1
        assetName="PartTimeReactFreelancer"
        content={{
          title: "Part Time React Freelancer",
          location: "Remote, US",
        }}
      />
      <SquareImageAdLayout_V1
        assetName="PartTimeUIDevelopmentFreelancer"
        content={{
          title: "Part Time React UI Development",
          location: "Remote, US",
        }}
      />
      <SquareImageAdLayout_V1
        assetName="UIDevelopmentServices"
        content={{
          title: "React UI Development Services",
          location: "Remote, US",
          engagements: "Contract, Part Time, Project Leadership, C2C",
        }}
      />
      <SquareImageAdLayout_V2
        assetName="UIDevelopmentServicesForUtilities"
        content={{
          title: "UI Development Services For The Utility Industry",
          location: "Remote, US",
          technology: "Contract, Part Time, Project Leadership, C2C",
        }}
      />
      {/* <ReactAdV1Html2Canvas svgDataID={svgDataId} /> */}
    </Box>
  )
}
