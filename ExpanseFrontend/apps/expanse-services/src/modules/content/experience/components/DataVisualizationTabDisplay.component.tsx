"use client"
import { Box } from "@mui/system"
import { Tab } from "@mui/material"

import { BarChartSample, LineChartSample } from "@personalNext/content/samples"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { useState } from "react"

export function DataVisualizationTabDisplay() {
  const [tabValue, setTabValue] = useState("lineChart")

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  return (
    <Box flexGrow={1}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Line Chart" value="lineChart" />
            <Tab label="Bar Chart" value="barChart" />
          </TabList>
        </Box>

        <TabPanel value="lineChart">
          <Box display="flex" justifyContent="center">
            <LineChartSample />
          </Box>
        </TabPanel>
        <TabPanel value="barChart">
          <Box display="flex" justifyContent="center">
            <BarChartSample />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  )
}
export default DataVisualizationTabDisplay
