import React from 'react'
import {
    
    DatabaseIcon,
    CodeIcon,
    ServerIcon,
    DesktopComputerIcon
} from '@heroicons/react/solid';
import bgImg from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate()
  return (
    <div className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[70%] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                <p className='text-2xl'>Beginning to share your developing experience and notes.</p>
                <h1 className='py-3 text-5xl md:text-7xl font-bold '>Love note</h1>
                <p className='text-2xl'>Developer's notes managing and sharing Website</p>
                <button onClick={()=>{
                    navigate("/auth/signin")
                }} className='py-3  sm:w-[60%] my-4'>Join us</button>
            </div>
            
            <div className='flex justify-center'>
                <img className=' object-cover' src={bgImg} alt="/" />
            </div>
            <div className='absolute flex flex-col py-8 md:min-w-[760px] bottom-[-12%]
            mx-1 md:left-[66%] md:bottom-[-12%]    transform md:-translate-x-1/2 bg-zinc-200
            border border-slate-300 rounded-xl  text-center shadow-xl'>
                <p>Let's sharing what did you learn about programing!</p>
                <div className='flex flex-wrap justify-between px-4'>
                    <p className='flex px-4 py-2 text-slate-500'><DesktopComputerIcon className='h-6 text-indigo-600'/> App Security</p>
                    <p className='flex px-4 py-2 text-slate-500'><DatabaseIcon className='h-6 text-indigo-600'/> Database </p>
                    <p className='flex px-4 py-2 text-slate-500'><ServerIcon className='h-6 text-indigo-600'/> Backend Server</p>
                    <p className='flex px-4 py-2 text-slate-500'><CodeIcon className='h-6 text-indigo-600'/> Coding</p>
                    
                </div>
            </div>
        </div>
        
    </div>
  )
}

