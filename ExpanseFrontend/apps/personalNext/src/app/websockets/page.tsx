import { Box } from "@mui/system"
import { Metadata } from "next"
import { WebsocketSample } from "../../modules/content/samples"

export const metadata: Metadata = {
  title: "Websockets",
}
export default function SoftwareDevelopmentSamples() {
  return (
    <Box mt={8} width={"100%"} height="100%" minHeight="500px">
      <WebsocketSample />
    </Box>
  )
}
