import React, { useEffect, useRef } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiListChecks } from "react-icons/pi";
import stateStore from '../store/stateStore';
import { observer } from 'mobx-react-lite';

const CurrentPlayList = observer(() => {
    const noOfTracks = 20; // 假设有10首曲目
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
            
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                stateStore.setOpenCurrentPlayList(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className={`absolute top-3 ${stateStore.openCurrentPlayList ? 'right-0' : '-right-120'} w-115 h-[calc(100%-110px)] flex flex-col bg-gray-200 border-1 border-black select-none z-50 my-no-drag`}
             ref={divRef}
             tabIndex={1} autoFocus
             onBlur={() => stateStore.setOpenCurrentPlayList(false)}>
            <div className='flex flex-row items-center justify-between h-16'>
                <div>播放队列</div>
                <div className='flex flex-row gap-4'>
                    <PiListChecks className='text-2xl' />
                    <RiDeleteBin6Line className='text-2xl' />
                </div>
            </div>
            <div className='text-xs font-light h-10'>共{noOfTracks}首歌曲</div>

            <div className='overflow-y-auto custom-scrollbar'>
                {Array.from({ length: noOfTracks }, (_, index) => (
                    <div key={index} className='flex flex-row items-center justify-between p-2 hover:bg-gray-100'>
                        <div>歌曲 {index + 1}</div>
                        <div className='text-gray-500'>时长: 3:45</div>
                    </div>
                ))}
            </div>


        </div>
    )
});

export default CurrentPlayList