"use client"

import Image from "next/image";
import MyForm from "./MyForm";
import { useEffect, useState } from "react";
import Login from "./Login";

export default function Home() {
  const [loginSetted,setLoginSetted] = useState(false)
  const [user,setUser] = useState("")
  
  return (
    <div className="">
        <Login setUser={setUser} setLoginSetted={setLoginSetted}></Login>
        <MyForm username={user}></MyForm>
      
    </div>
  );
}
