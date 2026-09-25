"use client"
import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  Paper,
} from "@mui/material"

interface SubmissionTableProps {
  submissions: {
    id: string
    student_id: string
    assignment_id: string
    status: string
    grade: string
  }[]
}

export const SubmissionTable: React.FC<SubmissionTableProps> = ({
  submissions,
}) => {
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
      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Assignment ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.id}</TableCell>
                  <TableCell>{submission.student_id}</TableCell>
                  <TableCell>{submission.assignment_id}</TableCell>
                  <TableCell>{submission.status}</TableCell>
                  <TableCell>{submission.grade}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={submissions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
