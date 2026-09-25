import { Metadata } from "next"
import { Box } from "@mui/system"
import { ProfileDisplay, TicketEventSampleDisplay } from "../../modules/game"
import { Grid, Table, Typography } from "@mui/material"
import mysql from "mysql2/promise"
import { EventTable } from "../../modules/admin/EventTable.component"

export const metadata: Metadata = {
  title: "Admin Demo",
}
export default async function AdminDemo() {
  return "wip"
  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=59",
  // )

  // eventDBConnection.
  let allEvents = []
  const eventsBySessionid: { [key: string]: any[] } = {}
  const noSessionid: any[] = []

  try {
    const eventDBConnection = await mysql.createConnection({
      host: process.env.EVENT_DB_HOST,
      user: process.env.EVENT_DB_USER,
      password: process.env.EVENT_DB_PW,
      database: process.env.EVENT_DB_NAME,
    })

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const formattedDate = oneWeekAgo
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")
    const limit = 10000

    const query = `SELECT * FROM analytics_events WHERE createdAt > ? ORDER BY createdAt DESC LIMIT ${limit}`

    // Execute the query
    const [rows, fields] = await eventDBConnection.execute(query, [
      formattedDate,
    ])

    allEvents = rows as any[]
    allEvents.forEach((item: any) => {
      if (!item.sessionId) {
        noSessionid.push(item)
      } else {
        if (!eventsBySessionid[item.sessionId]) {
          eventsBySessionid[item.sessionId] = [item]
        } else {
          eventsBySessionid[item.sessionId].push(item)
        }
      }
    })
    console.log("try")
  } catch (err) {
    console.log(err)
  }

  console.log({ eventsBySessionid, noSessionid, allEvents })
  // console.log(allEvents[0].params)

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignSelf="stretch"
    >
      <Typography variant="h2">All events</Typography>
      <EventTable dataArray={allEvents} />
    </Box>
  )
}
