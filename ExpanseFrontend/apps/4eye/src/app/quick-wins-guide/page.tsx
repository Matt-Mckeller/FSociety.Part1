import { Metadata } from "next"
import dynamic from "next/dynamic"

const QuickWinsGuideClient = dynamic(() => import("./page_client"), {
  ssr: false,
})

export const metadata: Metadata = {
  title: "Quick Wins Guide - Training, Operations, and Culture",
  description:
    "Improve training, operations, and culture so teams move with confidence, perform consistently, and feel supported.",
}

export default function QuickWinsGuidePage() {
  return <QuickWinsGuideClient />
}
