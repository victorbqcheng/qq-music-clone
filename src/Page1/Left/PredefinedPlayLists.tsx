import React from 'react'
import { MdFavoriteBorder, MdOutlineDownloadForOffline } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { RiPlayListFill } from "react-icons/ri";

const PredefinedPlayLists = () => {
    
    // console.log('Current location:', location);
    return (
        <div>
            <PlayListItem name='喜欢' icon={<MdFavoriteBorder className='w-6 h-6' />} selected={true} />
            <PlayListItem name='最近播放' icon={<CiClock2 className='w-6 h-6' />} />
            <PlayListItem name='本地和下载' icon={<MdOutlineDownloadForOffline className='w-6 h-6' />} />
            <PlayListItem name='试听列表' icon={<RiPlayListFill className='w-6 h-6' />} />
        </div>
    )
}

type PlayListItemProps = {
    name: string;
    icon?: React.ReactNode;
    selected?: boolean;
};

export const PlayListItem = ({ name, icon, selected }: PlayListItemProps) => {
    return (
        <div className={`flex flex-row items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${selected ? 'bg-gray-200' : ''}`}>
            {icon}
            <div className='text-sm text-gray-700'>{name}</div>
        </div>
    )
}

export default PredefinedPlayLists