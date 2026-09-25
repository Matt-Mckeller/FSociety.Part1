import { Metadata } from "next"
import dynamic from "next/dynamic"
const HomeClientView = dynamic(() => import("./page_client"), { ssr: false })

export const metadata: Metadata = {
  title: "Expanse EDU - Improving Engagement in Education",
}
export default function Home() {
  // Placeholder for server-side render

  return <HomeClientView />
}
