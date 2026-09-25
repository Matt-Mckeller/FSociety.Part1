import { Box } from "@mui/system"
import { ContactDisplayProvider } from "expanse.ui/contact"
import { CONTACT_ROUTE } from "../../config"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ContactDisplayProvider contactPageRoute={CONTACT_ROUTE}>
      <Box
        my={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        flexGrow={1}
      >
        {children}
      </Box>
    </ContactDisplayProvider>
  )
}
