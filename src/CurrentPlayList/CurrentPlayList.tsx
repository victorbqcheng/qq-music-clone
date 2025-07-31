import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiListChecks } from "react-icons/pi";

const CurrentPlayList = () => {
    const noOfTracks = 20; // 假设有10首曲目
    return (
        <div className=' absolute top-3 right-0 w-115 h-[calc(100%-100px)] bg-white select-none'>
            <div className='flex flex-row items-center justify-between'>
                <div>播放队列</div>
                <div className='flex flex-row gap-4'>
                    <PiListChecks className='text-2xl' />
                    <RiDeleteBin6Line className='text-2xl' />
                </div>
            </div>
            <div className='text-xs font-light'>共{noOfTracks}首歌曲</div>
            <div className='overflow-y-auto custom-scrollbar h-[calc(100%-50px)]'>
                {Array.from({ length: noOfTracks }, (_, index) => (
                    <div key={index} className='flex flex-row items-center justify-between p-2 hover:bg-gray-100'>
                        <div>歌曲 {index + 1}</div>
                        <div className='text-gray-500'>时长: 3:45</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CurrentPlayList