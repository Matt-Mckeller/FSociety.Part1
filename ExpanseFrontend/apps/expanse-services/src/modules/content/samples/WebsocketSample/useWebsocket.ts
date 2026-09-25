import React, { useRef } from "react"
import { useEffect, useLayoutEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

export function useWebsocket() {
  const socketRef = useRef<Socket | null>(
    null,
  ) as React.MutableRefObject<Socket | null>
  //   const socket = React.useMemo(
  //     () => io("http://localhost:8888", { autoConnect: false }),
  //     [],
  //   )
  //   const socket = React.useMemo(
  //     () => io("http://localhost:8888", { autoConnect: false }),
  //     [],
  //   )

  const [connectEmitter, setConnectEmitter] = useState<any>()
  const [eventEmitter, setEventEmitter] = useState<any>()
  const [heartBeatEmitter, setHeartBeatEmitter] = useState<any>()
  const [disconnectEmitter, setDisconnectEmitter] = useState<any>()

  //   import { useSocketIO } from "react-use-websocket"

  //   //Same API in component
  //   const { sendMessage, lastMessage, readyState } = useSocketIO(
  //     "http://localhost:3000/",
  //   )
  useLayoutEffect(() => {
    socketRef.current = io("http://localhost:8888", {
      autoConnect: false,
      reconnection: true, // ✅ enabled by default
      reconnectionAttempts: Infinity, // 🔁 how many times to try
      reconnectionDelay: 1000, // ⏱️ start with 1s
      reconnectionDelayMax: 5000, // ⏱️ max delay between attempts
      randomizationFactor: 0.5, // 🎲 adds jitter
    })
    if (!connectEmitter) {
      setConnectEmitter(
        socketRef.current.on("connect", () => {
          console.log(
            "Connected to WebSocket server, socketID:" + socketRef.current?.id,
          )
        }),
      )
    }

    if (!eventEmitter) {
      console.log("setting event emitter")
      setEventEmitter(
        socketRef.current.on("events", (data) => {
          console.log("Received update:", data)
          // Update UI here
        }),
      )
    }

    const onAnyHandler = (event: any, ...args: any) => {
      //   console.log(`📨 Received event "${event}" with args:`, args)
    }

    socketRef.current.onAny(onAnyHandler)

    if (!heartBeatEmitter) {
      setHeartBeatEmitter(
        socketRef.current.on("heartbeat", (data) => {
          console.log("Received heartbeat:", data)
          // Update UI here
        }),
      )
    }

    if (!disconnectEmitter) {
      setDisconnectEmitter(
        // Disconnect event is only triggered on server side, local disconnects do not trigger this
        socketRef.current.on("disconnect", (reason) => {
          console.warn("🚫 Disconnected from server. Reason:", reason)
        }),
      )
    }

    if (!socketRef.current.connected) {
      console.log("connecting locally")
      socketRef.current.connect()
    } else {
      console.log("is connected")
    }

    // Emit an event on the socket
    // socketRef.current?.emit(
    //   "events",
    //   { message: "Hello, server!" },
    //   (response: any) => {
    //     console.log("Acknowledgment from server:", response)
    //   },
    // )
    // const randomUsername = `User${Math.floor(Math.random() * 1000)}`
    // socketRef.current?.emit("addUser", { username: randomUsername })
    socketRef.current?.emit("events", (response: any) => {
      console.log("Received response for events:", response)
    })

    // Cleanup on unmount
    return () => {
      console.log("Running websocket unmount")
      connectEmitter?.off("connect")
      eventEmitter?.off("events")
      heartBeatEmitter?.off("heartbeat")
      disconnectEmitter?.off("disconnect")
      setConnectEmitter(null)
      setEventEmitter(null)
      setHeartBeatEmitter(null)
      setDisconnectEmitter(null)
      socketRef.current?.offAny(onAnyHandler)
      socketRef.current?.off("connect")
      socketRef.current?.off("events")
      socketRef.current?.off("heartbeat")
      socketRef.current?.off("disconnect")
      socketRef.current?.off("close")
      socketRef.current?.disconnect()
      socketRef.current?.close()
    }
  }, [])

  return socketRef.current
}
