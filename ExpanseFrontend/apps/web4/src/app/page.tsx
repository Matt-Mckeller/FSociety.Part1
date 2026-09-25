import { Box, Typography } from "@mui/material"

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
    >
      <Typography variant="h1">Web4</Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome to your new Next.js app
      </Typography>
    </Box>
  )
}
