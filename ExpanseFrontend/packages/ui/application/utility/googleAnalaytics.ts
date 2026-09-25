// Unused at the moment, be careful about sharing data, do not want to allow access to application screens
// Attempting to keep data and app private

// log the pageview with their URL
// export const registerGoogleAnalytics = () => {
//   console.log('Register google analytics')
//   console.log(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID)
//   try {
//     window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
//       origin: window.location.origin,
//     })
//   } catch (e) {
//     console.log('error setting google analytics')
//   }
// }

// log specific events happening.
export const googleAnalyticsEvent = ({ action, params }) => {
  try {
    console.log("Google analytics event", { action, params })
    window.gtag("event", action, params)
  } catch (e) {
    console.log("Error registering google analytics event")
  }
}
