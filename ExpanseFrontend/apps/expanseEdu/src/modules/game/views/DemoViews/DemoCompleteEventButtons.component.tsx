"use client"
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import { useContext, useState } from "react"
import { EventsTempContext } from "expanse.ui/game"

export const DemoCompleteEventButtons = () => {
  const { handleAddEvent } = useContext(EventsTempContext)
  const [selectedType, setSelectedType] = useState<string>("test")
  const handleChange = (event) => {
    setSelectedType(event.target.value as string)
  }
  return (
    <Box display="flex" flexDirection="column" width={300}>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label">
          Sample Reward Event Types
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedType}
          label="Reward Event Type"
          onChange={handleChange}
        >
          {/* <MenuItem value={"attendance"}>Attendance</MenuItem> */}
          <MenuItem value={"homework"}>Homework Completed</MenuItem>
          <MenuItem value={"test"}>Test Completed</MenuItem>
          <MenuItem value={"graduation"}>Graduation</MenuItem>
          <MenuItem value={"teacherRecognition"}>Teacher Recognition</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={() => {
          handleAddEvent(selectedType)
        }}
      >
        Trigger Event
      </Button>
    </Box>
  )
}
