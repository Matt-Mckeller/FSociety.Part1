import { Metadata } from "next"
import { APISandbox } from "../../modules/api/APISandbox.component"
import { Box } from "@mui/system"

export const metadata: Metadata = {
  title: "GraphQL API Sandbox",
}
export default function ApiExplorer() {
  return (
    <Box my={8} flexGrow="1" display="flex" flexDirection="column">
      <APISandbox></APISandbox>
    </Box>
  )
}
