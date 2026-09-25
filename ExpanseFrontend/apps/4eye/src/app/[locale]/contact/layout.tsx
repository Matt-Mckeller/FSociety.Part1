import { Box } from "@mui/system"

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Box
      my={8}
      display="flex"
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
    >
      {children}
    </Box>
  )
}
