"use client"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
import { useWebsocket } from "./useWebsocket"
// @ts-expect-error type issue ignoring it
import throttle from "lodash.throttle"
import { Box } from "@mui/system"
import gsap from "gsap"
import { Typography } from "@mui/material"

interface UserPosition {
  x: number
  y: number
}
interface UserData {
  [key: string]: { username: string; coordinates: UserPosition }
}
export function WebsocketSample() {
  const socket = useWebsocket()
  const [users, setUsers] = useState<UserData>({})

  const emitUserPosition = (
    socketInstance: Socket,
    eventData: UserPosition,
  ) => {
    socketInstance?.emit("updateUserPosition", eventData, (response: any) => {
      console.log("Response from updateUserPosition:", response)
    })
  }
  const throttledEmitUserPosition = useRef(throttle(emitUserPosition, 50))

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("emitting event add user")
      const randomUsername = `User${Math.floor(Math.random() * 1000)}`

      socket?.emit("addUser", randomUsername, (response: any) => {
        console.log("Response from addUser:", response)
      })

      socket?.on("users", (users) => {
        console.log("Received users:", users)
        const decodedUsers = JSON.parse(users.data)
        console.log("Decoded users:", decodedUsers)
        if (!decodedUsers) return
        setUsers(decodedUsers)
      })

      emitUserPosition(socket as Socket, {
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
      })
      window.addEventListener("mousemove", (e) => {
        throttledEmitUserPosition.current(socket, {
          x: e.clientX,
          y: e.clientY,
        })
      })
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [socket])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const container = document.querySelector("#container") as HTMLElement

      Object.keys(users).forEach((key) => {
        const userElement = document.getElementById(`user-container-${key}`)
        if (userElement && container) {
          const containerRect = container.getBoundingClientRect()
          const offsetX = 10 // Width of the SVG
          const offsetY = -7.5 // Height of the SVG
          gsap.to(userElement, {
            x: users[key]?.coordinates.x - containerRect.left - offsetX,
            y: users[key]?.coordinates.y - containerRect.top - offsetY,
            duration: 0.5,
            ease: "power2.out",
          })
        }
      })
    }
  }, [users])

  return (
    <Box
      id="container"
      width="100%"
      height="500px"
      position="relative"
      sx={{
        overflow: "hidden",
        border: "3px solid black",
        borderRadius: "10px",
      }}
    >
      {Object.keys(users).map((key) => {
        return (
          <Box
            id={`user-container-${key}`}
            key={key}
            sx={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 35"
              width="35px"
              height="35px"
              style={{
                transform: "scaleX(-1)", // Flip horizontally
              }}
            >
              <g fill="rgba(0,0,0,.2)" transform="translate(1,1)">
                <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
                <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
              </g>
              <g fill="white">
                <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
                <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
              </g>
              <g fill={"red"}>
                <path d="m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" />
                <path d="m13 10.814v11.188l2.969-2.866.428-.139h4.768z" />
              </g>
            </svg>
            <Typography
              style={{
                fontSize: "12px",
                textAlign: "center",
                position: "absolute",
                top: "100%", // Position below the SVG
                left: "50%", // Center horizontally
                transform: "translateX(-50%)", // Adjust for centering
                marginTop: "5px",
              }}
            >
              {users[key]?.username}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}
