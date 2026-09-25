import { Box } from "@mui/system"
import CloseIcon from "@mui/icons-material/Close"

export function CloseModalButton({ handleClose }: { handleClose: () => void }) {
  return (
    <Box
      onClick={handleClose}
      sx={{
        height: "36px",
        width: "36px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: (theme) => theme.palette.grey[500],
        cursor: "pointer",
        borderRadius: "50px",
        "&:hover": (theme) => ({ background: theme.palette.grey[200] }),
        transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      }}
    >
      <CloseIcon aria-label="close" />
    </Box>
  )
}
