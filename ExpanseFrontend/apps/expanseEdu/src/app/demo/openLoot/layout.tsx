import { Box } from "@mui/system"
import { GameDrawer } from "expanse.ui/theme"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
      width="100%"
    >
      {children}
    </Box>
  )
}
