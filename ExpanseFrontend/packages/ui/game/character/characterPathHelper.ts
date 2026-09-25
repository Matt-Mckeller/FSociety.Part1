export type PathCoordinates = {
  x: number
  y: number
}

export type ArcParameters = {
  arcRadius?: number
  arcSweepFlag?: number
  arcLargeFlag?: number
}

export const getCharacterPathData = (points: PathCoordinates[]) => {
  return points
    .map(({ x, y }, index) => (index === 0 ? `M${x} ${y}` : `L${x} ${y}`))
    .join(" ")
}
