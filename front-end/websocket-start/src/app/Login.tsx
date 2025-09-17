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

        <div style={{opacity: opacity/100}} className={`w-full absolute inset-0 bg-neutral-100 ${opacity>0? "flex" : "hidden"} flex-col justify-center items-center`}>
            <div className=" flex gap-10 flex-col items-center">
            <h1 className=" mygradient text-4xl text-blue-600">You only need your name to start</h1>
            <input type="text" name="" id="" className="py-1 px-3 min-w-0 box-border rounded-xl border-1 outline-0 border-transparent transition ease-in-out duration-300 hover:border-blue-400 bg-neutral-50 text-blue-300" placeholder="Username" onChange={(e)=> setUser(e.target.value)} />
            <button className="py-1 px-4 bg-blue-500 hover:bg-white border-transparent border-2 transition duration-200 hover:border-blue-500 hover:text-blue-500 rounded-xl cursor-pointer text-white" onClick={handleCLick}>Start</button>
            </div>
        </div>

    )
}