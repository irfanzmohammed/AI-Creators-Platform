import React from 'react'
import { useState,useEffect } from 'react'
const CustomMouse = () => {

const[mousePosition,setMousePosition]=useState({x:0,y:0})

useEffect(()=>{
   const handleMouseMove=(e)=>{
       setMousePosition({x:e.clientX,y:e.clientY});
   }
   window.addEventListener("mousemove",handleMouseMove)

   return ()=>{
    window.removeEventListener("mousemove",handleMouseMove)
   }
},[]);


  return (
    <div 
    style={{
        left:mousePosition.x-192,
        top:mousePosition.y-192,
        transition:"all 0.3s ease-out",
    }}
    className='fixed w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20
    rounded-full blur-3xl pointer-events-none z-0'
    >
    </div>
  )
}

export default CustomMouse