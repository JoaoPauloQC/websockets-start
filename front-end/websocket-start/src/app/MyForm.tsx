"use client"

import { useRef, useState } from "react"
import * as StompJs from "@stomp/stompjs"

export default function MyForm() {
  const [name, setName] = useState("")
  const [msg, setMsg] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [msgArray, setMsgArray] = useState<string[]>([])
  const clientRef = useRef<StompJs.Client | null>(null)

  function connect() {
    if (clientRef.current) return // já instanciado

    const client = new StompJs.Client({
        brokerURL: "ws://localhost:8080/ws-msgs-start"
    })

    client.onConnect = (frame) => {
      console.log("Connected:", frame)
      setIsConnected(true) // só aqui, depois da conexão real
      client.subscribe("/topics/ws-msg", (message) => {
        const parsed = JSON.parse(message.body).msg
        console.log("Parse: ",parsed.msg)
        updateLiveChat(parsed)
      })
    }

    client.onWebSocketError = (error) => {
      console.error("WebSocket error:", error)
    }

    client.onStompError = (frame) => {
      console.error("Broker error:", frame.headers["message"])
    }

    client.activate()
    clientRef.current = client
  }

  function disconnect() {
    clientRef.current?.deactivate()
    clientRef.current = null
    setIsConnected(false)
    console.log("Disconnected")
  }

  function sendMessage() {
    console.log(msgArray)
    console.log("msg: ",msg, "name: ", name)
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: "/app/new-msg",
        body: JSON.stringify({ "name":name,"msg": msg }),
      })
    } else {
      console.warn("⚠️ STOMP ainda não conectado")
    }
  }

  function updateLiveChat(newMsg: string) {
    setMsgArray((prev) => [...prev, newMsg])
    console.log(msgArray)
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-5"
    >
      <input
        className="border-2 border-neutral-600"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border-2 border-neutral-600"
        placeholder="Message"
        onChange={(e) => setMsg(e.target.value)}
      />
      <button
        type="button"
        className="py-2 px-3 bg-blue-700 text-white cursor-pointer"
        onClick={sendMessage}
        disabled={!isConnected} // só habilita quando conectado
      >
        Send Msgs
      </button>
      <button type="button" className="cursor-pointer" onClick={connect}>
        Connect
      </button>
      <button type="button" className="cursor-pointer" onClick={disconnect}>
        Disconnect
      </button>

      <div className="msgs">
        {msgArray.map((msg, idx) => (
          <div key={idx} className="msg">
            <p>{msg}</p>
          </div>
        ))}
      </div>
    </form>
  )
}
