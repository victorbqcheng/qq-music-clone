import React from 'react'
import { BsSoundwave } from 'react-icons/bs'
import { MdPlaylistPlay } from "react-icons/md";
import stateStore from '../../../store/stateStore';

const Utils = () => {
    return (
        <div className='flex flex-row items-center gap-2 text-gray-500 px-4 w-52'>
            <div className='hover:text-green-400 text-xs p-1 rounded-sm border-1 pointer-events-auto'>标准</div>
            <BsSoundwave className='w-6 h-6 hover:text-green-400 pointer-events-auto'/>
            <div className='hover:text-green-400 text-xs p-1 rounded-sm border-1 pointer-events-auto'>词</div>
            <MdPlaylistPlay className='w-6 h-6 hover:text-green-400 pointer-events-auto'
                onClick={()=>stateStore.setOpenCurrentPlayList(!stateStore.openCurrentPlayList)} />
        </div>
    )
}

export default Utils