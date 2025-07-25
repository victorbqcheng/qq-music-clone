import React from 'react'

import { Button } from 'antd';
import { MdOutlineAddBox } from "react-icons/md";
import MusicCD from '../../../../assets/music-cd.webp'

const DownloadingTab = () => {
    return (
        <div className='flex-1 bg-blue-200 flex flex-col DownloadingTab'>
            {/* 没有下载的视频时的提示 */}
            <div className='flex-1 flex flex-col items-center justify-center h-full'>
                <img src={MusicCD} alt="Music CD" className='w-32 h-32' />
                没有正在下载的歌曲/视频
                <Button icon={<MdOutlineAddBox />} >去音乐馆逛逛</Button>
            </div>
        </div>
    )
}

export default DownloadingTab