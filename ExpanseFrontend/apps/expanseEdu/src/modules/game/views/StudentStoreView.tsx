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
  BUY_STORE_REWARD,
  GET_CLASSROOM_STORE_REWARDS,
  RewardCard,
  RewardInterface,
  TeacherClassification,
  WalletBanner,
  WalletContext,
} from "expanse.ui/game"
import { useQuery, useMutation } from "@apollo/client"
import { getApolloClient, getApolloClientEdu } from "expanse.ui/application"
import { LayoutContext } from "expanse.ui/application"

interface ClassroomRewardsResponse {
  id: string
  elId: string
  name: string
  storeRewards: RewardInterface<TeacherClassification>[]
}
export const StudentStoreView = () => {
  const [classesAndRewards, setClassesAndRewards] = useState<
    ClassroomRewardsResponse[]
  >([])
  const { showSnackbarError, showSnackbarSuccess } = useContext(LayoutContext)
  const { refetchWallet } = useContext(WalletContext)

  const apolloClient = useMemo(() => getApolloClientEdu(), [])

  const { loading, error, data, refetch } = useQuery(
    GET_CLASSROOM_STORE_REWARDS,
    {
      client: apolloClient,
    },
  )

  const [buyStoreReward] = useMutation(BUY_STORE_REWARD, {
    client: apolloClient,
  })

  const onBuyReward = useCallback(
    async (rewardId: string) => {
      // todo add confirm dialog before making the call
      try {
        await buyStoreReward({
          variables: { input: { id: rewardId, quantity: 1 } },
        })
        showSnackbarSuccess(
          "Reward purchased successfully! Check your inventory.",
        )
        await refetchWallet()
      } catch (error) {
        showSnackbarError("Error buying reward!")
      }
    },
    [buyStoreReward, showSnackbarError, showSnackbarSuccess],
  )

  useEffect(() => {
    if (
      data &&
      data.myClassroomStoreRewards &&
      JSON.stringify(data.myClassroomStoreRewards) !==
        JSON.stringify(classesAndRewards)
    ) {
      // Move classes with with no rewards to the bottom
      const classWithRewards = [...data.myClassroomStoreRewards]
      classWithRewards.sort(
        (a: ClassroomRewardsResponse, b: ClassroomRewardsResponse) =>
          a.storeRewards.length === 0
            ? 1
            : b.storeRewards.length === 0
              ? -1
              : 0,
      )
      setClassesAndRewards(classWithRewards)
    }
    if (error) {
      showSnackbarError("Error fetching classroom store rewards!")
    }
  }, [data, error, showSnackbarError])
  console.log({ classesAndRewards })

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignSelf="stretch"
      position="relative"
      ml={8}
    >
      <Box
        // position="fixed"
        top={0}
        zIndex={1}
        bgcolor="background.paper"
        py={2}
      >
        <WalletBanner />
      </Box>
      <Typography variant="h1" mb={8}>
        Your Classroom Stores
      </Typography>

      <Grid container spacing={2} justifyContent="space-between">
        {loading ? (
          <Grid item key={"loading-rewards"} zero={12}>
            <CircularProgress />
          </Grid>
        ) : (
          classesAndRewards.map(
            (classroomWithRewards: ClassroomRewardsResponse) => (
              <Grid item key={classroomWithRewards.id} zero={12}>
                <Box key={classroomWithRewards.id}>
                  <Typography variant="h2" mb={4}>
                    {classroomWithRewards.name} Store
                  </Typography>
                </Box>
                {classroomWithRewards.storeRewards.length === 0 && (
                  <Box key={"noRewardsMessage" + classroomWithRewards.id}>
                    <Typography variant="h4">
                      No Rewards setup for this class!
                    </Typography>
                  </Box>
                )}
                <Grid
                  container
                  key={"container" + classroomWithRewards.id}
                  zero={12}
                >
                  {classroomWithRewards.storeRewards.length > 0 &&
                    classroomWithRewards.storeRewards.map((reward) => (
                      <Grid
                        item
                        key={"itemContainer" + reward.id}
                        zero={12}
                        tablet={6}
                      >
                        <Box
                          display="flex"
                          justifyContent={"center"}
                          flexDirection="column"
                          alignItems="center"
                          mb={2}
                          key={reward.id}
                        >
                          <RewardCard reward={reward} />

                          <Button
                            variant="text"
                            color="primary"
                            onClick={() => onBuyReward(reward.id as string)}
                          >
                            Buy Now
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            ),
          )
        )}
      </Grid>
    </Box>
  )
}
