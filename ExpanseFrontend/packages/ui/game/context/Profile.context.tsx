"use client"
import { UserContext } from "expanse.ui/user"
import React, {
  useContext,
  useMemo,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react"
import {
  AssignmentInterface,
  ClassInterface,
  GET_ASSIGNMENTS_FOR_MY_CLASSES,
  GET_MY_CLASSES,
  GET_SUBMISSIONS_AND_REWARDABLE_EVENTS_FOR_MY_ASSIGNMENTS,
  RewardableEventInterface,
  SubmissionInterface,
} from "expanse.ui/game"
import { getApolloClientEdu } from "../../application"
import { useLazyQuery, useQuery } from "@apollo/client"

type ProfileContextType = {
  classes: ClassInterface[]
  classesTaught: ClassInterface[]
  classesStudied: ClassInterface[]
  loadingClasses: boolean
  displayName: string
  fetchAllStudentAssignments: () => void
  allAssignments: AssignmentInterface[]
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
  loadingSubmissionsAndRewardableEventsForMyAssignments: boolean
  loadingAssignmentsForMyClasses: boolean
  submissions: SubmissionInterface[]
  rewardableEvents: RewardableEventInterface[]
  submissionsAndRewardableEventsMap: {
    [assignmentId: string]: {
      submission: SubmissionInterface
      rewardableEvent: RewardableEventInterface
      assignmentId: string
      elAssignmentId: string
    }
  }
}

export const ProfileContext = React.createContext<ProfileContextType>(null)

type ProfileProviderProps = {
  children: ReactNode
}
export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const { user } = useContext(UserContext)
  const [classes, setClasses] = useState([])
  const [classesTaught, setClassesTaught] = useState<ClassInterface[]>([])
  const [classesStudied, setClassesStudied] = useState<ClassInterface[]>([])
  const [allAssignments, setAllAssignments] = useState<AssignmentInterface[]>(
    [],
  )
  const [submissions, setSubmissions] = useState<SubmissionInterface[]>([])
  const [
    submissionsAndRewardableEventsMap,
    setSubmissionsAndRewardableEventsMap,
  ] = useState<{
    [assignmentId: string]: {
      submission: SubmissionInterface
      rewardableEvent: RewardableEventInterface
      assignmentId: string
      elAssignmentId: string
    }
  }>({})
  const [rewardableEvents, setRewardableEvents] = useState<
    RewardableEventInterface[]
  >([])

  const apolloClient = useMemo(() => getApolloClientEdu(), [])
  const [
    getAssignmentsForMyClasses,
    {
      loading: loadingAssignmentsForMyClasses,
      error: errorAssignmentsForMyClasses,
    },
  ] = useLazyQuery(GET_ASSIGNMENTS_FOR_MY_CLASSES, {
    client: apolloClient,
  })

  const {
    loading,
    error,
    data: classData,
    refetch: refetchClasses,
  } = useQuery(GET_MY_CLASSES, {
    client: apolloClient,
  })

  // const [
  //   getStudentRewardableEventsForMyAssignments,
  //   {
  //     loading: loadingStudentRewardableEventsForMyAssignments,
  //     error: errorStudentRewardableEventsForMyAssignments,
  //   },
  // ] = useLazyQuery(GET_SUBMISSIONS_AND_REWARDABLE_EVENTS_FOR_MY_ASSIGNMENTS, {
  //   client: apolloClient,
  // })
  const [
    getSubmissionsAndRewardableEventsForMyAssigments,
    {
      loading: loadingSubmissionsAndRewardableEventsForMyAssignments,
      error: errorSubmissionsAndRewardableEventsForMyAssignments,
    },
  ] = useLazyQuery(GET_SUBMISSIONS_AND_REWARDABLE_EVENTS_FOR_MY_ASSIGNMENTS, {
    client: apolloClient,
  })

  const fetchSubmissionsAndRewardableEventsForMyAssignments = useCallback(
    async (
      elAssignmentIdWithClassId: {
        elAssignmentId: string
        elClassId: string
      }[],
    ) => {
      if (
        !elAssignmentIdWithClassId ||
        elAssignmentIdWithClassId.length === 0
      ) {
        throw new Error("Must provide assignment and class ids")
      }
      const response: any =
        await getSubmissionsAndRewardableEventsForMyAssigments({
          variables: { elAssignmentIdWithClassId },
        })

      const responseData =
        response?.data?.submissionsAndRewardableEventsForMyAssignments
      console.log({
        submissionsAndRewardableEventsForMyAssignments: responseData,
      })
      if (responseData) {
        // map submissions probably?
        const mappedSubmissions = responseData.map((item) => item.submission)
        const mappedRewardableEvents = responseData.map(
          (item) => item.rewardableEvent,
        )
        setSubmissions(mappedSubmissions)
        setRewardableEvents(mappedRewardableEvents)
        const mappedSubmissionsAndRewardableEventsWithAssignmentId = {}
        responseData.forEach((item) => {
          mappedSubmissionsAndRewardableEventsWithAssignmentId[
            item.assignmentId
          ] = item
        })
        setSubmissionsAndRewardableEventsMap(
          mappedSubmissionsAndRewardableEventsWithAssignmentId,
        )
      } else {
        setRewardableEvents([])
        setSubmissions([])
      }
      return responseData
    },
    [rewardableEvents, setRewardableEvents],
  )
  // const fetchStudentRewardableEventsForMyAssignments = useCallback(
  //   async (elAssignmentIds: string[]) => {
  //     if (!elAssignmentIds || elAssignmentIds.length === 0) {
  //       throw new Error("Must provide assignment ids")
  //     }
  //     const response: any = await getStudentRewardableEventsForMyAssignments({
  //       variables: { elAssignmentIds },
  //     })

  //     const responseData = response?.data?.submissionsForMyAssignments
  //     console.log({ submissionResponseData: responseData })
  //     if (responseData) {
  //       // map submissions probably?
  //       setSubmissions(responseData)
  //     } else {
  //       setSubmissions([])
  //     }
  //   },
  //   [submissions, setSubmissions],
  // )

  const fetchAllStudentAssignments = useCallback(async () => {
    if (!classesStudied || classesStudied.length === 0) {
      throw new Error("No classes studied")
    }
    const allAssignmentsResponse: any = await getAssignmentsForMyClasses({
      variables: { elClassIds: classesStudied.map((c) => c.elId) },
    })

    const assignmentsFromResponse =
      allAssignmentsResponse?.data?.assignmentsForMyClasses
    console.log({ assignmentsFromResponse })
    if (assignmentsFromResponse) {
      setAllAssignments(assignmentsFromResponse)
    } else {
      setAllAssignments([])
    }
  }, [classesStudied, allAssignments, setAllAssignments])

  useEffect(() => {
    const myClasses = classData?.myClasses
    if (!myClasses || !myClasses.length) {
      setClasses([])
      setClassesTaught([])
      setClassesStudied([])
      return
    }

    setClasses(classData?.myClasses)
    setClassesTaught(
      classData?.myClasses.filter((c) =>
        c.enrollments.some((e) => e.role === "teacher"),
      ),
    )
    setClassesStudied(
      classData?.myClasses.filter((c) =>
        c.enrollments.some((e) => e.role === "student"),
      ),
    )

    // todo when do i refresh lol
  }, [classData])

  const displayName = "User"

  const values = useMemo(
    () => ({
      classes,
      classesTaught,
      classesStudied,
      loadingClasses: loading,
      displayName,
      refetchClasses,
      fetchAllStudentAssignments,
      fetchSubmissionsAndRewardableEventsForMyAssignments,
      loadingSubmissionsAndRewardableEventsForMyAssignments,
      allAssignments,
      rewardableEvents,
      submissions,
      loadingAssignmentsForMyClasses,
      errorAssignmentsForMyClasses,
      submissionsAndRewardableEventsMap,
    }),
    [
      classes,
      classesTaught,
      classesStudied,
      loading,
      displayName,
      refetchClasses,
      fetchAllStudentAssignments,
      fetchSubmissionsAndRewardableEventsForMyAssignments,
      loadingSubmissionsAndRewardableEventsForMyAssignments,
      allAssignments,
      rewardableEvents,
      submissions,
      loadingAssignmentsForMyClasses,
      submissionsAndRewardableEventsMap,
    ],
  )

  return (
    <ProfileContext.Provider value={values}>{children}</ProfileContext.Provider>
  )
}
