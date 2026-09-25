"use client"
import { Box, CircularProgress, Typography } from "@mui/material"
import {
  SchoolTable,
  StudentTable,
  ClassTable,
  AssignmentTable,
  SubmissionTable,
  StudentRewardClaimsTable,
  ClaimEventRewardDisplayContext,
  PersonInterface,
  ClassInterface,
  AssignmentInterface,
  SubmissionInterface,
  ProfileContext,
  SchoolInterface,
  RewardableEventInterface,
} from "expanse.ui/game"
import { SectionSpacer } from "expanse.ui/theme"
import React, { useState, useEffect, useRef, useContext } from "react"

export const DemoEdLinkIntegrationStudentView = () => {
  const {
    classesStudied,
    loadingClasses,
    displayName,
    fetchAllStudentAssignments,
    allAssignments,
    fetchSubmissionsAndRewardableEventsForMyAssignments,
    loadingSubmissionsAndRewardableEventsForMyAssignments,
    submissions,
    rewardableEvents,
    submissionsAndRewardableEventsMap,
  } = useContext(ProfileContext)
  const [classesAssignmentsMap, setClassesAssignmentsMap] = useState<
    Record<string, AssignmentInterface[]>
  >({})
  const { openClaimEventRewardDisplay } = useContext(
    ClaimEventRewardDisplayContext,
  )

  const [assignmentSubmissionMap, setAssignmentSubmissionMap] = useState<{
    [assignmentId: string]: SubmissionInterface
  }>({})

  const [loadingAssignments, setLoadingAssignments] = useState<boolean>(false)

  // fetchAssignments for class, fetch rewardableEvents / fetch submissions for assignment,
  // pagination for rewardable events or submissions and assignments
  // claimReward, acceptEventRewards, openLootBox
  // experience,

  const handleFetchSubmissionsAndRewardableEvents = async (
    assignmentIdAndClassIdInput: {
      elAssignmentId: string
      elClassId: string
    }[],
  ): Promise<
    {
      submission: SubmissionInterface
      rewardableEvent: RewardableEventInterface
      assignmentId: string
      elAssignmentId: string
    }[]
  > => {
    try {
      console.log(
        "fetching submissions for assignments",
        assignmentIdAndClassIdInput,
      )
      const results = await fetchSubmissionsAndRewardableEventsForMyAssignments(
        assignmentIdAndClassIdInput,
      )

      console.log({ submissionAndRewardableEventResults: results })
      return results
    } catch (error) {
      console.error("Error fetching submissions or rewardable events:", error)
      throw error
    }
  }

  const claimReward = (rewardableEvents: RewardableEventInterface[]) => {
    console.log("claim reward assignment ids", { rewardableEvents })
    if (Array.isArray(rewardableEvents)) {
      openClaimEventRewardDisplay(rewardableEvents)
    } else {
      throw new Error("Must provide an array of rewardableEvents")
    }
  }

  useEffect(() => {
    if (classesStudied && classesStudied.length > 0) {
      fetchAllStudentAssignments()
    }
  }, [classesStudied])

  useEffect(() => {
    console.log("all assignments changed in student view", {
      allAssignments,
      allAssignmentsLength: allAssignments?.length,
    })
    if (allAssignments && allAssignments.length > 0) {
      const classesAssignmentsMap: {
        [classId: string]: AssignmentInterface[]
      } = {}
      classesStudied.forEach((elClass) => {
        classesAssignmentsMap[elClass.elId] = []
      })
      allAssignments.forEach((assignment) => {
        if (!classesAssignmentsMap[assignment.elClassId]) {
          console.error("No class found for assignment", assignment)
          return
        }
        classesAssignmentsMap[assignment.elClassId].push(assignment)
      })
      setClassesAssignmentsMap(classesAssignmentsMap)
      console.log({ classesAssignmentsMap })
    } else {
      setClassesAssignmentsMap({})
    }
  }, [allAssignments])

  useEffect(() => {
    console.log("submissions changed in student view", {
      submissions,
    })
    if (submissions && submissions.length > 0) {
      const updatedAssignmentSubmissionMap: {
        [elAssignmentId: string]: SubmissionInterface
      } = {
        ...assignmentSubmissionMap,
      }
      submissions.forEach((submission) => {
        updatedAssignmentSubmissionMap[submission.assignmentId] = submission
      })
      setAssignmentSubmissionMap(updatedAssignmentSubmissionMap)
      console.log({ updatedAssignmentSubmissionMap })
    } else {
      setAssignmentSubmissionMap({ ...assignmentSubmissionMap })
    }
  }, [submissions])

  return (
    <Box mt={2}>
      <Typography>
        Welcome {displayName}, below you can find your list of assignments and
        redeem your currency and rewards for any completed events that have not
        yet been redeemed!
      </Typography>
      <SectionSpacer size="small" />

      {loadingClasses && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress />
          <Typography>Loading classes...</Typography>
        </Box>
      )}

      <Typography variant="h2" mb={2}>
        Classes & Assignments
      </Typography>
      <StudentRewardClaimsTable
        classes={classesStudied}
        classesAssignmentsMap={classesAssignmentsMap as any}
        fetchSubmissionsAndRewardableEventsForMyAssignments={
          handleFetchSubmissionsAndRewardableEvents
        }
        submissions={submissions}
        rewardableEvents={rewardableEvents}
        claimReward={claimReward}
        loadingAssignments={loadingAssignments}
      />
    </Box>
  )
}
