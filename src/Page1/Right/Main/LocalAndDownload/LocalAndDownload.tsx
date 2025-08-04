import React, { useState } from 'react'
import LocalTab from './LocalTab';
import DownloadedSongsTab from './DownloadedSongsTab';
import DownloadedVideoTab from './DownloadedVideoTab';
import DownloadingTab from './DownloadingTab';
import TabBtn from '../TabBtn';
import localAudioStore from '../../../../store/localAudioStore';
import { observer } from 'mobx-react-lite';

const LocalAndDownload = observer(() => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const select = (index: number):boolean => {
        return currentTabIndex == index;
    }
    return (
        <div className='bg-green-200 min-h-full flex flex-col'> {/* w-[calc(100vw-275px)] */}
            <h1 className='text-3xl font-bold'>本地和下载</h1>
            <div className='flex flex-row gap-4 mt-1 h-10 text-[16px] font-[350] sticky top-[0px] bg-gray-100 z-50'>
                <TabBtn text={`本地歌曲${localAudioStore.getLocalAudioFileCount()}`} isSelected={select(0)} onClick={()=>setCurrentTabIndex(0)} />
                <TabBtn text='下载歌曲0' isSelected={select(1)} onClick={()=>setCurrentTabIndex(1)}/>
                <TabBtn text='下载视频0' isSelected={select(2)} onClick={()=>setCurrentTabIndex(2)}/>
                <TabBtn text='正在下载0' isSelected={select(3)} onClick={()=>setCurrentTabIndex(3)}/>

                <span className='ml-auto'>下载历史漫游</span>
                <span>更多</span>
            </div>

            {currentTabIndex==0 && <LocalTab />}
            {currentTabIndex==1 && <DownloadedSongsTab />}
            {currentTabIndex==2 && <DownloadedVideoTab />}
            {currentTabIndex==3 && <DownloadingTab />}

        </div>
    )
});




export default LocalAndDownload