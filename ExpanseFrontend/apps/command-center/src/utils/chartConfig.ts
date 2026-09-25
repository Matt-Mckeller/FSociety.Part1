/**
 * Chart.js Configuration
 * Register all required Chart.js components for the app
 */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export { ChartJS }
