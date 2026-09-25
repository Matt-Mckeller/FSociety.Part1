// Types are an extension of ed.link's types, see more on their documentation
// Picking fields that are used and adding custom fields for Expanse

export type SchoolRole =
  | "teacher"
  | "student"
  | "district-administrator"
  | "administrator"
  | "staff"
  | "observer"
  | "parent"
  | "guardian"
  | "ta"
  | "aide"
  | "designer"
  | "member"

export type EnrollmentState =
  | "active"
  | "inactive"
  | "dropped"
  | "upcoming"
  | "pending"
  | "completed"

export interface SchoolInterface {
  id: string
  name: string
}
export interface DistrictInterface {
  id: string
  name: string
  school_ids: string[]
}

export interface PersonInterface {
  id: string
  first_name: string
  last_name: string
  grade_levels: string
  school_ids: string
  district_id: string
}

export interface AssignmentInterface {
  id: string
  title: string
  rewardEvents: any[]
  dueDate: string
  elClassId: string
  elId: string
}

export interface SubmissionInterface {
  id: string
  elId: string
  personId: string
  assignmentId: string
  status: string
  grade: string
  rewardEventIds: string[]
}

export interface EnrollmentInterface {
  id: string
  person_id: string
  class_id: string
  role: SchoolRole
  section_id: string
  state: EnrollmentState
  primary: boolean // If there are multiple teachers, this will indicate the primary teacher, if there is one.
  start_date: string
  end_date: string
}

export interface ClassInterface {
  id: string
  elId: string
  name: string
  enrollments: EnrollmentInterface[]
}

export interface AttendanceTimeframeInterface {
  startDate: string
  endDate: string
  rewardEventIds: string[]
}

export interface Graduation {
  id: string
  type: "grade" | "school"
  value: string | number
  rewardEventIds: string[]
}
