import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material"

interface School {
  id: string
  name: string
}

interface SchoolTableProps {
  schools: School[]
  fetchStudents: (schoolId: string) => void
  students: any[]
}

export function SchoolTable({
  schools,
  fetchStudents,
  students,
}: SchoolTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>School ID</TableCell>
            <TableCell>School Name</TableCell>
            {/* <TableCell>Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {schools.map((school) => (
            <TableRow key={school.id}>
              <TableCell>{school.id}</TableCell>
              <TableCell>{school.name}</TableCell>
              {/* <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => fetchStudents(school.id)}
                >
                  Fetch Students
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {students.length > 0 && (
        <Table style={{ marginTop: "20px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  )
}

export default SchoolTable
