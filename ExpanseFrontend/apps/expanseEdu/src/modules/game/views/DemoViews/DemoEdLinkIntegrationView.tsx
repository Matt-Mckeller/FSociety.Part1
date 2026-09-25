"use client"
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TableContainer,
  Paper,
  CircularProgress,
} from "@mui/material"
import {
  SchoolTable,
  StudentTable,
  ClassTable,
  AssignmentTable,
  SubmissionTable,
} from "expanse.ui/game"
import React, { useState, useEffect } from "react"

interface EdLinkSchoolInterface {
  id: string
  name: string
}

interface EdLinkPersonInterface {
  first_name: string
  last_name: string
  email: string
  grade_levels: string
  roles: ("student" | "teacher" | string)[]
}
interface EdLinkStudentInterface {
  id: string
  first_name: string
  last_name: string
  email: string
  grade_levels: string
}

interface EdLinkAssignmentInterface {
  id: string
  title: string
  due_date: string
  status: string
}

interface EdLinkClassInterface {
  id: string
  name: string
}

interface EdLinkSubmissionInterface {
  id: string
  person_id: string
  assignment_id: string
  status: string
  grade: string
}

interface EdLinkEnrollmentInterface {
  id: string
  person_id: string
  course_id: string
  role: string
}

export const DemoEdLinkIntegrationView = () => {
  const nextStepAfterSchool: "students" | "classes" = "classes"
  const [selectedIntegration, setSelectedIntegration] =
    useState<string>("Canvas")
  const [schools, setSchools] = useState<EdLinkSchoolInterface[]>([])
  const [students, setStudents] = useState<EdLinkStudentInterface[]>([])
  const [personsWithSubmissions, setPersonsWithSubmissions] = useState<{
    [key: string]: EdLinkPersonInterface & {
      assignmentId: string
      submission: []
    }
  }>({})
  const [allPeople, setAllPeople] = useState<EdLinkPersonInterface[]>([])
  const [classes, setClasses] = useState<EdLinkClassInterface[]>([])
  const [assignments, setAssignments] = useState<EdLinkAssignmentInterface[]>(
    [],
  )
  const [submissions, setSubmissions] = useState<EdLinkSubmissionInterface[]>(
    [],
  )

  const [assignmentSubmissionMap, setAssignmentSubmissionMap] = useState<{
    [assignmentId: string]: EdLinkSubmissionInterface
  }>({})
  const [enrollments, setEnrollments] = useState<EdLinkEnrollmentInterface[]>(
    [],
  )
  const [selectedSchool, setSelectedSchool] = useState<string>("")
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedEnrollment, setSelectedEnrollment] = useState<string>("")
  const [showSchoolsTable, setShowSchoolsTable] = useState<boolean>(false)
  const [showStudentsTable, setShowStudentsTable] = useState<boolean>(false)
  const [showClassesTable, setShowClassesTable] = useState<boolean>(false)
  const [showAssignmentsTable, setShowAssignmentsTable] =
    useState<boolean>(true)
  const [loadingSubmissions, setLoadingSubmissions] = useState<boolean>(false)
  const integrations = [
    { name: "Canvas", accessToken: "KVhsTUDfJWMoffX3b8sZqcpkk6mTUq0f" },
    {
      name: "Google Classroom",
      accessToken: "Kr0GRJIqZKmdExRezQjJdchtx8sPkoeV",
    },
    {
      name: "Schoology",
      accessToken: "LcGZOqfKejp3WpJpyhd2KVUAOiqFjJaj",
    },
    {
      name: "Blackboard",
      accessToken: "Uy1Cua3M8JX7z86XQ2grbkcwBfuOOVfl",
    },
  ]
  const accessToken = integrations.find(
    ({ name }) => name === selectedIntegration,
  )?.accessToken

  // Populate schools and people when the integration changes or initially
  const fetchSchools = async () => {
    console.log("fetching schools")
    try {
      // Example querying with parameters to ed.link
      const params = {
        $first: "100",
        // $expand: "assignments",
        // $filter: JSON.stringify({
        // name: [
        //   {
        //     operator: "starts with",
        //     value: "A",
        //   },
        // ],
        // }),
      }
      const queryString = new URLSearchParams(params).toString()
      const response = await fetch(
        `https://ed.link/api/v2/graph/schools?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const result = await response.json()
      if (result["$data"]) {
        const schools = result["$data"]
        setSchools(schools)
        setSelectedSchool(schools[0]?.id || "")
      } else {
        throw new Error("Unable to retrieve school data")
      }
    } catch (error) {
      console.error("Error fetching schools:", error)
    }
  }

  const fetchPeople = async () => {
    console.log("fetching people")
    try {
      const params = {
        // $first: "51",
        // Add other query parameters here
        $expand: "assignments",
        // 7p then bf then io, doesnt seem to work how I want it to work
        // $after: "ba4322d7-5323-4590-9579-9b3e6c951aac",
        $filter: JSON.stringify({
          // display_name: [
          //   {
          //     operator: "starts with",
          //     value: "A",
          //   },
          // ],
          // roles: [
          //   {
          //     operator: "in",
          //     value: "student",
          //   },
          // ],
        }),
      }
      const queryString = new URLSearchParams(params).toString()
      const response = await fetch(
        `https://ed.link/api/v2/graph/people?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const result = await response.json()
      if (result["$data"]) {
        setAllPeople(result["$data"])
      } else {
        throw new Error("Unable to retrieve people data")
      }
    } catch (error) {
      console.error("Error fetching people:", error)
    }
  }

  useEffect(() => {
    fetchSchools()
    fetchPeople()
  }, [selectedIntegration])

  // Populate school related data when the integration selection changes
  useEffect(() => {
    if (selectedSchool && selectedSchool.length > 0) {
      // TESTING FUNCTION?
      const fetchClassesForSchool = async (schoolId: string) => {
        console.log(`fetching classes for school ${schoolId}`)
        // ed.link/api/v2/graph/classes
        /*
         */
        try {
          const params = {
            $first: "1000",
            $expand: "people",
          }
          const queryString = new URLSearchParams(params).toString()
          const response = await fetch(
            `https://ed.link/api/v2/graph/schools/${schoolId}/classes/?${queryString}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
          const result = await response.json()
          console.log("Classes for school: ", schoolId)
          console.log("Data Count: ", result["$data"]?.length)
          console.log({ classes: result })

          if (result["$data"]) {
            console.log("here")
            const classes = result["$data"]
            setClasses(classes)
            if (classes.length > 0 && classes[0].id) {
              setSelectedClass(classes[0].id)
            } else {
              throw new Error(
                "There is a problem with the returned class data. Either no classes or there was no id associated with the first class.",
              )
            }
          } else {
            throw new Error("Unable to retrieve class data")
          }
        } catch (error) {
          console.error("Error fetching classes:", error)
        }
      }

      fetchClassesForSchool(selectedSchool)
    }
  }, [selectedSchool])

  // Populate course related data when the selected school changes
  useEffect(() => {
    if (selectedSchool && selectedSchool.length > 0) {
      const fetchClassesForSchool = async (schoolId: string) => {
        console.log(`fetching classes for school ${schoolId}`)
        // ed.link/api/v2/graph/classes
        try {
          const response = await fetch(
            `https://ed.link/api/v2/graph/schools/${schoolId}/classes/?$first=1000`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
          const result = await response.json()
          console.log("Classes for school: ", schoolId)
          console.log("Data Count: ", result["$data"]?.length)
          console.log({ classes: result })

          if (result["$data"]) {
            const classes = result["$data"]
            // a71d8fd8-5249-4884-a30b-f932615ff83a, 46778553-699c-4a33-a786-0605f9cad91b, 04524060-2f90-41c9-84f1-07f8fb1f2c03, 67cebbe3-80f1-4954-91e7-615df063518b, f13f6ffd-4522-4dea-aadf-d46ede7b1c4b0c412264-2244-47fb-bf28-e7af3cb8d4f4, f0dc7361-b147-42c2-be2e-583da6467122, 207e99d0-1eca-49d0-8354-23b9de6c2061, 1dccd4d0-f093-4700-b7d2-20b4bda4ea5e,
            const priorityClassIds = [
              "a71d8fd8-5249-4884-a30b-f932615ff83a",
              "46778553-699c-4a33-a786-0605f9cad91b",
              "04524060-2f90-41c9-84f1-07f8fb1f2c03",
              "67cebbe3-80f1-4954-91e7-615df063518b",
              "f13f6ffd-4522-4dea-aadf-d46ede7b1c4b",
              "0c412264-2244-47fb-bf28-e7af3cb8d4f4",
              "f0dc7361-b147-42c2-be2e-583da6467122",
              "207e99d0-1eca-49d0-8354-23b9de6c2061",
              "1dccd4d0-f093-4700-b7d2-20b4bda4ea5e",
            ]

            classes.sort((a, b) => {
              const aIndex = priorityClassIds.indexOf(a.id)
              const bIndex = priorityClassIds.indexOf(b.id)

              if (aIndex === -1 && bIndex === -1) {
                return 0
              } else if (aIndex === -1) {
                return 1
              } else if (bIndex === -1) {
                return -1
              }
              return aIndex - bIndex
            })
            console.log({ classesSorted: classes })
            setClasses(classes)
            if (classes.length > 0 && classes[0].id) {
              setSelectedClass(classes[0].id)
            }
            {
              throw new Error(
                "There is a problem with the returned class data. Either no classes or there was no id associated with the first class.",
              )
            }
          } else {
            throw new Error("Unable to retrieve class data")
          }
        } catch (error) {
          console.error("Error fetching classes:", error)
        }
      }

      fetchClassesForSchool(selectedSchool)
    }
  }, [selectedSchool])

  // Fetch Assignments, Submissions, and Students Related to a class when the selected class changes
  useEffect(() => {
    if (selectedClass && selectedClass.length > 0) {
      const fetchClassesForSchool = async (schoolId: string) => {
        console.log(`fetching classes for school ${schoolId}`)
        // ed.link/api/v2/graph/classes
        try {
          const response = await fetch(
            `https://ed.link/api/v2/graph/schools/${schoolId}/classes/?$first=100`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
          const result = await response.json()
          console.log("Classes for school: ", schoolId)
          console.log("Data Count: ", result["$data"]?.length)
          console.log({ classes: result })

          if (result["$data"]) {
            const classes = result["$data"]
            setClasses(classes)
            if (classes.length > 0 && classes[0].id) {
              setSelectedClass(classes[0].id)
            }
            {
              throw new Error(
                "There is a problem with the returned class data. Either no classes or there was no id associated with the first class.",
              )
            }
          } else {
            throw new Error("Unable to retrieve class data")
          }
        } catch (error) {
          console.error("Error fetching classes:", error)
        }
      }

      fetchClassesForSchool(selectedSchool)
    }
  }, [selectedSchool])

  const fetchAllAssignmentsAndSubmissionsForClasses = async (
    classes,
    allPeople,
  ) => {
    console.log("fetch all assignments and submissions for classes", {
      allPeople,
      classes,
    })
    const fetchAllAssignments = async (classId) => {
      const response = await fetch(
        `https://ed.link/api/v2/graph/classes/${classId}/assignments?$first=51`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const result = await response.json()
      return result
    }

    const fetchAllSubmissions = async (assignmentId, classId) => {
      const response = await fetch(
        `https://ed.link/api/v2/graph/classes/${classId}/assignments/${assignmentId}/submissions?$first=51`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const result = await response.json()
      return result
    }

    const allData: {
      [key: string]: {
        assignments: any[]
        submissions: Array<{
          submissionData: object
          submissionCount: number
          assignmentId: string
        }>
      }
    } = {}

    // await Promise.all(
    //   classes.slice(0, 3).map(async ({ id: classId }) => {
    //     const assignments = await fetchAllAssignments(classId)
    //     allData[classId] = {
    //       assignments: assignments["$data"],
    //       submissions: [],
    //     }

    //     await Promise.all(
    //       assignments["$data"]
    //         .slice(0, 25)
    //         .map(async ({ id: assignmentId }) => {
    //           const submissions = await fetchAllSubmissions(
    //             assignmentId,
    //             classId,
    //           )
    //           allData[classId]["submissions"].push({
    //             ...submissions["$data"],
    //             assignmentId: assignmentId,
    //             submissionCount: submissions["$data"].length,
    //           })
    //         }),
    //     )
    //   }),
    // )
    for (const { id: classId } of classes.slice(0, 10)) {
      const assignments = await fetchAllAssignments(classId)
      allData[classId] = { assignments: assignments["$data"], submissions: [] }

      for (const { id: assignmentId } of assignments["$data"].slice(0, 25)) {
        const submissions = await fetchAllSubmissions(assignmentId, classId)
        allData[classId]["submissions"].push({
          submissionData: submissions["$data"],
          assignmentId: assignmentId,
          submissionCount: submissions["$data"].length,
        })
      }
    }
    let countWithOneSubmission = 0
    let countWithMoreThanOneSubmission = 0

    for (const classId in allData) {
      for (const submissions of allData[classId]["submissions"]) {
        if (submissions.submissionCount > 1) {
          console.log("Submission with count > 1: ", submissions)
          Object.keys(submissions.submissionData).forEach((key) => {
            const submissionData = submissions.submissionData[key]
            const assignmentData = allData[classId].assignments
            // console.log({ nestedSubmission: submissionData, key })
            const data = {
              assignmentId: submissions.assignmentId,
              assignmentName: assignmentData.find(
                (assignment) => assignment.id === submissions.assignmentId,
              )?.title,
              person: allPeople.find(
                (person) => person.id === submissionData.person_id,
              ),
            }
            console.log("Data Object: ", data)
          })
          countWithMoreThanOneSubmission++
        } else {
          countWithOneSubmission++
        }
      }
    }

    if (countWithMoreThanOneSubmission === 0) {
      console.log("There were no submissions with a count greater than 1.")
    }

    console.log(
      "Number of submissions with exactly 1 submission: ",
      countWithOneSubmission,
    )

    console.log("All Data: ", allData)
  }

  const fetchStudents = async (schoolId: string) => {
    console.log(`fetching students for school ${schoolId}`)
    try {
      const response = await fetch(
        `https://ed.link/api/v2/graph/schools/${schoolId}/students?$first=100`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const result = await response.json()
      console.log("Students for school: ", schoolId)
      console.log("Data Count: ", result["$data"]?.length)
      console.log({ students: result })
      if (result["$data"]) {
        setStudents(result["$data"])
      } else {
        throw new Error("Unable to retrieve student data")
      }
    } catch (error) {
      console.error("Error fetching students:", error)
    }
  }

  const fetchAssignmentsForClass = async (classId: string) => {
    console.log(`fetching assignments for class ${classId}`)
    try {
      const response = await fetch(
        `https://ed.link/api/v2/graph/classes/${classId}/assignments?$first=100`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const result = await response.json()
      console.log("Assignments for class: ", classId)
      console.log("Data Count: ", result["$data"]?.length)
      console.log({ assignments: result })
      if (result["$data"]) {
        setAssignments(result["$data"])
      } else {
        throw new Error("Unable to retrieve assignment data")
      }
    } catch (error) {
      console.error("Error fetching assignments:", error)
    }
  }

  const fetchSubmissionsForAssignments = async (
    classId: string,
    assignments: EdLinkAssignmentInterface[],
  ) => {
    setLoadingSubmissions(true)
    const allSubmissions = []
    const assignmentSubmissionMap: any = {}
    for (const assignment of assignments) {
      try {
        const response = await fetch(
          `https://ed.link/api/v2/graph/classes/${classId}/assignments/${assignment.id}/submissions?$first=51`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        const result = await response.json()
        // console.log(`Submissions for assignment ${assignment.id}: `, result)
        // console.log(
        //   `Submissions for assignment count ${assignment.id}: `,
        //   result["$data"].length,
        // )
        if (result["$data"]) {
          result["$data"].assignment_id = assignment.id
          allSubmissions.push(...result["$data"])
          assignmentSubmissionMap[assignment.id] = result["$data"]
        } else {
          throw new Error("Unable to retrieve submission data")
        }
      } catch (error) {
        console.error(
          `Error fetching submissions for assignment ${assignment.id}:`,
          error,
        )
      }
    }
    setSubmissions(allSubmissions)
    setAssignmentSubmissionMap(assignmentSubmissionMap)
    setLoadingSubmissions(false)
  }

  const fetchEnrollments = async (classId: string) => {
    console.log(`fetching enrollments for class ${classId}`)
    try {
      const response = await fetch(
        `https://ed.link/api/v2/graph/classes/${classId}/enrollments/?$first=1000`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const result = await response.json()
      console.log("Enrollments for class: ", classId)
      console.log("Data Count: ", result["$data"]?.length)
      console.log({ enrollments: result })
      if (result["$data"]) {
        setEnrollments(result["$data"])
      } else {
        throw new Error("Unable to retrieve enrollment data")
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error)
    }
  }

  useEffect(() => {
    if (selectedClass) {
      fetchEnrollments(selectedClass)
      fetchAssignmentsForClass(selectedClass)
    }
  }, [selectedClass])

  useEffect(() => {
    if (selectedClass && assignments.length > 0) {
      fetchSubmissionsForAssignments(selectedClass, assignments)
    }
  }, [assignments])

  useEffect(() => {
    const mapPersonsToSubmissions = () => {
      const newPersonsWithSubmissions: {
        [key: string]: EdLinkPersonInterface & {
          assignmentId: string
          submission: []
        }
      } = {}

      for (const assignmentId in assignmentSubmissionMap) {
        const submissions = assignmentSubmissionMap[assignmentId]
        submissions.forEach((submission) => {
          const person = allPeople.find((p) => p.id === submission.person_id)
          if (person) {
            if (!newPersonsWithSubmissions[submission.person_id]) {
              newPersonsWithSubmissions[submission.person_id] = {
                ...person,
                assignmentId,
                submission: [],
              }
            }
            newPersonsWithSubmissions[submission.person_id].submission.push(
              submission,
            )
          }
        })
      }

      setPersonsWithSubmissions(newPersonsWithSubmissions)
      console.log({ newPersonsWithSubmissions })
    }

    mapPersonsToSubmissions()
  }, [assignmentSubmissionMap])

  const handleSchoolChange = (event) => {
    const schoolId = event.target.value
    setSelectedClass("")
    setSelectedSchool(schoolId)
  }

  const handleStudentChange = (schoolId, studentId) => {
    console.log("handle student change", { schoolId, studentId })
    setSelectedStudent(studentId)
  }

  const handleClassChange = (event) => {
    const classId = event.target.value
    setSelectedClass(classId)
  }

  const handleEnrollmentChange = (event) => {
    const enrollmentId = event.target.value
    setSelectedEnrollment(enrollmentId)
  }

  const toggleSchoolsTable = () => {
    setShowSchoolsTable(!showSchoolsTable)
  }

  const toggleStudentsTable = () => {
    setShowStudentsTable(!showStudentsTable)
  }

  const toggleClassesTable = () => {
    setShowClassesTable(!showClassesTable)
  }

  const toggleAssignmentsTable = () => {
    setShowAssignmentsTable(!showAssignmentsTable)
  }

  const handleIntegrationChange = (event) => {
    setSelectedIntegration(event.target.value)
  }

  // Blackboard Ultra (Product Demo) 14 ( in the 200s )
  // Nurs Fundamentals 06 ULTRA f0dc7361-b147-42c2-be2e-583da6467122 4 500s
  // ML BB Ultra Course 53 assignments a71d8fd8-5249-4884-a30b-f932615ff83a
  // Demo Course for: Quality Proctor.io 46778553-699c-4a33-a786-0605f9cad91b 100+ 500s
  // PU-QA-BB Ultra 67cebbe3-80f1-4954-91e7-615df063518b  50
  // "Daisy - Role 4: Course Builder" "04524060-2f90-41c9-84f1-07f8fb1f2c03" 57
  // "Megan new course Build" "f13f6ffd-4522-4dea-aadf-d46ede7b1c4b" 32
  // "Java  UAT Course" "0c412264-2244-47fb-bf28-e7af3cb8d4f4" 30
  // "Extempore PROD Blackboard API (SSO)" "207e99d0-1eca-49d0-8354-23b9de6c2061" 22
  // "Course Nov 22th" "1dccd4d0-f093-4700-b7d2-20b4bda4ea5e" 19

  // Testing section to find classes with a lot of submissions and assignments
  useEffect(() => {
    const findClassesWithManySubmissionsAndAssignments = async () => {
      if (classes.length > 0) {
        const classData = []
        return
        for (const classItem of classes.slice(600, 1000)) {
          const classId = classItem.id
          const assignmentsResponse = await fetch(
            `https://ed.link/api/v2/graph/classes/${classId}/assignments?$first=100`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
          const assignmentsResult = await assignmentsResponse.json()
          const assignmentsCount = assignmentsResult["$data"]?.length || 0

          // let submissionsCount = 0
          // if (assignmentsCount > 0) {
          //   for (const assignment of assignmentsResult["$data"]) {
          //     const submissionsResponse = await fetch(
          //       `https://ed.link/api/v2/graph/classes/${classId}/assignments/${assignment.id}/submissions?$first=51`,
          //       {
          //         headers: {
          //           Authorization: `Bearer ${accessToken}`,
          //         },
          //       },
          //     )
          //     const submissionsResult = await submissionsResponse.json()
          //     submissionsCount += submissionsResult["$data"]?.length || 0
          //   }
          // }

          classData.push({
            className: classItem.name,
            classId: classItem.id,
            assignmentsCount,
            // submissionsCount,
          })
        }

        // classData.sort((a, b) => b.submissionsCount - a.submissionsCount)
        classData.sort((a, b) => b.assignmentsCount - a.assignmentsCount)
        console.log("Classes sorted by assignments count:", classData)
        // console.log("Classes sorted by submissions count:", classData)
        console.log("Total classes: ", classes.length)
      }
    }

    findClassesWithManySubmissionsAndAssignments()
  }, [classes])

  return (
    <Box>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="integration-select-label">
          Select Integration
        </InputLabel>
        <Select
          labelId="integration-select-label"
          value={selectedIntegration}
          onChange={handleIntegrationChange}
        >
          {integrations.map((integration) => (
            <MenuItem key={integration.name} value={integration.name}>
              {integration.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" fullWidth>
        <InputLabel id="school-select-label">Select School</InputLabel>
        <Select
          labelId="school-select-label"
          value={selectedSchool}
          onChange={handleSchoolChange}
        >
          {schools.map((school) => (
            <MenuItem key={school.id} value={school.id}>
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="standard" fullWidth>
        <InputLabel id="class-select-label">Select Class</InputLabel>
        <Select
          labelId="class-select-label"
          value={selectedClass}
          onChange={handleClassChange}
        >
          {classes.map((classItem) => (
            <MenuItem key={classItem.id} value={classItem.id}>
              {classItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <FormControl fullWidth>
        <InputLabel id="enrollment-select-label">Select Enrollment</InputLabel>
        <Select
          labelId="enrollment-select-label"
          value={selectedEnrollment}
          onChange={handleEnrollmentChange}
        >
          {enrollments.map((enrollment) => (
            <MenuItem key={enrollment.id} value={enrollment.id}>
              {enrollment.person_id} - {enrollment.role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="student-select-label">Select Student</InputLabel>
        <Select
          labelId="student-select-label"
          value={selectedStudent}
          onChange={(e: any) =>
            handleStudentChange(selectedSchool, e.target.value)
          }
        >
          {students.map((student) => (
            <MenuItem key={student.id} value={student.id}>
              {student.first_name} {student.last_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

      {loadingSubmissions && (
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <CircularProgress />
          <Box ml={2}>
            Loading Submissions ( Delay due to testing environment )
          </Box>
        </Box>
      )}

      {/* <Button onClick={toggleSchoolsTable}>
        {showSchoolsTable ? "Hide Schools Table" : "Show Schools Table"}
      </Button>
      <Button onClick={toggleStudentsTable}>
        {showStudentsTable ? "Hide Students Table" : "Show Students Table"}
      </Button> */}
      {/* <Button onClick={toggleClassesTable}>
        {showClassesTable ? "Hide Classes Table" : "Show Classes Table"}
      </Button> */}
      <Button onClick={toggleAssignmentsTable}>
        {showAssignmentsTable
          ? "Hide Assignments Table"
          : "Show Assignments Table"}
      </Button>
      {/* {showSchoolsTable && (
        <TableContainer component={Paper} style={{ overflowX: "auto" }}>
          <SchoolTable
            schools={schools}
            fetchStudents={fetchStudents}
            students={students}
          />
        </TableContainer>
      )} */}

      {/* {showStudentsTable && (
        <TableContainer component={Paper} style={{ overflowX: "auto" }}>
          <StudentTable students={students} />
        </TableContainer>
      )} */}

      {/* {showClassesTable && (
        <TableContainer component={Paper} style={{ overflowX: "auto" }}>
          <ClassTable classes={classes} />
        </TableContainer>
      )} */}

      {showAssignmentsTable && (
        <TableContainer component={Paper} style={{ overflowX: "auto" }}>
          <AssignmentTable
            assignments={assignments}
            assignmentSubmissionMap={assignmentSubmissionMap as any}
          />
        </TableContainer>
      )}

      {/* <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <SubmissionTable submissions={submissions} />
      </TableContainer> */}
    </Box>
  )
}
