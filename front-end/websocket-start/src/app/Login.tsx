import { useState } from "react"
type Props ={
    setUser: (e: string)=> void,
    setLoginSetted: (e:boolean)=> void
}

export default function Login({setUser,setLoginSetted}: Props){
    const [opacity,setOpacity] = useState(100)
    
    function handleCLick (){
        setLoginSetted(true)
        const animate = setInterval(()=>{
            console.log(opacity)
            
            setOpacity(prev=>prev > 0? prev-1 : (clearInterval(animate),0))
           
        },10)
    }
    
    return (

        <div style={{opacity: opacity/100}} className={`w-full absolute inset-0 bg-neutral-200 ${opacity>0? "flex" : "hidden"} flex-col justify-center items-center`}>
            <div className="w-50 flex gap-2 flex-col items-center">
            <h1>Type your name and start</h1>
            <input type="text" name="" id="" className="py-1 px-2 box-border rounded-sm border-1 outline-0 border-neutral-400" onChange={(e)=> setUser(e.target.value)} />
            <button className="py-2 px-4 bg-blue-600 rounded-xl" onClick={handleCLick}>Start</button>
            </div>
        </div>

    )
}