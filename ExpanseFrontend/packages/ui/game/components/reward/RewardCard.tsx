import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Diversity1Icon from "@mui/icons-material/Diversity1"
import {
  FamilyClassification,
  RewardInterface,
  SchoolClassification,
  TeacherClassification,
} from "../../types"
import Groups3Icon from "@mui/icons-material/Groups3"
import SchoolIcon from "@mui/icons-material/School"
import Tooltip from "@mui/material/Tooltip"

interface RewardCardProps {
  reward: RewardInterface<
    TeacherClassification | FamilyClassification | SchoolClassification
  >
  state?: "default" | "selected"
  onClick?: (
    reward: RewardInterface<
      TeacherClassification | FamilyClassification | SchoolClassification
    >,
  ) => void
}

export const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  state = "default",
  onClick,
}) => {
  const width = 300
  const height = 150

  const displayClassroom =
    reward.classStore && reward.classStore.name ? true : false
  const name = reward?.name || "Title"
  const description = reward?.description || null
  const numberOfIcons = 4
  const costValue = reward?.cost || "Unknown"
  const variant = "family"
  const category = reward?.classification?.category || "teacher"
  const cardIcon =
    category === "teacher" ? (
      <Groups3Icon />
    ) : category === "family" ? (
      <Diversity1Icon />
    ) : category === "school" ? (
      <SchoolIcon />
    ) : (
      <Groups3Icon />
    )

  const handleOnClick = () => {
    if (onClick) {
      onClick(reward)
    }
  }

  return (
    <Box
      sx={(theme) => ({
        width,
        height,
        background: theme.palette.primary.main,
        position: "relative",
        borderRadius: 5,
        cursor: onClick ? "pointer" : undefined,
      })}
      onClick={handleOnClick}
    >
      <Box
        sx={(theme) => ({
          width,
          height,
          border:
            state === "selected"
              ? `8px solid ${theme.palette.common.white}`
              : `6px solid ${theme.palette.common.white}`,
          position: "absolute",
          borderRadius: 5,
        })}
      ></Box>
      <Box
        sx={(theme) => ({
          width,
          height,
          border: `4px solid ${theme.palette.primary.main}`,
          position: "absolute",
          borderRadius: 5,
        })}
      ></Box>
      <Box
        data-testid="reward-card-content-container"
        sx={(theme) => ({
          width,
          height,
          padding: "14px", // 6 from border + 4 ( or 8 ) for styling
          position: "absolute",
          borderRadius: 5,
        })}
      >
        <Tooltip title={name}>
          <Typography
            sx={{
              height: 20,
              width: 150,
              mb: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: state === "selected" ? "bold" : "normal",
            }}
            // title={name}
            color={(theme) => theme.palette.primary.contrastText}
          >
            {name}
          </Typography>
        </Tooltip>

        {description && description.length > 0 ? (
          <Tooltip title={description}>
            <Typography
              sx={{
                height: 45,
                fontSize: 12,
                lineHeight: 1.2,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3, // Adjust the number of lines as needed
                fontWeight: state === "selected" ? "bold" : "normal",
              }}
              color={(theme) => theme.palette.primary.contrastText}
            >
              {description}
            </Typography>
          </Tooltip>
        ) : (
          <Box width="100%" gap="5px" display="flex" flexDirection={"column"}>
            <Box
              height="12px"
              width="60%"
              sx={(theme) => ({
                background: theme.palette.common.white + "C4",
                opacity: "56.3%",
                borderRadius: "10px",
              })}
            />
            <Box
              height="12px"
              width="40%"
              sx={(theme) => ({
                background: theme.palette.common.white + "C4",
                opacity: "56.3%",
                borderRadius: "10px",
              })}
            />
            <Box
              height="12px"
              width="20%"
              sx={(theme) => ({
                background: theme.palette.common.white + "C4",
                opacity: "56.3%",
                borderRadius: "10px",
              })}
            />
          </Box>
        )}

        <Box
          sx={(theme) => ({
            position: "absolute",
            top: 11,
            right: 14,
            color: theme.palette.common.white,
          })}
        >
          {cardIcon}
        </Box>
        <Box
          sx={(theme) => ({
            position: "absolute",
            bottom: 7,
            color: theme.palette.common.white,
          })}
        >
          {Array.from({ length: numberOfIcons }).map((_, index) => (
            <FavoriteIcon key={index} sx={{ height: "20px", width: "20px" }} />
          ))}
        </Box>
        {displayClassroom && (
          <Box
            sx={(theme) => ({
              position: "absolute",
              bottom: 29,
              color: theme.palette.common.white,
            })}
          >
            <Tooltip title={reward?.classStore?.name}>
              <Typography
                sx={{
                  maxWidth: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontWeight: state === "selected" ? "bold" : "normal",
                }}
              >
                {reward?.classStore?.name || "Classroom"}
              </Typography>
            </Tooltip>
          </Box>
        )}

        <Box
          sx={(theme) => ({
            position: "absolute",
            bottom: 11,
            right: 14,
            color: theme.palette.common.white,
          })}
        >
          <Typography>{costValue} Coins</Typography>
        </Box>
      </Box>
    </Box>
  )
}
