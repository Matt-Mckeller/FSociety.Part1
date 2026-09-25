"use client"
import { Box, Grid, Paper, Typography } from "@mui/material"
import { HomeContent } from "./HomeContent"
import { formatContentMarkdown } from "expanse.ui/application"

const AdvantageCard = ({ label, description }: any) => {
  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Box mb={2} sx={{ padding: 4 }}>
        <Typography variant="body1" fontWeight="bold">
          {label}
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>
    </Paper>
  )
}
export const Advantages = () => {
  const content = HomeContent.en.advantages
  return (
    <Box display="flex" flexDirection={"column"} textAlign="left" width="100%">
      <Typography variant="h2" textAlign={"left"} mb={4}>
        {content.title}
      </Typography>
      <Grid container spacing={4}>
        {content.body.map((advantage, index) => (
          <Grid
            container
            item
            zero={12}
            key={index}
            display="flex"
            justifyContent="center"
          >
            <AdvantageCard
              key={index}
              label={advantage.label}
              description={formatContentMarkdown(advantage.description)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
