import React from 'react'
import { PlayListItem } from './PredefinedPlayLists'
import { BsFileMusic } from "react-icons/bs";
import { MdOutlineCollections } from "react-icons/md";


const CustomPlayLists = () => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 justify-start items-center'>
                <div className='text-[14px] font-light'>自建歌单</div> |
                <div className='text-[14px] text-gray-400 font-light'>收藏歌单</div>
                <div className=' ml-auto text-gray-500 font-light hover:text-gray-900 p-2 cursor-pointer'>+</div>
            </div>

            <PlayListItem name='默认列表' icon={<BsFileMusic className='w-6 h-6'/>}/>
            <PlayListItem name='默认收藏' icon={<MdOutlineCollections className='w-6 h-6'/>} />
        </div>
    )
}

export default CustomPlayLists