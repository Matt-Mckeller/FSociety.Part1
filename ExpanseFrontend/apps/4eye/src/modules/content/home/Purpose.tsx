"use client"
import { useTranslations } from "next-intl"
import { Box, Grid, Paper, Typography } from "@mui/material"
import { formatContentMarkdown } from "expanse.ui/application"
import { useState } from "react"

const PurposeHighlightCard = ({ label, description }: any) => {
  const [hover, setHover] = useState(false)

  return (
    <Paper
      sx={{
        width: "300px",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        sx={{
          padding: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // position: "relative",
          height: "100%",
        }}
      >
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            opacity: hover ? 0 : 1,
            transition: "opacity .3s ease",
            position: "absolute",
            width: "280px",
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            opacity: hover ? 1 : 0,
            transition: "opacity .3s ease",
            position: "absolute",
            width: "280px",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Paper>
  )
}
export const Purpose = () => {
  const t = useTranslations("home.purpose")
  // Get items array - next-intl returns raw values for arrays
  const items = t.raw("items") as Array<{ label: string; description: string }>

  return (
    <Box display="flex" flexDirection={"column"} textAlign="left" width="100%">
      <Typography variant="h2" textAlign={"center"} mb={8}>
        {t("title")}
      </Typography>
      <Grid container spacing={4}>
        {items.map((item, index) => (
          <Grid
            container
            item
            zero={12}
            tablet={6}
            desktop={4}
            key={index}
            display="flex"
            justifyContent="center"
          >
            <PurposeHighlightCard
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
