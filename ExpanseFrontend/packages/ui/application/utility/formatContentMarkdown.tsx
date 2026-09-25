import { Typography } from "@mui/material"

/*
  Replaces bold an italic with typography spans
  There may be an open source lib for this thats better idk, not needed yet
  And what to use probably depends on what backend content management system is eventually used
*/
export const formatContentMarkdown = (
  text: string,
  fontWeight: string | number = "bold",
) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/)
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <Typography key={index} component="span" fontWeight={fontWeight}>
          {part.slice(2, -2)}
        </Typography>
      )
    } else if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <Typography key={index} component="span" fontStyle="italic">
          {part.slice(1, -1)}
        </Typography>
      )
    }
    return part
  })
}
