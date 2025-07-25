import React from 'react'
import { Button } from 'antd';
import { MdOutlineAddBox } from "react-icons/md";
import MusicCD from '../../../../assets/music-cd.webp'

const DownloadedVideoTab = () => {
    return (
        <div className='flex-1 flex flex-col bg-blue-200'>
            {/* 没有下载的视频时的提示 */}
            <div className='flex-1 flex flex-col items-center justify-center'>
                <img src={MusicCD} alt="Music CD" className='w-32 h-32' />
                没有已下载的视频
                <Button icon={<MdOutlineAddBox />} >去MV广场逛逛</Button>
            </div>
        </div>
    )
}

export default DownloadedVideoTab