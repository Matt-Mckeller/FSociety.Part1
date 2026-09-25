const angleInDegrees = 180 - 33
const angleInRadians = (angleInDegrees * Math.PI) / 180

export const filledCircle1Radius = 14.87
export const strokeCircle1Radius = 22.31
export const circle1OffsetX = (filledCircle1Radius / 2) * Math.cos(angleInRadians)
export const circle1OffsetY = (filledCircle1Radius / 2) * Math.sin(angleInRadians)

export const circle2Radius = 18.18
export const strokeCircle2Radius = 14.78
export const circle2OffsetX = circle2Radius * Math.cos(angleInRadians)
export const circle2OffsetY = circle2Radius * Math.sin(angleInRadians)
