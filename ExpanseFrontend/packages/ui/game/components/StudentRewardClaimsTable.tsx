"use client"
import React, { useState, useEffect, useContext } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  Paper,
  IconButton,
  Collapse,
  Box,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import {
  AssignmentInterface,
  ClassInterface,
  RewardableEventInterface,
  SubmissionInterface,
} from "../types"
import { ProfileContext } from "expanse.ui/game"

interface StudentRewardClaimsTableProps {
  classes: ClassInterface[]
  classesAssignmentsMap: Record<string, AssignmentInterface[]>
  fetchSubmissionsAndRewardableEventsForMyAssignments: (
    assignmentIdAndClassIdInput: {
      elAssignmentId: string
      elClassId: string
    }[],
  ) => Promise<
    {
      submission: SubmissionInterface
      rewardableEvent: RewardableEventInterface
      assignmentId: string
      elAssignmentId: string
    }[]
  >
  claimReward: (rewardableEvents: RewardableEventInterface[]) => void
  loadingAssignments: boolean
}

const StudentRewardClaimsAssignmentsTable: React.FC<{
  assignments: AssignmentInterface[]
  submissionsAndRewardableEventsMap: Record<
    string, // assignmentId
    {
      submission: SubmissionInterface
      rewardableEvent: RewardableEventInterface
      assignmentId: string
      elAssignmentId: string
    }
  >
  handleExpandAssignment: (assignmentId: string) => void
  eligibileForRewardClaim: (assignmentId: string) => boolean
  getRewardStatus: (assignmentId: string) => boolean | string
  claimReward: (rewardableEventIds: RewardableEventInterface[]) => void
}> = ({
  assignments,
  submissionsAndRewardableEventsMap,
  handleExpandAssignment,
  eligibileForRewardClaim,
  getRewardStatus,
  claimReward,
}) => {
  console.log({ assignments })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({})
  const {
    loadingSubmissionsAndRewardableEventsForMyAssignments,
    loadingAssignmentsForMyClasses,
  } = useContext(ProfileContext)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRowClick = (assignmentId: string) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [assignmentId]: !prevOpenRows[assignmentId],
    }))
  }

  const unclaimedAssignments = assignments.filter((assignment) =>
    eligibileForRewardClaim(assignment.id),
  )
  // for each unclaimed assignment grab the id and grab the rewardable event from the submissionsAndRewardableEventsMap
  const allClaimableAssignmentRewardableEventIds =
    unclaimedAssignments.map((assignment) => {
      const submissionAndRewardableEvents =
        submissionsAndRewardableEventsMap[assignment.id]
      if (submissionAndRewardableEvents) {
        return submissionAndRewardableEvents.rewardableEvent
      }
      throw new Error(
        "Submission and Rewardable Events not found for assignment",
      )

      // return null
    }) || []

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Table size="small" aria-label="assignments">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>
              {loadingAssignmentsForMyClasses ||
              loadingSubmissionsAndRewardableEventsForMyAssignments ? (
                <CircularProgress size={20} />
              ) : allClaimableAssignmentRewardableEventIds.length > 0 ? (
                <Button
                  onClick={() =>
                    claimReward(allClaimableAssignmentRewardableEventIds)
                  }
                >
                  Claim All
                </Button>
              ) : (
                "No Claimable Rewards"
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((assignment) => (
              <React.Fragment key={assignment.elId}>
                <TableRow>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>
                    {new Date(assignment.dueDate).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </TableCell>
                  <TableCell>{getRewardStatus(assignment.id)}</TableCell>
                  <TableCell>
                    {eligibileForRewardClaim(assignment.id) ? (
                      <Button
                        onClick={() => {
                          claimReward([
                            submissionsAndRewardableEventsMap[assignment.id]
                              .rewardableEvent,
                          ])
                        }}
                      >
                        Claim Reward
                      </Button>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="flex-start">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={assignments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}

export const StudentRewardClaimsTable: React.FC<
  StudentRewardClaimsTableProps
> = ({
  classes,
  classesAssignmentsMap,
  fetchSubmissionsAndRewardableEventsForMyAssignments,
  claimReward,
}) => {
  const {
    rewardableEvents,
    loadingAssignmentsForMyClasses,
    submissionsAndRewardableEventsMap,
  } = useContext(ProfileContext)

  console.log({ submissionsAndRewardableEventsMap })
  const eligibileForRewardClaim = React.useCallback(
    (assignmentId: string): boolean => {
      console.log({ assignmentId, rewardableEvents })
      if (!rewardableEvents) return false
      const rewardableEvent = rewardableEvents?.find(
        (event) => event.assignmentId === assignmentId,
      )
      return rewardableEvent?.status === "CLAIMABLE"
    },
    [rewardableEvents],
  )

  const getRewardStatus = React.useCallback(
    (assignmentId: string): string => {
      console.log({
        getRewardStatusAssignmentId: assignmentId,
        rewardableEvents,
      })
      const rewardableEvent = rewardableEvents?.find(
        (event) => event.assignmentId === assignmentId,
      )
      if (!rewardableEvent) return "Unknown"
      if (rewardableEvent.status === "NOT_READY") return "Pending"
      if (rewardableEvent.status === "PROCESSING") return "Processing"
      if (rewardableEvent.status === "CLAIMABLE") return "Ready to Claim"
      if (rewardableEvent.status === "CLAIMED") return "Claimed"
      return "Unknown Status"
    },
    [rewardableEvents],
  )

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({})
  const [loadingSubmissions, setLoadingSubmissions] = useState<boolean>(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClassRowClick = async (classId: string) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [classId]: !prevOpenRows[classId],
    }))
    // if the row is being closed there is no need to refetch row data
    // if the row is being opened, fetch the submissions for the assignments
    // do want to allow refetching as well

    console.log("about to fetch submissions", { classesAssignmentsMap })
    setLoadingSubmissions(true)
    if (classesAssignmentsMap[classId].length > 0) {
      const requestData: {
        elAssignmentId: string
        elClassId: string
      }[] = []
      for (const assignment of classesAssignmentsMap[classId]) {
        requestData.push({
          elAssignmentId: assignment.elId,
          elClassId: classId,
        })
      }
      console.log("calling fetch submissions with", { requestData })
      await fetchSubmissionsAndRewardableEventsForMyAssignments(requestData)
    }
    setLoadingSubmissions(false)
  }

  const handleExpandAssignment = (assignmentId: string) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [assignmentId]: !prevOpenRows[assignmentId],
    }))
  }

  return (
    <>
      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Class Name</TableCell>
              <TableCell>Total Assignments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((classItem) => (
                <React.Fragment key={classItem.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleClassRowClick(classItem.elId)}
                      >
                        {openRows[classItem.elId] ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{classItem.name}</TableCell>
                    <TableCell>
                      {!(classItem.elId in classesAssignmentsMap) ? (
                        <CircularProgress size={20} />
                      ) : (
                        classesAssignmentsMap[classItem.elId]?.length || 0
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={3}
                    >
                      <Collapse
                        in={openRows[classItem.elId]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={1}>
                          <StudentRewardClaimsAssignmentsTable
                            assignments={
                              classesAssignmentsMap[classItem.elId] || []
                            }
                            submissionsAndRewardableEventsMap={
                              submissionsAndRewardableEventsMap
                            }
                            handleExpandAssignment={handleExpandAssignment}
                            eligibileForRewardClaim={eligibileForRewardClaim}
                            getRewardStatus={getRewardStatus}
                            claimReward={claimReward}
                          />
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={classes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
