import React from 'react'
import { MdFavoriteBorder, MdOutlineDownloadForOffline } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { RiPlayListFill } from "react-icons/ri";
import { Link, useLocation } from 'react-router';

const PredefinedPlayLists = () => {
    const location = useLocation();
    const selected = (path: string) => {
        return location.pathname === path;
    };
    return (
        <div>
            <PlayListItem name='喜欢' link='/favorite' icon={<MdFavoriteBorder className='w-6 h-6' />} selected={selected("/favorite")} />
            <PlayListItem name='最近播放' link='/recently-played' icon={<CiClock2 className='w-6 h-6' />} selected={selected("/recently-played")} />
            <PlayListItem name='本地和下载' link='/local-and-download' icon={<MdOutlineDownloadForOffline className='w-6 h-6' />} selected={selected("/local-and-download")} />
            <PlayListItem name='试听列表' link='/trial' icon={<RiPlayListFill className='w-6 h-6' />} selected={selected("/trial")} />
        </div>
    )
}

type PlayListItemProps = {
    name: string;
    icon?: React.ReactNode;
    selected?: boolean;
    link?: string;
};

export const PlayListItem = ({ name, icon, selected, link }: PlayListItemProps) => {
    return (
        <Link to={link}>
            <div className={`flex flex-row items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${selected ? 'bg-gray-200' : ''}`}>
                {icon}
                <div className='text-sm text-gray-700'>{name}</div>
            </div>
        </Link>
    )
}

export default PredefinedPlayLists