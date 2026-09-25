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
  IconButton,
  Collapse,
  Box,
  Typography,
} from "@mui/material"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"

interface AssignmentTableProps {
  assignments: {
    id: string
    title: string
    due_date: string
    status: string
  }[]
  assignmentSubmissionMap: {
    [assignmentId: string]: {
      person_id: string
      assignment_id: string
      status: string
      grade: string
    }[]
  }
}

export const AssignmentTable: React.FC<AssignmentTableProps> = ({
  assignments,
  assignmentSubmissionMap,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({})

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

  return (
    <>
      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Submissions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((assignment) => (
                <React.Fragment key={assignment.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleRowClick(assignment.id)}
                      >
                        {openRows[assignment.id] ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{assignment.id}</TableCell>
                    <TableCell>{assignment.title}</TableCell>
                    <TableCell>{assignment.due_date}</TableCell>
                    <TableCell>{assignment.status}</TableCell>
                    <TableCell>
                      {assignmentSubmissionMap[assignment.id]
                        ? assignmentSubmissionMap[assignment.id].length
                        : 0}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openRows[assignment.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={1}>
                          <Typography variant="h6" gutterBottom component="div">
                            Submissions
                          </Typography>
                          <Table size="small" aria-label="submissions">
                            <TableHead>
                              <TableRow>
                                <TableCell>Person ID</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Grade</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {assignmentSubmissionMap[assignment.id]?.map(
                                (submission) => (
                                  <TableRow key={submission.person_id}>
                                    <TableCell>
                                      {submission.person_id}
                                    </TableCell>
                                    <TableCell>{submission.status}</TableCell>
                                    <TableCell>{submission.grade}</TableCell>
                                  </TableRow>
                                ),
                              )}
                            </TableBody>
                          </Table>
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
        count={assignments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
