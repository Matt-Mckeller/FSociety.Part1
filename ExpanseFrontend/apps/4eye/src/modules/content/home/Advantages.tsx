"use client"
import { useTranslations } from "next-intl"
import { Box, Grid, Paper, Typography } from "@mui/material"
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
  const t = useTranslations("home.advantages")
  const items = t.raw("items") as Array<{ label: string; description: string }>

  return (
    <Box display="flex" flexDirection={"column"} textAlign="left" width="100%">
      <Typography variant="h2" textAlign={"left"} mb={4}>
        {t("title")}
      </Typography>
      <Grid container spacing={4}>
        {items.map((item, index) => (
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
              label={item.label}
              description={formatContentMarkdown(item.description)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
