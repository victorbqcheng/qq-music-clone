import React from 'react'
import { MdFavoriteBorder, MdOutlineDownloadForOffline } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { RiPlayListFill } from "react-icons/ri";
import { useLocation } from 'react-router';
import PlayListItem from '../../components/PlayListItem';

const PredefinedPlayLists = () => {
    const location = useLocation();
    const selected = (path: string) => {
        return location.pathname === path;
    };
    return (
        <div>
            <PlayListItem name='喜欢' link='/favorite' icon={<MdFavoriteBorder className='w-6 h-6' />} selected={selected("/favorite")} showContextMenu={false} />
            <PlayListItem name='最近播放' link='/recently-played' icon={<CiClock2 className='w-6 h-6' />} selected={selected("/recently-played")} showContextMenu={false} />
            <PlayListItem name='本地和下载' link='/local-and-download' icon={<MdOutlineDownloadForOffline className='w-6 h-6' />} selected={selected("/local-and-download")} showContextMenu={false} />
            <PlayListItem name='试听列表' link='/trial' icon={<RiPlayListFill className='w-6 h-6' />} selected={selected("/trial")} showContextMenu={false}/>
        </div>
    )
}





export default PredefinedPlayLists