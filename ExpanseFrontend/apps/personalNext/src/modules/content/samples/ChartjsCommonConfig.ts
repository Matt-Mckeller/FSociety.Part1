import { Theme, alpha } from "@mui/system"

/**
 *
 * Combines expanses defaults for chartjs which includes font and color configs
 * @param theme MUI Theme
 * @param customConfig The custom configuration for the chartjs object
 * @returns merged config object
 */
export const getExpanseChartJSConfig = (theme: Theme, customConfig: any) => {
  // Utilizing mergeObjects here to prevent nested overwrites
  function mergeObjects(obj1, obj2) {
    const keys = Object.keys(obj2)
    keys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(obj2, key)) {
        if (
          typeof obj2[key] === "object" &&
          obj2[key] !== null &&
          Object.prototype.hasOwnProperty.call(obj2, key) &&
          typeof obj1[key] === "object" &&
          obj1[key] !== null
        ) {
          // If both properties are objects, recursively merge them
          obj1[key] = mergeObjects(obj1[key], obj2[key])
        } else {
          // Otherwise, simply assign the value from obj2 to obj1
          obj1[key] = obj2[key]
        }
      }
    })
    return obj1
  }

  const commonConfig = {
    font: { family: "Xpens" },
    responsive: true,
    aspectRatio: 16 / 9,
    scales: {
      x: {
        grid: {
          color: alpha(theme.palette.text.primary, 0.36),
        },
        ticks: {
          color: theme.palette.text.primary,
          font: { family: "Xpens" },
          maxRotation: 60,
          minRotation: 60,
        },
      },
      y: {
        title: {
          display: true,
          color: theme.palette.text.primary,
          font: { family: "Xpens" },
        },
        grid: {
          color: alpha(theme.palette.text.primary, 0.36),
        },
        display: true,
        ticks: {
          callback: (label) => `${label}`,
          color: theme.palette.text.primary,
          font: { family: "Xpens" },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: theme.palette.text.primary,
          font: { family: "Xpens" },
          label: (tooltipItem: any) => {
            const label = tooltipItem.dataset.label || ""
            return label
          },
        },

        title: {
          font: { family: "Xpens" },
        },
      },
    },
  }
  return mergeObjects(commonConfig, customConfig)
}
