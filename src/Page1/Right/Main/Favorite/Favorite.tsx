import React from 'react'
import SongsTab from './SongsTab'
import TabBtn from '../TabBtn'

const Favorite = () => {
    return (
        <div className='bg-green-200 min-h-full flex flex-col'>
            <h1 className='text-3xl font-bold'>喜欢</h1>
            <div className='flex flex-row gap-4 mt-1 h-10 text-[16px] font-[350] sticky top-[0px] bg-gray-100 z-50'>
                <TabBtn text='歌曲0' isSelected={true} />
                <TabBtn text='歌单0' />
                <TabBtn text='专辑0' />
                <TabBtn text='有声节目0' />
                <TabBtn text='视频0' />
            </div>

            <SongsTab />
            {/* <DownloadedSongsTab /> */}
            {/* <DownloadedVideoTab /> */}
            {/* <DownloadingTab /> */}

        </div>
    )
}

export default Favorite