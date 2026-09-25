import dynamic from "next/dynamic"
const ClientLayout = dynamic(() => import("./layout_client"), { ssr: false })

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (process.env.DISPLAY_DEMO === "true") {
    return <ClientLayout>{children}</ClientLayout>
  }
  return undefined
}
