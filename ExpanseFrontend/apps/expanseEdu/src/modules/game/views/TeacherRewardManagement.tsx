"use client"
import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react"
import { Box, Grid, Typography, CircularProgress, Button } from "@mui/material"
import {
  ProfileContext,
  RewardCard,
  RewardInterface,
  TeacherClassification,
  TeacherRewardForm,
} from "expanse.ui/game"
import { useQuery, useMutation } from "@apollo/client"
import {
  GET_MY_CREATED_REWARDS,
  DELETE_STORE_REWARD_OPTION,
} from "expanse.ui/game"
import { getApolloClient } from "expanse.ui/application"
import { LayoutContext } from "expanse.ui/application"
import { getApolloClientEdu } from "expanse.ui/application"

export const TeacherRewardManagement = () => {
  const [rewards, setRewards] = useState<
    RewardInterface<TeacherClassification>[]
  >([])
  const { showSnackbarError, showSnackbarSuccess } = useContext(LayoutContext)
  const { classesTaught, loadingClasses } = useContext(ProfileContext)

  const apolloClient = useMemo(() => getApolloClientEdu(), [])

  const { loading, error, data, refetch } = useQuery(GET_MY_CREATED_REWARDS, {
    client: apolloClient,
  })

  const [deleteStoreRewardOption] = useMutation(DELETE_STORE_REWARD_OPTION, {
    client: apolloClient,
  })

  const onFormSuccess = useCallback(() => {
    refetch()
  }, [refetch])

  const onRemoveReward = useCallback(
    async (rewardId: string) => {
      try {
        await deleteStoreRewardOption({
          variables: { input: { id: rewardId } },
        })
        showSnackbarSuccess("Reward removed successfully!")
        refetch()
      } catch (error) {
        showSnackbarError("Error removing reward!")
      }
    },
    [deleteStoreRewardOption, refetch, showSnackbarError, showSnackbarSuccess],
  )

  useEffect(() => {
    if (
      data &&
      data.myCreatedRewards &&
      JSON.stringify(data.myCreatedRewards) !== JSON.stringify(rewards)
    ) {
      setRewards(data.myCreatedRewards)
    }
    if (error) {
      showSnackbarError("Error fetching rewards!")
    }
  }, [data, error, showSnackbarError])

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignSelf="stretch"
      ml={8}
    >
      <Grid container spacing={16}>
        <Grid
          item
          zero={12}
          tablet={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2" mb={4}>
            Create store reward
          </Typography>
          <TeacherRewardForm
            onSuccess={onFormSuccess}
            taughtClasses={classesTaught}
            loadingTaughtClasses={loadingClasses}
          />
        </Grid>
        <Grid
          item
          gap={2}
          zero={12}
          tablet={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h2" mb={2}>
            Your store reward options
          </Typography>

          <Grid container spacing={2} justifyContent="space-between">
            {loading ? (
              <Grid item key={"loading-rewards"} zero={12}>
                <CircularProgress />
              </Grid>
            ) : (
              rewards.map((reward: RewardInterface<TeacherClassification>) => (
                <Grid item key={reward.id} zero={12} tablet={6}>
                  <Box
                    display="flex"
                    justifyContent={"center"}
                    flexDirection="column"
                    alignItems="center"
                    mb={2}
                  >
                    <RewardCard reward={reward} />
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => onRemoveReward(reward.id)}
                    >
                      Remove Reward Option
                    </Button>
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
