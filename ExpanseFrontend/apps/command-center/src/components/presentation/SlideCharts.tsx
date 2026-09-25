/**
 * Interactive Slide Charts
 * Maps specific slides to interactive Chart.js components
 * These replace static images with dynamic visualizations
 */
import { ComponentType } from "react"
import { Box, Typography } from "@mui/material"
import { Bar, Doughnut } from "react-chartjs-2"
import { alpha } from "@mui/material"
import "../../utils/chartConfig"
import { studentCounts } from "../../data/expanseEdu"

const CHART_COLORS = {
  primary: "#3B82F6",
  secondary: "#8B5CF6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#06B6D4",
  pink: "#EC4899",
  indigo: "#6366F1",
}

// TAM/SAM/SOM Mini Chart for market slides
export function TAMSAMSOMChart() {
  const data = {
    labels: ["TAM (Global)", "SAM (US+EN)", "SOM (5yr Target)"],
    datasets: [
      {
        data: [
          studentCounts.lmsUsers.global.total / 1e9,
          (studentCounts.lmsUsers.us.total +
            studentCounts.lmsUsers.global.total * 0.15) /
            1e9,
          (studentCounts.lmsUsers.us.initialFocus * 0.05) / 1e6,
        ],
        backgroundColor: [
          alpha(CHART_COLORS.primary, 0.7),
          alpha(CHART_COLORS.secondary, 0.7),
          alpha(CHART_COLORS.success, 0.7),
        ],
        borderColor: [
          CHART_COLORS.primary,
          CHART_COLORS.secondary,
          CHART_COLORS.success,
        ],
        borderWidth: 2,
      },
    ],
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", my: 2 }}>
      <Typography
        variant="subtitle2"
        textAlign="center"
        gutterBottom
        color="text.secondary"
      >
        Total Addressable Market Analysis
      </Typography>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number
                  if (context.dataIndex === 2)
                    return `${value.toFixed(1)}M students`
                  return `${value.toFixed(2)}B students`
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Students (Billions)" },
            },
          },
        }}
      />
    </Box>
  )
}

// Parse user counts from strings like "150 Million+" to numbers
const parseUserCount = (userString: string): number => {
  const str = userString.toLowerCase().replace(/[+,]/g, "")
  const num = parseFloat(str.replace(/[^\d.]/g, ""))
  if (str.includes("million")) return num
  if (str.includes("billion")) return num * 1000
  return num / 1e6 // Already in millions
}

// LMS Provider Market Share
export function LMSProviderChart() {
  const providerData = studentCounts.lmsProviders.map((p) => ({
    name: p.name,
    users: parseUserCount(p.users),
  }))

  const data = {
    labels: providerData.map((p) => p.name),
    datasets: [
      {
        data: providerData.map((p) => p.users),
        backgroundColor: [
          alpha(CHART_COLORS.primary, 0.7),
          alpha(CHART_COLORS.secondary, 0.7),
          alpha(CHART_COLORS.success, 0.7),
          alpha(CHART_COLORS.warning, 0.7),
          alpha(CHART_COLORS.info, 0.7),
          alpha(CHART_COLORS.pink, 0.7),
          alpha(CHART_COLORS.indigo, 0.7),
          alpha(CHART_COLORS.danger, 0.7),
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", my: 2 }}>
      <Typography
        variant="subtitle2"
        textAlign="center"
        gutterBottom
        color="text.secondary"
      >
        LMS Provider Market Share
      </Typography>
      <Doughnut
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "right",
              labels: { boxWidth: 12, font: { size: 10 } },
            },
            tooltip: {
              callbacks: {
                label: (context) =>
                  `${context.label}: ${(context.raw as number).toFixed(0)}M users`,
              },
            },
          },
        }}
      />
    </Box>
  )
}

// Student Distribution by Segment
export function StudentDistributionChart() {
  const segments = studentCounts.studentDistribution
  const data = {
    labels: segments.map((s) => s.segment),
    datasets: [
      {
        label: "Total Distribution",
        data: segments.map((s) => s.totalDistribution * 100),
        backgroundColor: alpha(CHART_COLORS.primary, 0.7),
        borderColor: CHART_COLORS.primary,
        borderWidth: 1,
      },
      {
        label: "K-12 Distribution",
        data: segments.map((s) => (s.k12Distribution || 0) * 100),
        backgroundColor: alpha(CHART_COLORS.success, 0.7),
        borderColor: CHART_COLORS.success,
        borderWidth: 1,
      },
    ],
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", my: 2 }}>
      <Typography
        variant="subtitle2"
        textAlign="center"
        gutterBottom
        color="text.secondary"
      >
        Student Distribution by Segment
      </Typography>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: { display: true, text: "Percentage (%)" },
            },
          },
        }}
      />
    </Box>
  )
}

// Revenue Opportunity Chart
export function RevenueOpportunityChart() {
  const data = {
    labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    datasets: [
      {
        label: "Conservative",
        data: [500000, 2000000, 8000000, 25000000, 75000000],
        backgroundColor: alpha(CHART_COLORS.info, 0.7),
        borderColor: CHART_COLORS.info,
        borderWidth: 2,
      },
      {
        label: "Moderate",
        data: [1000000, 5000000, 20000000, 60000000, 180000000],
        backgroundColor: alpha(CHART_COLORS.success, 0.7),
        borderColor: CHART_COLORS.success,
        borderWidth: 2,
      },
      {
        label: "Aggressive",
        data: [2000000, 10000000, 50000000, 150000000, 450000000],
        backgroundColor: alpha(CHART_COLORS.warning, 0.7),
        borderColor: CHART_COLORS.warning,
        borderWidth: 2,
      },
    ],
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", my: 2 }}>
      <Typography
        variant="subtitle2"
        textAlign="center"
        gutterBottom
        color="text.secondary"
      >
        5-Year Revenue Projections
      </Typography>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number
                  return `${context.dataset.label}: $${(value / 1e6).toFixed(1)}M`
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Revenue (USD)" },
              ticks: {
                callback: (value) => `$${(Number(value) / 1e6).toFixed(0)}M`,
              },
            },
          },
        }}
      />
    </Box>
  )
}

// US vs Global Market Size
export function USGlobalComparisonChart() {
  // Use available properties from the data
  const usTotal = studentCounts.lmsUsers.us.total
  const usInitial = studentCounts.lmsUsers.us.initialFocus
  const usSecondary = studentCounts.lmsUsers.us.secondaryFocus

  const globalTotal = studentCounts.lmsUsers.global.total
  const globalInitial = studentCounts.lmsUsers.global.initialFocus
  const globalHigherEd = studentCounts.lmsUsers.global.higherEd || 0

  const data = {
    labels: ["Initial Focus", "Secondary Focus", "Total"],
    datasets: [
      {
        label: "US Market",
        data: [usInitial / 1e6, usSecondary / 1e6, usTotal / 1e6],
        backgroundColor: alpha(CHART_COLORS.primary, 0.7),
        borderColor: CHART_COLORS.primary,
        borderWidth: 1,
      },
      {
        label: "Global Market",
        data: [globalInitial / 1e6, globalHigherEd / 1e6, globalTotal / 1e6],
        backgroundColor: alpha(CHART_COLORS.secondary, 0.7),
        borderColor: CHART_COLORS.secondary,
        borderWidth: 1,
      },
    ],
  }

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", my: 2 }}>
      <Typography
        variant="subtitle2"
        textAlign="center"
        gutterBottom
        color="text.secondary"
      >
        US vs Global LMS Users
      </Typography>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Users (Millions)" },
            },
          },
        }}
      />
    </Box>
  )
}

// Map of slide numbers to their interactive chart components
export const slideChartMap: Record<number, ComponentType> = {
  // Market size slides
  36: TAMSAMSOMChart,
  37: LMSProviderChart,
  38: StudentDistributionChart,
  39: USGlobalComparisonChart,
  // Revenue slides
  45: RevenueOpportunityChart,
  46: RevenueOpportunityChart,
}

// Helper to get chart for a slide
export function getSlideChart(slideNumber: number): ComponentType | null {
  return slideChartMap[slideNumber] || null
}
