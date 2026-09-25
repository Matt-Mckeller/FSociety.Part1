export type DEVICE_TYPE = "Mobile" | "Tablet" | "Desktop" | "Server"

export function useDeviceType(source: 'navigator' | 'screenWidth'): DEVICE_TYPE {
  
  if(source === 'navigator'){
    const { userAgent } = navigator

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      )
    ) {
      return "Mobile"
    }
    if (/Tablet|iPad/i.test(userAgent)) {
      return "Tablet"
    }
    return "Desktop"
  } else if(source==='screenWidth') {
    // todo use theme ( but context )
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    const isTablet = window.matchMedia(
      "(min-width: 768px) and (max-width: 1023px)",
    ).matches

    if (isMobile) {
      return "Mobile"
    }
    if (isTablet) {
      return "Tablet"
    }
    return "Desktop"
  } 
  throw new Error('Must specify device type source')
  
}