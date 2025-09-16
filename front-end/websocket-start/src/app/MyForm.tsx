"use client"

import { useRef, useState } from "react"
import * as StompJs from "@stomp/stompjs"

export default function MyForm() {
  const [name, setName] = useState("")
  const [msg, setMsg] = useState("")
  const [chatID,setChatID] = useState<number|null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [msgArray, setMsgArray] = useState<string[]>([])
  const clientRef = useRef<StompJs.Client | null>(null)

  function connect() {
    if (clientRef.current) return // já instanciado

    const client = new StompJs.Client({
        brokerURL: "ws://localhost:8080/ws-msgs-start",
        connectHeaders:{
          chatID: chatID?.toString() || ""
        }
      })

    client.onConnect = (frame) => {
      console.log("Connected:", frame)
      setIsConnected(true)
      console.log(chatID)
      if(chatID){ // só aqui, depois da conexão real
      client.subscribe(`/topics/pvchat/${chatID}`, (message) => {
        const parsed = JSON.parse(message.body).msg
        console.log("Parse: ",parsed)
        updateLiveChat(parsed)
      })
    }
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
        destination: `/app/pvchat/${chatID}`,
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
    <div className="w-[900px] flex flex-col h-[800px] border-1 rounded-xl border-neutral-300">
      <div className="msgs h-[760px] px-2 py-3">
        {msgArray.map((msg, idx) => (
          <div key={idx} className="msg">
            <p>{msg}</p>
          </div>
        ))}
      </div>
      <div className="line w-full h-0.5  bg-neutral-400"></div>
    <div
      onSubmit={(e) => e.preventDefault()}
      className="flex justify-end items-stretch pt-0.25 h-[40px]"
    >
      
      <div className="inputs flex flex-1 h-full items-stretch min-w-0">
      <input
        className="border-2 flex-1 h-full   rounded-bl-xl   outline-0  px-2 py-1 box-border  border-neutral-300"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border-2 flex-1 h-full   outline-0  px-2 py-1 box-border  border-neutral-300"
        placeholder="Message"
        onChange={(e) => setMsg(e.target.value)}
      />
      <input
        className="border-2 flex-1 h-full    outline-0  px-2 py-1 box-border  border-neutral-300"
        placeholder="ChatID"
        onChange={(e) => setChatID(parseInt(e.target.value))}
      />
      </div>
      <div className="buttons  flex items-stretch ">
      <button
        type="button"
        className="py-1 px-2 box-border   bg-blue-700 text-white cursor-pointer"
        onClick={sendMessage}
        disabled={!isConnected} // só habilita quando conectado
      >
        Send
      </button>
      <button type="button" className="py-1 px-2 box-border   bg-green-500 text-white cursor-pointer" onClick={connect}>
        Connect
      </button>
      <button type="button"         className="py-1 px-2 box-border  rounded-br-xl bg-red-700 text-white cursor-pointer" onClick={disconnect}>
        Disconnect
      </button>
      </div>

      
    </div>
    </div>
  )
}
