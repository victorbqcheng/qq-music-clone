import React from 'react'
import { Button } from 'antd';
import { MdOutlineAddBox } from "react-icons/md";
import MusicCD from '../../../../assets/music-cd.webp'

const DownloadedSongsTab = () => {
    return (
        <div className='flex-1 bg-blue-200 flex flex-col DownloadedSongsTab'>
            {/* 没有下载的歌曲时的提示 */}
            <div className='flex-1 flex flex-col items-center justify-center h-full'>
                <img src={MusicCD} alt="Music CD" className='w-32 h-32' />
                没有已下载的歌曲
                <Button icon={<MdOutlineAddBox />} >去音乐馆逛逛</Button>
            </div>
        </div>
    )
}

export default DownloadedSongsTab