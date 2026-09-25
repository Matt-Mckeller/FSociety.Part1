"use client"
import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material"

interface StudentTableProps {
  students: {
    id: string
    first_name: string
    last_name: string
    email: string
    grade_levels: string
  }[]
}

export const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Grade Levels</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.first_name}</TableCell>
                <TableCell>{student.last_name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.grade_levels}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
