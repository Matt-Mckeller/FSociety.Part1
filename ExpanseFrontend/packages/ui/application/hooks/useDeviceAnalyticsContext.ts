import { useDeviceType } from "../../theme/hooks"

export const useDeviceAnalyticsContext = () => {
  const deviceTypeByUserAgent = useDeviceType('navigator')
  const deviceTypeByScreenWidth = useDeviceType('screenWidth')
  const screenSize = `${window.screen.width}x${window.screen.height}`
  const innerSize = `${window.innerWidth}x${window.innerHeight}`
  return {
    deviceTypeByUserAgent,
    deviceTypeByScreenWidth,
    screenSize,
    innerSize
  }
}