import { PointSelectionContextProvider } from "expanse.ui/points"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PointSelectionContextProvider>{children}</PointSelectionContextProvider>
  )
}
