/**
 * Expanse EDU Financials View
 * Main component that combines market size, costs, and acquisition timeline views
 */
import { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Typography,
} from '@mui/material'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import TimelineIcon from '@mui/icons-material/Timeline'
import BalanceIcon from '@mui/icons-material/Balance'

import { MarketSizeOverview } from './MarketSizeOverview'
import { CostAnalysis } from './CostAnalysis'
import { AcquisitionTimeline } from './AcquisitionTimeline'
import { BreakEvenAnalysis } from './BreakEvenAnalysis'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`expanse-edu-tabpanel-${index}`}
      aria-labelledby={`expanse-edu-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export function ExpanseEduFinancialsView() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        📊 Expanse EDU Market & Financial Analysis
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Market data, cost projections, and acquisition timelines for the EdTech platform.
      </Typography>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          '& .MuiTab-root': {
            minHeight: 48,
            textTransform: 'none',
            fontWeight: 500,
          }
        }}
      >
        <Tab 
          icon={<ShowChartIcon />} 
          iconPosition="start" 
          label="Market Size" 
        />
        <Tab 
          icon={<AttachMoneyIcon />} 
          iconPosition="start" 
          label="Cost Analysis" 
        />
        <Tab 
          icon={<TimelineIcon />} 
          iconPosition="start" 
          label="Acquisition Timeline" 
        />
        <Tab 
          icon={<BalanceIcon />} 
          iconPosition="start" 
          label="Break-Even Analysis" 
        />
      </Tabs>

      <TabPanel value={activeTab} index={0}>
        <MarketSizeOverview />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <CostAnalysis />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <AcquisitionTimeline />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <BreakEvenAnalysis />
      </TabPanel>
    </Box>
  )
}
