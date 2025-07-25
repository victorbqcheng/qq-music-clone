import React from 'react'
import { Slider } from "antd";
import { TfiLoop } from "react-icons/tfi";
import { AiOutlineStepForward, AiOutlineStepBackward } from "react-icons/ai";
import { IoPlaySharp } from "react-icons/io5";
import { RxSpeakerModerate } from "react-icons/rx";


const Controlbar = () => {
    return (
        <div className='flex flex-col items-center justify-center w-1/3 pointer-events-none'>
            <div className='flex flex-row items-center justify-around w-full'>
                <div className='cursor-pointer hover:text-green-400 pointer-events-auto'><TfiLoop /></div>
                <div className='cursor-pointer hover:text-green-400 pointer-events-auto'><AiOutlineStepBackward /> </div>
                <div className='cursor-pointer bg-green-400 p-2 rounded-2xl w-10 flex flex-row items-center justify-center pointer-events-auto'><IoPlaySharp /></div>
                <div className='cursor-pointer hover:text-green-400 pointer-events-auto'><AiOutlineStepForward /></div>
                <div className='cursor-pointer hover:text-green-400 pointer-events-auto'><RxSpeakerModerate /></div>
            </div>
            <div className='flex flex-row items-center justify-between w-full gap-2'>
                <div className='text-sm text-gray-600 pointer-events-auto'>00:00</div>
                <div className='flex-1 pointer-events-auto'>
                    <Slider defaultValue={0} className='w-full'  />
                </div>
                <div className='text-sm text-gray-600 ml-2 pointer-events-auto'>04:20</div>
            </div>
        </div>
    )
}

export default Controlbar