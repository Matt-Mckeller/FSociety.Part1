"use client"

import { useEffect, useState } from "react"

export default function TestApiPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("[Test] Fetching...")
    fetch("/api/lotties/scan")
      .then((res) => {
        console.log("[Test] Response:", res.status)
        return res.json()
      })
      .then((data) => {
        console.log("[Test] Data:", data.success, data.lotties?.length)
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("[Test] Error:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div style={{ padding: 20 }}>
      <h1>API Test</h1>
      <p>Success: {data?.success ? "✓" : "✗"}</p>
      <p>Count: {data?.lotties?.length}</p>
      <h2>Sample Lotties:</h2>
      <ul>
        {data?.lotties?.slice(0, 5).map((l: any) => (
          <li key={l.id}>
            {l.name} - {l.displayName}
          </li>
        ))}
      </ul>
    </div>
  )
}
