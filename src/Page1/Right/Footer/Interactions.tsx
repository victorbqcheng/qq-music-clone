import React from 'react'
import logo from '../../../assets/logo.png'
import { CiHeart, CiCircleMore } from "react-icons/ci";
import { PiChatCircleDotsThin } from "react-icons/pi";

const Interactions = () => {
    return (
        <div className='flex flex-row items-center gap-3 pointer-events-none'>
            <img src={logo} alt='Logo' className='w-12 h-12 pointer-events-auto' />
            <div className='flex flex-col text-sm gap-1'>
                <div className='text-gray-800 pointer-events-auto'>QQ音乐 听我想听</div>
                <div className='flex flex-row items-center justify-between text-gray-500'>
                    <CiHeart className='text-2xl hover:text-red-400 pointer-events-auto'/>
                    <PiChatCircleDotsThin className='text-2xl hover:text-green-400 pointer-events-auto'/>
                    <CiCircleMore className='text-2xl hover:text-green-400 pointer-events-auto'/>
                </div>

            </div>
        </div>
    )
}

export default Interactions